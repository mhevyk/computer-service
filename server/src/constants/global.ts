import { CookieOptions } from "express";
import parseTimeSpanToMilliseconds from "../utils/parseTimeSpanToMilliseconds";

export const AUTH_COOKIE_KEY = "refreshToken";
export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: parseTimeSpanToMilliseconds(process.env.JWT_REFRESH_EXPIRES_IN),
} as const;

const environment = process.env.NODE_ENV;

export const IS_DEV = environment === "development";
export const IS_TEST = environment === "test";
export const IS_PROD = environment === "production";
