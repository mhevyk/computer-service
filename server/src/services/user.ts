import RoleModel from "../database/models/role.model";
import UserModel from "../database/models/user.model";
import APIError from "../exceptions/APIError";

class UserService {
  async findUserByUsername(username: string) {
    return await UserModel.findOne({ where: { username } });
  }

  async createUser(username: string, hashedPassword: string, role: string) {
    const roleRecord = await RoleModel.findOne({
      where: { name: role },
    });

    if (roleRecord === null) {
      throw APIError.BadRequest(`Ролі ${role} немає у базі даних`);
    }

    return await UserModel.create({
      username,
      password: hashedPassword,
      role_id: roleRecord.role_id,
    });
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
