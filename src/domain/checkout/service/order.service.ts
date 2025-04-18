import { Order } from "../entity/order"
import { OrderItem } from "../entity/order_item"
import Customer from "../../entity/customer"

import { v4 as uuid } from "uuid"
export class OrderService {
  constructor() {}
  static total(orders: Order[]): number {
    return orders.reduce((acc: number, currentValue: Order) => {
      return acc + currentValue.total()
    }, 0)
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    const newOrder = new Order(uuid(), customer.id, items)
    customer.addRewardPoints(newOrder.total() / 2)
    // const customerRepository = new CustomerRepository()
    // customerRepository.update(customer)

    return newOrder
  }
}
