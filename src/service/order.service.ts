import { Order } from "../entity/order"

export class OrderService {
  static total(orders: Order[]): number {
    return orders.reduce((acc: number, currentValue: Order) => {
      return acc + currentValue.total()
    }, 0)
  }
}
