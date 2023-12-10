import { Request } from "express";
import { Role } from "../permissions/roles";

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

export type Order = {
  computer_id: number;
  quantity: number;
  price: number;
};
