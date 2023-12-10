import path from "path";
import dotenv from "dotenv";

const ENV_FILE_PATH = path.resolve(
  __dirname,
  "..",
  `.env.${process.env.NODE_ENV}`
);

// Load .env file
dotenv.config();

// Load .env.[NODE_ENV] file
dotenv.config({ path: ENV_FILE_PATH });
