import { OrderItem } from "./order_item"

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]
  private _total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0)
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("id is required")
    }
    if (this._customerId.length === 0) {
      throw new Error("customerId is required")
    }
    if (this._items.length === 0) {
      throw new Error("items  quantity must be greater than zero")
    }
  }
}
