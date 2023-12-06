import path from "path";
import { Sequelize } from "sequelize-typescript";

const MODELS_PATH = path.resolve(__dirname, "models");

export const sequelize = new Sequelize({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  models: [MODELS_PATH],
  define: {
    timestamps: false,
  },
});
