import { Sequelize } from "sequelize-typescript"
import { OrderModel } from "./order.model"
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
import { OrderRepository } from "./order.repository"

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

  it("Should create a new order", async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer("asdsad", "Robert Vitoriano")
    const address = new Address("Rua dos bovos", 1, "181200", "Mairinque")
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product = new Product("123", "My first product", 200)
    await productRepository.create(product)

    const orderItem1 = new OrderItem("asdasdasd", "order item 1", product.price, product.id, 2)
    const orderItem2 = new OrderItem("asdasdasd", "order item 2", product.price, product.id, 5)

    const order = new Order("12323", customer.id, [orderItem1, orderItem2])

    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id,
      },
      include: ["items"],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: "12323",
      customer_id: "asdsad",
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          product_id: orderItem1.productId,
          name: orderItem1.name,
          price: orderItem1.price,
          order_id: "12323",
        },
        {
          id: orderItem2.id,
          product_id: orderItem2.productId,
          name: orderItem2.name,
          price: orderItem2.price,
          order_id: "12323",
        },
      ],
    })
  })
})
