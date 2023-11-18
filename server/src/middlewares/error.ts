import { NextFunction, Request, Response } from "express";
import APIError from "../exceptions/APIError";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // logging error for development purposes
  console.log(err);

  if (err instanceof APIError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Непередбачувана помилка сервера" });
}
