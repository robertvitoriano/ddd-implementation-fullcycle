import { Sequelize } from "sequelize-typescript"
import { CustomerModel } from "../../../customer/repository/sequelize/customer.model"
import { OrderItemModel } from "./order-item.model"
import { ProductModel } from "../../../product/repository/sequelize/product.model"
import { CustomerRepository } from "../../../customer/repository/sequelize/customer.repository"
import Customer from "../../../../domain/entity/customer"
import { Product } from "../../../../domain/entity/product"
import { Address } from "../../../../domain/entity/address"
import { ProductRepository } from "../../../product/repository/sequelize/product.repository"
import { Order } from "../../../../domain/entity/order"
import { OrderItem } from "../../../../domain/entity/order_item"
import { OrderModel } from "./order.model"
import OrderRepository from "./order.repository"

describe("Order repository test", () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([ProductModel, OrderModel, CustomerModel, OrderItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    })
  })

  it("should update a new order", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderItem2 = new OrderItem("2", product.name + " 2", product.price * 200, product.id, 2)

    const updatedOrder = new Order(order.id, order.customerId, [orderItem, orderItem2])

    await orderRepository.update(updatedOrder)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: updatedOrder.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    })
  })

  it("SHould be able to find the created order", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

    const order = new Order("123", "123", [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const orderFound = await orderRepository.find(order.id)

    expect(orderFound).toEqual(order)
  })

  it("Should be able to delete an order and its order item", async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer("123", "Customer 1")
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product("123", "Product 1", 10)
    await productRepository.create(product)

    const orderItem = new OrderItem("1", product.name, product.price, product.id, 2)

    const order = new Order("123", "123", [orderItem])
    const orderRepository = new OrderRepository()
    await orderRepository.create(order)
    const createdOrder = await orderRepository.find(order.id)

    expect(createdOrder).toEqual(order)

    await orderRepository.delete(order.id)

    const deletedOrder = await orderRepository.find(createdOrder.id)

    expect(deletedOrder).toBe(null)
    for (const item of order.items) {
      const deletedItem = await OrderItemModel.findOne({
        where: {
          id: item.id,
        },
      })
      expect(deletedItem).toBe(null)
    }
  })
})
