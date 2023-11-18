import jwt from "jsonwebtoken";
import TokenModel from "../database/models/token.model";
import { CreateOptions } from "sequelize";

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
}

export default new TokenService();
