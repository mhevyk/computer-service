import { CreateOptions } from "sequelize";
import RoleModel from "../database/models/role.model";
import UserModel from "../database/models/user.model";
import APIError from "../exceptions/APIError";
import { RegistrationBody } from "../types/request";

class UserService {
  async findUserById(id: number) {
    return await UserModel.findOne({
      where: { user_id: id },
      include: [{ model: RoleModel, attributes: ["name"] }],
    });
  }

  async findUserByUsername(username: string) {
    return await UserModel.findOne({
      where: { username },
      include: [{ model: RoleModel, attributes: ["name"] }],
    });
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
      ...userRecord,
      role: { name: role },
    };
  }
}

export default new UserService();
