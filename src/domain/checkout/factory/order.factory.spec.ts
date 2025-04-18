import { v4 as uuid } from "uuid"
import { OrderFactory } from "./OrderFactory"
describe("Order Factory Unit Test", () => {
  it("Should create an order", () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        {
          id: uuid(),
          name: "Item 1",
          price: 10,
          productId: uuid(),
          quantity: 2,
        },
        {
          id: uuid(),
          name: "Item 1",
          price: 20,
          productId: uuid(),
          quantity: 3,
        },
      ],
    }
    const order = OrderFactory.create(orderProps)
    expect(order.id).toBe(orderProps.id)
    expect(order.customerId).toBe(orderProps.customerId)
    expect(order.items.length).toBe(2)
    expect(order.items[0].id).toBe(orderProps.items[0].id)
    expect(order.items[0].name).toBe(orderProps.items[0].name)
    expect(order.items[0].price).toBe(orderProps.items[0].price)
    expect(order.items[0].productId).toBe(orderProps.items[0].productId)
    expect(order.items[0].quantity).toBe(orderProps.items[0].quantity)
    expect(order.items[1].id).toBe(orderProps.items[1].id)
    expect(order.items[1].name).toBe(orderProps.items[1].name)
    expect(order.items[1].price).toBe(orderProps.items[1].price)
    expect(order.items[1].productId).toBe(orderProps.items[1].productId)
    expect(order.items[1].quantity).toBe(orderProps.items[1].quantity)
    expect(order.total()).toBe(80)
  })
})
