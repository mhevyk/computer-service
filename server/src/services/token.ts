import jwt from "jsonwebtoken";
import TokenModel from "../database/models/token.model";

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

  async saveRefreshToken(userId: number, refreshToken: string) {
    return await TokenModel.create({
      user_id: userId,
      refresh_token: refreshToken,
    });
  }
}

export default new TokenService();
