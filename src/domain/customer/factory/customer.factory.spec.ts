import { Address } from "../value-object/address"
import { CustomerFactory } from "./customer.factory"

describe("Customer Factory Unit Test", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("Customer 1")
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("Customer 1")
  })
  it("SHould create a customer with an address", () => {
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1")
    const customer = CustomerFactory.createWithAddress({
      name: "Customer 1",
      address,
    })
    expect(customer.id).toBeDefined()
    expect(customer.name).toBe("Customer 1")
    expect(customer.address).toBeDefined()
    expect(customer.address.street).toBe("Street 1")
    expect(customer.address.number).toBe(1)
    expect(customer.address.zip).toBe("Zipcode 1")
    expect(customer.address.city).toBe("City 1")
  })
})
