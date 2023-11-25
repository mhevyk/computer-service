import fs from "fs/promises";

export default async function removeDirectory(directoryPath: string) {
  try {
    await fs.rm(directoryPath, { recursive: true, force: true });
  } catch (error) {
    console.error(
      `Removing directory ${directoryPath} failed with error`,
      error
    );
  }
}
