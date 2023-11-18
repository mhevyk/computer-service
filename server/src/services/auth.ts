import UserDto from "../dtos/user";
import APIError from "../exceptions/APIError";
import UserService from "./user";
import TokenService from "./token";
import bcrypt from "bcrypt";

class AuthService {
  async registration(username: string, password: string, role: string) {
    const candidate = await UserService.findUserByUsername(username);

    if (candidate !== null) {
      throw APIError.BadRequest(`Користувач з ім'ям ${username} вже існує`);
    }

    const salt = await bcrypt.genSalt(3);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await UserService.createUser(username, hashedPassword, role);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(username: string, password: string) {}

  async logout(refreshToken: string) {}

  async refresh(refreshToken: string) {}
}

export default new AuthService();
