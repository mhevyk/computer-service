import { exec } from "child_process";
import path from "path";
import fs from "fs";

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

export function backupDatabase() {
  const backupFileDirectory = path.resolve(CURRENT_DIRECTORY, "..", "backups");
  const { DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
  const backupFileName = composeBackupFilename(DB_NAME);
  const backupFilePath = path.resolve(backupFileDirectory, backupFileName);

  if (fs.existsSync(backupFilePath)) {
    return console.error(`Backup file ${backupFileName} is already created!`);
  }

  if (!fs.existsSync(backupFileDirectory)) {
    fs.mkdirSync(backupFileDirectory);
  }

  const command = `SET PGPASSWORD=${DB_PASSWORD}&& pg_dump -U "${DB_USERNAME}" -F d -f "${backupFilePath}" "${DB_NAME}"`;

  // TODO: implement zipping resulting file
  // TODO: implment scheduling backup (with cron package)

  exec(command, { cwd: CURRENT_DIRECTORY }, (error, stdout, stderr) => {
    if (error) {
      return console.error(`exec error: ${error}`);
    }
    if (stderr) {
      return console.error(`stderr: ${stderr}`);
    }
    console.log(`Created a backup of ${DB_NAME} successfully: ${stdout}`);
  });
}