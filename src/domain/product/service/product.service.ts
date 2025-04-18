import { ProductRepository } from "../../../infrastructure/product/repository/sequelize/product.repository"
import { Product } from "../entity/product"

export class ProductsService {
  static async increasePrice(products: Product[], percentage: number): Promise<void> {
    const productsRepository = new ProductRepository()

    for (const product of products) {
      product.changePrice((product.price * percentage) / 100 + product.price)
      await productsRepository.update(product)
    }
  }
}
