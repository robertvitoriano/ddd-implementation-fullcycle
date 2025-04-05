import { Order } from "../entity/order"
import { RepositoryInterface } from "./repository-interface"

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {
  findByName(name: string): Promise<Order>
}
