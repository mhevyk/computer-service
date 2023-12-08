import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  AllowNull,
  Default,
  BelongsTo,
} from "sequelize-typescript";
import ComputerModel from "./computer.model";
import UserModel from "./user.model";

export const ORDER_STATUS = {
  ACCEPTED: "ACCEPTED",
  IN_PROCESS: "IN_PROCESS",
  SHIPPED: "SHIPPED",
  COMPLETED: "COMPLETED",
  CANCELED: "CANCELED",
};

export type OrderStatus = keyof typeof ORDER_STATUS;

@Table({ tableName: "order", timestamps: true })
export default class OrderModel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  order_id: number;

  @ForeignKey(() => ComputerModel)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  computer_id: number;

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  user_id: number;

  @Default(ORDER_STATUS.ACCEPTED)
  @Column(DataType.ENUM(...Object.keys(ORDER_STATUS)))
  status: OrderStatus;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price: number;

  @BelongsTo(() => ComputerModel, "computer_id")
  computer: ComputerModel;

  @BelongsTo(() => UserModel, "user_id")
  user: UserModel;
}
