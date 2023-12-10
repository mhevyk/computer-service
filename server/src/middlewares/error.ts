import { NextFunction, Request, Response } from "express";
import APIError from "../exceptions/APIError";
import { IS_DEV } from "../constants/global";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // logging error for development purposes
  if (IS_DEV) {
    console.log(err);
  }

  if (err instanceof APIError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors.map(error => error.msg),
    });
  }

  return res.status(500).json({ message: "Непередбачувана помилка сервера" });
}
