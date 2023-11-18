import UserModel from "../database/models/user.model";

export default class UserDto {
  public readonly id: number;
  public readonly username: string;
  public readonly role: string;

  constructor(user: UserModel) {
    this.id = user.user_id;
    this.username = user.username;
    this.role = user.role.name;
  }
}