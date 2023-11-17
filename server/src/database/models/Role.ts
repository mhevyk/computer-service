import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: false,
})
export class Role extends Model {
  @Column({ primaryKey: true, type: DataType.BIGINT })
  role_id: string;

  @Column({ allowNull: false })
  name: string;
}
