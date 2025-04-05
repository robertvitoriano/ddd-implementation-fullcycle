import { Order } from "../../../../domain/entity/order"
import { OrderRepositoryInterface } from "../../../../domain/repository/order-repository.interface"
import { OrderModel } from "./order.model"

export class OrderRepository implements OrderRepositoryInterface {
  findByName(name: string): Promise<Order> {
    throw new Error("Method not implemented.")
  }
  async create(order: Order): Promise<void> {
    OrderModel.create({
      customer_id: order.customerId,
      order,
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
