import { CookieOptions } from "express";
import parseTimeSpanToMilliseconds from "../utils/parseTimeSpanToMilliseconds";

export const AUTH_COOKIE_NAME = "refreshToken";
export const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: parseTimeSpanToMilliseconds(process.env.JWT_REFRESH_EXPIRES_IN),
} as const;
