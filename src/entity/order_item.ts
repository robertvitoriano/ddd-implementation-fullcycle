export class OrderItem {
  private _id: string;
  private _productId: string;
  private name: string;
  private _price: number;
  private _quantity: number;
  constructor(id: string, name: string, price: number, productId: string, quantity: number) {
    this._id = id;
    this.name = name;
    this._price = price;
    this._productId = productId;
    this._quantity = quantity;
    this.validate();
  }

  get price(): number {
    return this._price * this._quantity;
  }
  validate() {
    if (this._quantity < 1) {
      throw new Error("item quantity should be greater than 1");
    }
    if (this._price < 0) {
      throw new Error("price should be greater than 0");
    }
  }
}
