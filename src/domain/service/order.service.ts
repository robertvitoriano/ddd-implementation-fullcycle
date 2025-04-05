import Customer from "../entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/order_item"
import { v4 as uuid } from "uuid"
export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc: number, currentValue: Order) => {
      return acc + currentValue.total()
    }, 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const newOrder = new Order(uuid(), customer.id, items)
    customer.addRewardPoints(newOrder.total() / 2)
    return newOrder
  }
}
