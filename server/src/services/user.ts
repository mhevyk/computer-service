import { CreateOptions } from "sequelize";
import RoleModel from "../database/models/role.model";
import UserModel from "../database/models/user.model";
import APIError from "../exceptions/APIError";
import { RegistrationBody } from "../types/request";

class UserService {
  async findUserByUsername(username: string) {
    return await UserModel.findOne({ where: { username } });
  }

  async createUser(
    { username, password, role }: RegistrationBody,
    options?: CreateOptions
  ) {
    const roleRecord = await RoleModel.findOne({
      where: { name: role },
    });

    if (roleRecord === null) {
      throw APIError.BadRequest(`Ролі ${role} немає у базі даних`);
    }

    const userRecord = await UserModel.create(
      {
        username,
        password,
        role_id: roleRecord.role_id,
      },
      {
        ...options,
      }
    );

    return {
      id: userRecord.user_id,
      username: userRecord.username,
      role: roleRecord.name,
    };
  }

  async getRoleByUserId(userId: number) {
    return await UserModel.findOne({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: RoleModel,
          attributes: ["name"],
        },
      ],
    });
  }
}

export default new UserService();
