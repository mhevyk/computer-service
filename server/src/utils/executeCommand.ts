import util from "util";
import childProcess from "child_process";

const exec = util.promisify(childProcess.exec);

export default async function executeCommand(
  command: string,
  options?: childProcess.ExecOptions
) {
  try {
    return await exec(command, options);
  } catch (error) {
    console.error(`Command was not executed because of error`, error);

    throw error;
  }
}
