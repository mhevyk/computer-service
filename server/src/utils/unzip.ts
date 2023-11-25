import fs from "fs/promises";
import JSZip from "jszip";
import path from "path";

export default async function unzip(zipFilePath: string, extractTo: string) {
  try {
    const zipFileContent = await fs.readFile(zipFilePath);
    const zip = await JSZip.loadAsync(zipFileContent);

    await fs.mkdir(extractTo, { recursive: true });

    for await (const [filename, file] of Object.entries(zip.files)) {
      const fileData = await file.async("nodebuffer");
      const filePath = path.resolve(extractTo, filename);
      await fs.writeFile(filePath, fileData);
    }

    console.log(
      `File "${path.basename(zipFilePath)}" was unzipped successfully`
    );
  } catch (error) {
    console.error("Error while unzipping file:", error);
  }
}
