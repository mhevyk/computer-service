import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
} from "sequelize-typescript";

@Table({ tableName: "computer" })
export default class ComputerModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  computer_id: number;

  @Unique
  @Column(DataType.STRING(255))
  name: string;

  @Column(DataType.STRING(255))
  brand: string;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  is_custom: string;

  @Column(DataType.DATEONLY)
  release_date: Date;
}
