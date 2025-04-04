import { Address } from "./domain/entity/address"
import { Customer } from "./domain/entity/customer"
import { Order } from "./domain/entity/order"
import { OrderItem } from "./domain/entity/order_item"

let customer = new Customer("123", "wesley williams")
const address = new Address("Rua josé Cícero cardía", 47, "18120000", "mairinque")
customer.address = address
customer.activate()

const item1 = new OrderItem("1", "item 1", 10, "product 1", 4)
const item2 = new OrderItem("1", "item 2", 15, "product 2", 5)

const order = new Order("1", "123", [item1, item2])
