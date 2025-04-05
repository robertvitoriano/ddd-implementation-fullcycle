import {
  Table,
  Model,
  PrimaryKey,
  Column,
  AllowNull,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript"
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model"
import { OrderItemModel } from "./order-item.model copy"

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => CustomerModel)
  @Column({ allowNull: false })
  declare customer_id: string

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]

  @Column({ allowNull: false })
  declare total: number
}
