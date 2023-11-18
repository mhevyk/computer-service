import { Request } from "express";

export type RegistrationBody = {
  username: string;
  password: string;
};

export type LoginBody = Pick<RegistrationBody, "username" | "password">;

export type AuthCookies = {
  refreshToken: string;
};

export type RequestWithBody<T> = Request<{}, {}, T, {}>;
export interface RequestWithCookies<T> extends Request {
  cookies: T;
}
