import { Product } from "../../../../domain/entity/product"
import { ProductRepositoryInterface } from "../../../../domain/product/repository/product-repository.interface"
import { ProductModel } from "./product.model"

export class ProductRepository implements ProductRepositoryInterface {
  async findByName(name: string): Promise<Product> {
    const product = await ProductModel.findOne({
      where: {
        name,
      },
    })

    return new Product(product.id, product.name, product.price)
  }
  async create(product: Product): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  }
  delete(id: string): Promise<void> {
    throw new Error("Method not implemented.")
  }
  async update(product: Product): Promise<void> {
    await ProductModel.update(
      { name: product.name, price: product.price },
      {
        where: {
          id: product.id,
        },
      }
    )
  }
  find(id: string): Promise<Product> {
    throw new Error("Method not implemented.")
  }
  async findAll(): Promise<Product[]> {
    const foundProducts: Product[] = []
    const products = await ProductModel.findAll()

    for (const { id, name, price } of products) {
      foundProducts.push(new Product(id, name, price))
    }
    return foundProducts
  }
}
