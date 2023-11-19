import APIError from "../exceptions/APIError";
import UserService from "./user";
import TokenService from "./token";
import bcrypt from "bcrypt";
import { sequelize } from "../database/sequelize";
import { Role } from "../permissions/roles";
import UserDto, { UserLike } from "../dtos/user";
import { CreateOptions } from "sequelize";

class AuthService {
  async registration(username: string, password: string, role: Role) {
    const candidate = await UserService.findUserByUsername(username);

    if (candidate) {
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

      const response = await processUserAndTokens(user, { transaction });
      await transaction.commit();

      return response;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async login(username: string, password: string) {
    const user = await UserService.findUserByUsername(username);

    if (!user) {
      throw APIError.BadRequest(`Користувач з ім'ям ${username} не знайдений`);
    }

    const arePasswordEqual = await bcrypt.compare(password, user.password);

    if (!arePasswordEqual) {
      throw APIError.BadRequest("Неправильний пароль");
    }

    return await processUserAndTokens(user);
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw APIError.Unauthourized();
    }

    const token = await TokenService.removeRefreshToken(refreshToken);
    return token;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw APIError.Unauthourized();
    }

    const userData = TokenService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw APIError.Unauthourized();
    }

    const tokenFromDatabase = await TokenService.findByRefreshToken(
      refreshToken
    );

    if (!tokenFromDatabase) {
      throw APIError.Unauthourized();
    }

    const user = await UserService.findUserById(userData.id);

    if (!user) {
      throw APIError.Unauthourized();
    }

    return await processUserAndTokens(user);
  }
}

export default new AuthService();

async function processUserAndTokens(
  userData: UserLike,
  options?: CreateOptions
) {
  const userDto = new UserDto(userData);
  const tokens = TokenService.generateTokens({ ...userDto });
  await TokenService.saveRefreshToken(
    {
      userId: userDto.id,
      refreshToken: tokens.refreshToken,
    },
    options
  );

  return { ...tokens, user: userDto };
}
