import jwt from "jsonwebtoken";
import TokenModel from "../database/models/token.model";
import { CreateOptions } from "sequelize";
import UserDto from "../dtos/user";

type SaveRefreshToken = {
  userId: number;
  refreshToken: string;
};

class TokenService {
  generateTokens(payload: Record<string, any>) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  async findByRefreshToken(refreshToken: string) {
    return await TokenModel.findOne({ where: { refresh_token: refreshToken } });
  }

  validateAccessToken(token: string) {
    return this.#validateToken(token, process.env.JWT_ACCESS_SECRET);
  }

  validateRefreshToken(token: string) {
    return this.#validateToken(token, process.env.JWT_REFRESH_SECRET);
  }

  async saveRefreshToken(
    { userId, refreshToken }: SaveRefreshToken,
    options?: CreateOptions
  ) {
    return await TokenModel.create(
      {
        user_id: userId,
        refresh_token: refreshToken,
      },
      options
    );
  }

  async removeRefreshToken(refreshToken: string) {
    const queryCondition = { where: { refresh_token: refreshToken } };
    const recordToDelete = await TokenModel.findOne(queryCondition);

    if (!recordToDelete) {
      throw new Error("Refresh токен не був знайдений");
    }

    await TokenModel.destroy(queryCondition);
    return recordToDelete.refresh_token;
  }

  #validateToken(token: string, secret: string) {
    try {
      return jwt.verify(token, secret) as UserDto;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
