import { Order } from "../entity/order"
import { RepositoryInterface } from "../../repository/repository-interface"

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
