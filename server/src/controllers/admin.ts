import { NextFunction, Response } from "express";
import { RegistrationBody, RequestWithBody } from "../types/request";
import AuthService from "../services/auth";
import { AUTH_COOKIE_KEY, AUTH_COOKIE_OPTIONS } from "../constants/global";

class AdminController {
  async registrationRole(
    req: RequestWithBody<RegistrationBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username, password, role } = req.body;
      console.log(username, password, role);

      const userData = await AuthService.registration(username, password, role);
      res.cookie(AUTH_COOKIE_KEY, userData.refreshToken, AUTH_COOKIE_OPTIONS);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AdminController();
