import { Product } from "../entity/product"

export class ProductsService {
  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product: Product) => {
      product.changePrice((product.price * percentage) / 100 + product.price)
    })
  }
}
