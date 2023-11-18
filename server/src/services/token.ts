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

  async removeRefreshToken(refreshToken: string) {
    const queryCondition = { where: { refresh_token: refreshToken } };
    const recordToDelete = await TokenModel.findOne(queryCondition);

    if (!recordToDelete) {
      throw new Error("Refresh токен не був знайдений");
    }

    await TokenModel.destroy(queryCondition);
    return recordToDelete.refresh_token;
  }
}

export default new TokenService();
