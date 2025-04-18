import { Product } from "../../entity/product"
import { RepositoryInterface } from "../../repository/repository-interface"

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product>
}
