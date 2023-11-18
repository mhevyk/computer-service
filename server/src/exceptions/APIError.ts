export default class APIError extends Error {
  public readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }

  static BadRequest(message: string) {
    return new APIError(message, 400);
  }
}
