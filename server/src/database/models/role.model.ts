import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
} from "sequelize-typescript";

@Table({
  tableName: "role",
  timestamps: false,
})
export default class RoleModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  role_id: number;

  @Unique
  @Column(DataType.STRING(50))
  name: string;
}
