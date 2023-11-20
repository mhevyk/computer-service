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
import { AUTH_COOKIE_KEY, AUTH_COOKIE_OPTIONS } from "../constants/global";

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
      res.cookie(AUTH_COOKIE_KEY, userData.refreshToken, AUTH_COOKIE_OPTIONS);

      // TODO: exclude refreshToken from response

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
      const { username, password } = req.body;

      const userData = await AuthService.login(username, password);
      res.cookie(AUTH_COOKIE_KEY, userData.refreshToken, AUTH_COOKIE_OPTIONS);

      return res.json(userData);
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
      const { refreshToken } = req.cookies;

      const token = await AuthService.logout(refreshToken);
      res.clearCookie(AUTH_COOKIE_KEY);

      return res.json(token);
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
      const { refreshToken } = req.cookies;

      const userData = await AuthService.refresh(refreshToken);
      res.cookie(AUTH_COOKIE_KEY, userData.refreshToken, AUTH_COOKIE_OPTIONS);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
