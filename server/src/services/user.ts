import { CreateOptions } from "sequelize";
import RoleModel from "../database/models/role.model";
import UserModel from "../database/models/user.model";
import APIError from "../exceptions/APIError";
import { RegistrationBody } from "../types/request";
import { checkRoleValid } from "../permissions/roles";

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

    let role_id: number;

    if (roleRecord === null && checkRoleValid(role)) {
      const userRoleRecord = await RoleModel.create({ name: role });
      role_id = userRoleRecord.role_id;
    } else if (roleRecord === null) {
      throw APIError.BadRequest(`Ролі ${role} немає у базі даних`);
    } else {
      role_id = roleRecord.role_id;
    }

    const userRecord = await UserModel.create(
      {
        username,
        password,
        role_id,
      },
      options
    );

    userRecord.dataValues.role = { name: role };

    return userRecord;
  }
}

export default new UserService();
