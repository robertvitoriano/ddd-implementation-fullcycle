import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "./product.model"
import { Product } from "../../../../domain/entity/product"
import { ProductRepository } from "./product.repository"

describe("Product repository teste", () => {
  let connection: Sequelize

  beforeEach(async () => {
    connection = new Sequelize({
      dialect: "sqlite",
      storage: ":memory",
      logging: false,
      sync: { force: true },
    })
    connection.addModels([ProductModel])
    await connection.sync()
  })

  afterEach(async () => {
    await connection.close()
  })

  it("Should create a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("10", "Product 1", 100)

    productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "10" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "10",
      name: "Product 1",
      price: 100,
    })
  })
  it("Should update a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("10", "Product 1", 100)

    productRepository.create(product)

    const productModel = await ProductModel.findOne({ where: { id: "10" } })

    expect(productModel.toJSON()).toStrictEqual({
      id: "10",
      name: "Product 1",
      price: 100,
    })
    product.changeName("Product 2")
    product.changePrice(200)

    await productRepository.update(product)

    const updatedModel = await ProductModel.findOne({ where: { id: "10" } })

    expect(updatedModel.toJSON()).toStrictEqual({
      id: "10",
      name: "Product 2",
      price: 200,
    })
  })

  it("Should be able to find  a product", async () => {
    const productRepository = new ProductRepository()
    const product = new Product("10", "Product 1", 100)

    productRepository.create(product)

    const foundProduct = await productRepository.findByName(product.name)

    expect(foundProduct.id).toBe(product.id)
    expect(foundProduct.price).toBe(product.price)
    expect(foundProduct.name).toBe(product.name)
  })
  it("Should be able to find  all products", async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product("10", "Product 1", 100)
    const product2 = new Product("12", "Product 2", 200)

    await productRepository.create(product1)
    await productRepository.create(product2)

    const foundProducts = await productRepository.findAll()

    expect(foundProducts).toEqual([product1, product2])
  })
})
