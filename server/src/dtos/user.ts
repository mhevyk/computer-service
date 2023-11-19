import UserModel from "../database/models/user.model";
import { Role } from "../permissions/roles";

export default class UserDto {
  public readonly id: number;
  public readonly username: string;
  public readonly role: Role;

  constructor(user: UserModel) {
    this.id = user.dataValues.user_id;
    this.username = user.dataValues.username;
    this.role = user.dataValues.role.name;
  }
}
