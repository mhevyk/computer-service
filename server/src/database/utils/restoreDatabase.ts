import path from "path";
import executeCommand from "../../utils/executeCommand";
import unzip from "../../utils/unzip";
import removeDirectory from "../../utils/removeDirectory";
import fs from "fs";

const CURRENT_DIRECTORY = path.resolve(__dirname);
const BACKUPS_FOLDER = path.resolve(CURRENT_DIRECTORY, "..", "backups");

export async function restoreDatabase(backupFilename: string) {
  try {
    const { DB_USERNAME, DB_NAME, DB_PASSWORD } = process.env;
    const backupFilePath = path.resolve(BACKUPS_FOLDER, backupFilename);

    if (!fs.existsSync(backupFilePath)) {
      return console.error(
        `File "${backupFilename}" was not found in backups list`
      );
    }

    const restoreFilePath = path.resolve(BACKUPS_FOLDER, "restore.backup");

    await unzip(backupFilePath, restoreFilePath);

    const command = `SET PGPASSWORD=${DB_PASSWORD}&& pg_restore --username="${DB_USERNAME}" --dbname="${DB_NAME}" --clean --if-exists "${restoreFilePath}"`;

    await executeCommand(command, { cwd: CURRENT_DIRECTORY });
    await removeDirectory(restoreFilePath);
    console.log(
      `Successfully restored database from backup "${backupFilename}"`
    );
  } catch (error) {
    console.log(error);
  }
}
