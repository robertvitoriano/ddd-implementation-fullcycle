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
    const amountOfRewardPointsToAdd =
      items.reduce((acc, currentValue) => acc + currentValue.price, 0) / 2

    customer.addRewardPoints(amountOfRewardPointsToAdd)
    return new Order("o1", customer.id, items)
  }
}
