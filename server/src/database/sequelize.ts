import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_NAME,
});
