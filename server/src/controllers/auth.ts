import { Response, NextFunction } from "express";
import {
  AuthCookies,
  LoginBody,
  RegistrationBody,
  RequestWithBody,
  RequestWithCookies,
} from "../types/request";
import AuthService from "../services/auth";
import { ROLES } from "../permissions/roles";
import { AUTH_COOKIE_NAME, AUTH_COOKIE_OPTIONS } from "../constants/global";

class AuthController {
  async registration(
    req: RequestWithBody<Omit<RegistrationBody, "role">>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password } = req.body;

      const userData = await AuthService.registration(
        username,
        password,
        ROLES.USER
      );
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
