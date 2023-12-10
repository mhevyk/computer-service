import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  ForeignKey,
} from "sequelize-typescript";
import ComputerModel from "./computer.model";

@Table({ tableName: "component" })
export default class ComponentModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  component_id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  manufactorer_id: number;

  @ForeignKey(() => ComputerModel)
  @Column(DataType.INTEGER)
  computer_id: number;

  @Column(DataType.INTEGER)
  processor_id: number;

  @Column(DataType.INTEGER)
  motherboard_id: number;

  @Column(DataType.INTEGER)
  memory_id: number;

  @Column(DataType.INTEGER)
  videocard_id: number;

  @Column(DataType.INTEGER)
  power_supply_id: number;

  @Column(DataType.DOUBLE)
  price_per_unit: number;

  @Column(DataType.INTEGER)
  quantity: number;
}
