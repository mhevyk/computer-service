export {};
import { Dialect } from "sequelize";
import { TimeSpan } from "./common";

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
      readonly JWT_ACCESS_SECRET: string;
      readonly JWT_ACCESS_EXPIRES_IN: TimeSpan;
      readonly JWT_REFRESH_SECRET: string;
      readonly JWT_REFRESH_EXPIRES_IN: TimeSpan;
      readonly CLIENT_BASE_URL: string;
    }
  }
}
