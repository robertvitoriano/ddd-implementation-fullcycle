import { ProductFactory } from "./product.factory"

describe("Product Factory Unit Test", () => {
  it("Should create a product", () => {
    const product = ProductFactory.create({
      type: "a",
      name: "Product 1",
      price: 10.0,
    })
    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product 1")
    expect(product.price).toBe(10.0)
  })
  it("Should create a product b", () => {
    const product = ProductFactory.create({
      type: "b",
      name: "Product 1",
      price: 10.0,
    })
    expect(product.id).toBeDefined()
    expect(product.name).toBe("Product 1")
    expect(product.price).toBe(20.0)
  })
  it("Should throw an error for invalid product type", () => {
    expect(() => {
      ProductFactory.create({
        type: "c",
        name: "Product 1",
        price: 10.0,
      })
    }).toThrowError("Invalid product type")
  })
})
