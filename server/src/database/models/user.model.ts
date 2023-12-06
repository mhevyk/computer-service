import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  ForeignKey,
  Default,
  BelongsTo,
} from "sequelize-typescript";
import RoleModel from "./role.model";

@Table({ tableName: "user" })
export default class UserModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  user_id: number;

  @ForeignKey(() => RoleModel)
  @AllowNull(false)
  @Default(1)
  @Column(DataType.INTEGER)
  role_id: number;

  @BelongsTo(() => RoleModel)
  role: RoleModel;

  @Unique
  @AllowNull(false)
  @Column(DataType.STRING(50))
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING(255))
  password: string;
}
