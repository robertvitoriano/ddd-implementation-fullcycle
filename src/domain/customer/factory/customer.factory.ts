import Customer from "../entity/customer"
import { v4 as uuidv4 } from "uuid"
import { Address } from "../value-object/address"
export class CustomerFactory {
  static create(name: string) {
    return new Customer(uuidv4(), name)
  }
  static createWithAddress({
    name,
    address: { street, number, zip, city },
  }: {
    name: string
    address: Address
  }) {
    const customer = new Customer(uuidv4(), name)
    customer.Address = new Address(street, number, zip, city)
    return customer
  }
}
