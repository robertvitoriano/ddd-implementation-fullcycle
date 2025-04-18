import { ProductInterface } from "./product.interface"

export class Product implements ProductInterface {
  private _id: string
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    this._id = id
    this._name = name
    this._price = price
    this.validate()
  }

  get name() {
    return this._name
  }
  get price() {
    return this._price
  }
  get id() {
    return this._id
  }
  changeName(name: string) {
    this._name = name
    this.validate()
  }
  changePrice(price: number) {
    this._price = price
    this.validate()
  }
  private validate() {
    if (this._id === "") {
      throw new Error("id is required")
    }
    if (this._name === "") {
      throw new Error("name is required")
    }
    if (this._price < 1) {
      throw new Error("price cannot be less than 1")
    }
  }
}
