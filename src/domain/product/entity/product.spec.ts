import { Product } from "./product-a"
describe("order unit test", () => {
  it("throws an error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 21)
    }).toThrow("id is required")
  })
  it("throws an error when id is empty", () => {
    expect(() => {
      const product = new Product("asdas", "", 21)
    }).toThrow("name is required")
  })
  it("throws an error when price is zero", () => {
    expect(() => {
      const product = new Product("asd", "Product 1", 0)
    }).toThrow("price cannot be less than 1")
  })
  it("should be able to change product price", () => {
    const product = new Product("asdas", "ASADASD", 21)
    product.changePrice(25)
    expect(product.price).toBe(25)
  })
  it("should be able to change product name", () => {
    const product = new Product("asdas", "ASADASD", 21)
    product.changeName("PRODUCT 2")
    expect(product.name).toBe("PRODUCT 2")
  })
})
