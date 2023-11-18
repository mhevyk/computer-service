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
      readonly JWT_ACCESS_SECRET: string;
      readonly JWT_ACCESS_EXPIRES_IN: string;
      readonly JWT_REFRESH_SECRET: string;
      readonly JWT_REFRESH_EXPIRES_IN: string;
    }
  }
}
