import { Address } from "../value-object/address"
import Customer from "./customer"
describe("Customer unit test", () => {
  it("throw error if id is empty", () => {
    expect(() => {
      let customer = new Customer("", "jonh")
    }).toThrow("Id is required")
  })
  it("throw error if name is empty", () => {
    expect(() => {
      let customer = new Customer("as", "")
    }).toThrow("Name is required")
  })
  it("should be able to change customer name", () => {
    //arrange
    let customer = new Customer("123", "josh")
    //act
    customer.changeName("jonh")
    //assert
    expect(customer.name).toBe("jonh")
  })

  it("should be able to activate customer", () => {
    //arrange
    let customer = new Customer("123", "josh")
    //act
    const address = new Address("street1", 47, "18120000", "mairinque")
    customer.Address = address
    customer.activate()
    //assert
    expect(customer.isActive()).toBe(true)
  })
  it("should be able to deactivate customer", () => {
    //arrange
    let customer = new Customer("123", "josh")
    //act
    customer.deactivate()
    //assert
    expect(customer.isActive()).toBe(false)
  })
  it("throw error if activate user without address", () => {
    expect(() => {
      let customer = new Customer("123", "josh")
      customer.activate()
    }).toThrow("Address is mandatory to activate a customer")
  })
})
