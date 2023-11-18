type UserData = {
  user_id: number;
  username: string;
  role: { name: string };
};

export default class UserDto {
  public readonly id: number;
  public readonly username: string;
  public readonly role: string;

  constructor(user: UserData) {
    this.id = user.user_id;
    this.username = user.username;
    this.role = user.role.name;
  }
}
