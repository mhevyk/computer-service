import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import APIError from "../exceptions/APIError";

export default function (req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(APIError.Validation(errors.array()));
  }

  next();
}
