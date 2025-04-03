import { Customer } from "../entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/order_item"

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc: number, currentValue: Order) => {
      return acc + currentValue.total()
    }, 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const newOrder = new Order(String(Math.random() * 100), customer.id, items)
    customer.addRewardPoints(newOrder.total() / 2)
    return newOrder
  }
}
