import path from "path";
import fs from "fs";
import removeDirectory from "../../utils/removeDirectory";
import executeCommand from "../../utils/executeCommand";
import compress from "../../utils/compress";

function composeDateFilenamePart() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${[year, month, day, hour, minute]
    .map(item => item.toString().padStart(2, "0"))
    .join("-")}`;
}

function composeBackupFilename(databaseName: string) {
  const datePart = composeDateFilenamePart();
  const extension = "backup";
  return `${databaseName}-${datePart}.${extension}`;
}

const CURRENT_DIRECTORY = path.resolve(__dirname);

export async function backupDatabase() {
  try {
    const backupFileDirectory = path.resolve(
      CURRENT_DIRECTORY,
      "..",
      "backups"
    );
    const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
    const backupFilename = composeBackupFilename(DB_NAME);
    const backupFilePath = path.resolve(backupFileDirectory, backupFilename);

    if (fs.existsSync(`${backupFilePath}.zip`)) {
      return console.error(
        `Backup file ${backupFilename}.zip is already created!`
      );
    }

    if (!fs.existsSync(backupFileDirectory)) {
      fs.mkdirSync(backupFileDirectory);
    }

    const command = `SET PGPASSWORD=${DB_PASSWORD}&& pg_dump --username="${DB_USERNAME}" --format=directory --file="${backupFilePath}" "${DB_NAME}"`;

    await executeCommand(command, { cwd: CURRENT_DIRECTORY });
    await compress(backupFilePath, `${backupFilePath}.zip`);
    await removeDirectory(backupFilePath);
    console.log(
      `Database backup was successfully created and loaded in file ${backupFilename}`
    );
  } catch (error) {
    console.log(error);
  }
}
