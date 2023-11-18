import APIError from "../exceptions/APIError";
import UserService from "./user";
import TokenService from "./token";
import bcrypt from "bcrypt";
import { sequelize } from "../database/sequelize";
import { Role } from "../permissions/roles";
import UserDto from "../dtos/user";

class AuthService {
  async registration(username: string, password: string, role: Role) {
    const candidate = await UserService.findUserByUsername(username);

    if (candidate !== null) {
      throw APIError.BadRequest(`Користувач з ім'ям ${username} вже існує`);
    }

    const salt = await bcrypt.genSalt(3);
    const hashedPassword = await bcrypt.hash(password, salt);

    const transaction = await sequelize.transaction();

    try {
      const user = await UserService.createUser(
        {
          username,
          password: hashedPassword,
          role,
        },
        { transaction }
      );

      const userDto = new UserDto(user);
      const tokens = TokenService.generateTokens({ ...userDto });
      await TokenService.saveRefreshToken(
        {
          userId: userDto.id,
          refreshToken: tokens.refreshToken,
        },
        { transaction }
      );

      await transaction.commit();

      return {
        ...tokens,
        user: userDto,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async login(username: string, password: string) {
    const user = await UserService.findUserByUsername(username);

    if (user === null) {
      throw APIError.BadRequest(`Користувач з ім'ям ${username} не знайдений`);
    }

    const arePasswordEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordEqual) {
      throw APIError.BadRequest("Неправильний пароль");
    }

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveRefreshToken({
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    });

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {}

  async refresh(refreshToken: string) {}
}

export default new AuthService();
