import { Request } from "express";

type Role = "USER" | "ADMIN";

export type RegistrationBody = {
  username: string;
  password: string;
  role: Role;
};

export type LoginBody = Pick<RegistrationBody, "username" | "password">;

export type AuthCookies = {
  refreshToken: string;
};

export type RequestWithBody<T> = Request<{}, {}, T, {}>;
export interface RequestWithCookies<T> extends Request {
  cookies: T;
}
