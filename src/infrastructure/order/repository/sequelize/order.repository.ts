import { Order } from "../../../../domain/entity/order"
import { OrderItem } from "../../../../domain/entity/order_item"
import { OrderRepositoryInterface } from "../../../../domain/repository/order-repository.interface"
import { OrderItemModel } from "./order-item.model"
import { OrderModel } from "./order.model"
export default class OrderRepository implements OrderRepositoryInterface {
  async delete(id: string): Promise<void> {
    await OrderModel.destroy({
      where: {
        id,
      },
      cascade: true,
    })
  }
  async update(entity: Order): Promise<void> {
    // First update the order itself
    await OrderModel.update(
      {
        total: entity.total(),
        customer_id: entity.customerId,
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
    const orderModel = await OrderModel.findOne({
      where: { id: entity.id },
      include: ["items"],
    })

    const currentItems = orderModel.items

    const newItemsMap = new Map<string, OrderItem>()

    entity.items.forEach((item) => newItemsMap.set(item.id, item))

    for (const currentItem of currentItems) {
      if (!newItemsMap.has(currentItem.id)) {
        await OrderItemModel.destroy({
          where: { id: currentItem.id },
        })
      }
    }

    for (const newItem of entity.items) {
      const existingItem = currentItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        await OrderItemModel.update(
          {
            name: newItem.name,
            price: newItem.price,
            product_id: newItem.productId,
            quantity: newItem.quantity,
          },
          {
            where: { id: newItem.id },
          }
        )
      } else {
        await OrderItemModel.create({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          product_id: newItem.productId,
          quantity: newItem.quantity,
          order_id: entity.id,
        })
      }
    }
  }
  async find(id: string): Promise<Order | null> {
    const order = await OrderModel.findOne({
      where: {
        id,
      },
      include: ["items"],
    })
    if (!order) return null
    return new Order(
      order.id,
      order.customer_id,
      order.items.map(
        (item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      )
    )
  }
  async findAll(): Promise<Order[]> {
    const ordersFound = await OrderModel.findAll()

    return ordersFound.map((order) => {
      return new Order(
        order.id,
        order.customer_id,
        order.items.map(
          (item) => new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
        )
      )
    })
  }
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    )
  }
}
