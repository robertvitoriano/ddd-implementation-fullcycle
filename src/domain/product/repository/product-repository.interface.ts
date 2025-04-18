import { Product } from "../entity/product-a"
import { RepositoryInterface } from "../../@shared/repository/repository-interface"

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product>
}
