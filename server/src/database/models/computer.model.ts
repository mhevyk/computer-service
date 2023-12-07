import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  AllowNull,
  HasMany,
  Default,
} from "sequelize-typescript";
import ComponentModel from "./component.model";

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

  @HasMany(() => ComponentModel)
  components: ComponentModel[];

  @Default(0)
  @Column(DataType.VIRTUAL)
  get price() {
    return this.components.reduce(
      (sum, component) => sum + (component.price_per_unit || 0),
      0
    );
  }
}
