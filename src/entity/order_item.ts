export class OrderItem {
  _id: string;
  name: string;
  _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this.name = name;
    this._price = price;
  }

  get price(): number {
    return this._price;
  }
}
