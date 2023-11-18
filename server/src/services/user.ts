import RoleModel from "../database/models/role.model";
import UserModel from "../database/models/user.model";

class UserService {
  async getUserByUsername(username: string) {
    return await UserModel.findOne({ where: { username } });
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
