import fs from "fs/promises";
import path from "path";
import JSZip from "jszip";

export default async function compress(
  sourcePath: string,
  outputPath: string = sourcePath
) {
  const zip = new JSZip();
  const files = await fs.readdir(sourcePath);

  for await (const file of files) {
    const filePath = path.join(sourcePath, file);
    const fileData = await fs.readFile(filePath);
    zip.file(file, fileData);
  }

  try {
    const zipData = await zip.generateAsync({
      type: "nodebuffer",
      streamFiles: true,
    });

    await fs.writeFile(outputPath, zipData);

    console.log(`Zip file successfully created at ${outputPath}`);
  } catch (error) {
    console.error(`Error creating zip file:`, error);
  }
}
