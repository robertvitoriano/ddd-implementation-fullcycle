import Customer from "../../customer/entity/customer"
import { Order } from "../entity/order"
import { OrderItem } from "../entity/order_item"
import { OrderService } from "./order.service"

describe("Order service unit test", () => {
  it("Should get the total of all orders ", () => {
    const item1 = new OrderItem("i1", "Item 1", 100, "p1", 1)
    const item2 = new OrderItem("i2", "Item2", 200, "p2", 2)
    const order = new Order("01", "c1", [item1])
    const order2 = new Order("02", "c2", [item2])
    const total = OrderService.total([order, order2])
    expect(total).toBe(500)
  })

  it("When placing an order reward points will be half of the spent value", () => {
    const customer = new Customer("c1", "Customer 1")
    const item1 = new OrderItem("i1", "Item 1", 10, "p1", 1)
    const order = OrderService.placeOrder(customer, [item1])
    expect(order.total()).toBe(10)
    expect(customer.rewardPoints).toBe(5)
  })

  it("Should add reward ppoints ", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)
    customer.addRewardPoints(20)
    expect(customer.rewardPoints).toBe(30)
  })
})
