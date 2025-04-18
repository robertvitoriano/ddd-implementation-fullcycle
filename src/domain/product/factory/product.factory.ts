import { Product } from "../entity/product-a"
import { v4 as uuid } from "uuid"
import { ProductB } from "../entity/product-b"
import { ProductInterface } from "../entity/product.interface"
export class ProductFactory {
  static create(props: { type: string; name: string; price: number }): ProductInterface {
    switch (props.type) {
      case "a":
        return this.createProductA(props)
      case "b":
        return this.createProductB(props)
      default:
        throw new Error("Invalid product type")
    }
  }

  private static createProductA(props: { name: string; price: number }) {
    return new Product(uuid(), props.name, props.price)
  }

  private static createProductB(props: { name: string; price: number }) {
    return new ProductB(uuid(), props.name, props.price)
  }
}
