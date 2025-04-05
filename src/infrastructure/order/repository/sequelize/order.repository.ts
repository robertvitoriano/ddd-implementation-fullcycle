import { Order } from "../../../../domain/entity/order"
import { OrderItem } from "../../../../domain/entity/order_item"
import { OrderRepositoryInterface } from "../../../../domain/repository/order-repository.interface"
import { OrderModel } from "./order.model"

export class OrderRepository implements OrderRepositoryInterface {
  findByName(name: string): Promise<Order> {
    throw new Error("Method not implemented.")
  }
  async create(order: Order): Promise<void> {
    await OrderModel.create({
      id: order.id,
      customer_id: order.customerId,
      total: order.total(),
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    })
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  update(entity: Order): Promise<void> {
    throw new Error("Method not implemented.")
  }
  find(id: string): Promise<Order> {
    throw new Error("Method not implemented.")
  }
  findAll(): Promise<Order[]> {
    throw new Error("Method not implemented.")
  }
}
