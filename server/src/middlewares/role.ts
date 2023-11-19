import { NextFunction, Request, Response } from "express";
import APIError from "../exceptions/APIError";
import { Role } from "../permissions/roles";

export default function (allowedRoles: Role[]) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const user = req.user;

    if (!user) {
      return next(APIError.Unauthourized());
    }

    if (allowedRoles.includes(user.role)) {
      return next();
    }

    return next(APIError.NotAllowed());
  };
}
