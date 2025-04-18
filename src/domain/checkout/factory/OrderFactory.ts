import { Order } from "../entity/order"
import { OrderItem } from "../entity/order_item"

export interface OrderFactoryPropsInterface {
  id: string
  customerId: string
  items: { id: string; name: string; price: number; quantity: number; productId: string }[]
}
export class OrderFactory {
  static create(props: OrderFactoryPropsInterface) {
    const items: OrderItem[] = []

    for (const item of props.items) {
      items.push(new OrderItem(item.id, item.name, item.price, item.productId, item.quantity))
    }
    const order = new Order(props.id, props.customerId, items)
    order.validate()
    return order
  }
}
