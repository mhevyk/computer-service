import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: false,
})
export class User extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT })
  user_id: string;

  @Column({ allowNull: false })
  username: string;

  @Column
  password: string;
}
