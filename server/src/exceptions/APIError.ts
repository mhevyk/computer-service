import { ValidationError } from "express-validator";

export default class APIError extends Error {
  public readonly status: number;
  public readonly errors: ValidationError[];

  constructor(message: string, status: number, errors: ValidationError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string) {
    return new APIError(message, 400);
  }

  static Validation(errors: ValidationError[]) {
    return new APIError("Помилка валідації", 400, errors);
  }

  static Unauthourized() {
    return new APIError("Користувач не авторизований", 401);
  }

  static NotAllowed() {
    return new APIError("Нема доступу", 403);
  }

  static NotFound(message: string) {
    return new APIError(message, 404);
  }
}
