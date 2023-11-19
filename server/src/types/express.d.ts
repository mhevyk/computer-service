export {};
import UserDto from "../dtos/user";

declare global {
  namespace Express {
    interface Request {
      user?: UserDto;
    }
  }
}
