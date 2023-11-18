import { Response, NextFunction, CookieOptions } from "express";
import {
  AuthCookies,
  LoginBody,
  RegistrationBody,
  RequestWithBody,
  RequestWithCookies,
} from "../types/request";
import AuthService from "../services/auth";

const AUTH_COOKIE_NAME = "refreshToken";
const AUTH_COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: 100000, // TODO: replace with actual number of milliseconds
} as const;

class AuthController {
  async registration(
    req: RequestWithBody<RegistrationBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password, role = "USER" } = req.body;

      const userData = await AuthService.registration(username, password, role);
      res.cookie(AUTH_COOKIE_NAME, userData.refreshToken, AUTH_COOKIE_OPTIONS);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: RequestWithBody<LoginBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async logout(
    req: RequestWithCookies<AuthCookies>,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async refresh(
    req: RequestWithCookies<AuthCookies>,
    res: Response,
    next: NextFunction
  ) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
