export {};
import type { Dialect } from "sequelize";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: number;
      readonly DB_USER: string;
      readonly DB_PASSWORD: string;
      readonly DB_HOST: string;
      readonly DB_DIALECT: Dialect;
      readonly DB_NAME: string;
      readonly DB_PORT: number;
    }
  }
}
