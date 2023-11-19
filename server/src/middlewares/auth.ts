import { NextFunction, Request, Response } from "express";
import APIError from "../exceptions/APIError";
import TokenService from "../services/token";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authhorizationHeader = req.headers.authorization;
    if (!authhorizationHeader) {
      return next(APIError.Unauthourized());
    }

    const accessToken = authhorizationHeader.split(" ")[1];

    if (!accessToken) {
      return next(APIError.Unauthourized());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return next(APIError.Unauthourized());
    }

    req.user = userData;
    next();
  } catch {
    return next(APIError.Unauthourized());
  }
}
