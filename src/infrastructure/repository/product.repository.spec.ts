import { Sequelize } from "sequelize-typescript"
import { ProductModel } from "../database/sequelize/model/product.model"

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
  it("Should pass", () => {})
})
