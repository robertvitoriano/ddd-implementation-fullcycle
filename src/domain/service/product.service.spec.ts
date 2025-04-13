import { Sequelize } from "sequelize-typescript"
import { CustomerModel } from "./../../infrastructure/customer/repository/sequelize/customer.model"
import { OrderItemModel } from "./../../infrastructure/order/repository/sequelize/order-item.model"
import { ProductModel } from "./../../infrastructure/product/repository/sequelize/product.model"
import { Product } from "./../entity/product"
import { OrderModel } from "./../../infrastructure/order/repository/sequelize/order.model"
import { ProductsService } from "./product.service"

describe("Product service unit tests", () => {
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

  it("Should change the price of all products", async () => {
    const product1 = new Product("product1", "Product 1", 10)
    const product2 = new Product("product2", "Product 2", 20)
    const products = [product1, product2]
    await ProductsService.increasePrice(products, 100)
    expect(product1.price).toBe(20)
    expect(product2.price).toBe(40)
  })
})
