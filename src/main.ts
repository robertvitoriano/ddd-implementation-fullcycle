import { Order } from "./domain/checkout/entity/order"
import { OrderItem } from "./domain/checkout/entity/order_item"
import { Address } from "./domain/entity/address"
import Customer from "./domain/entity/customer"

let customer = new Customer("123", "wesley williams")
const address = new Address("Rua josé Cícero cardía", 47, "18120000", "mairinque")
customer.Address = address
customer.activate()

const item1 = new OrderItem("1", "item 1", 10, "product 1", 4)
const item2 = new OrderItem("1", "item 2", 15, "product 2", 5)

const order = new Order("1", "123", [item1, item2])
