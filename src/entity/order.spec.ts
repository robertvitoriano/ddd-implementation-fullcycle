import { Order } from "./order";
import { OrderItem } from "./order_item";
describe("order unit test", () => {
  it("throws an error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", [new OrderItem("123", "order item", 54, "p2", 3)]);
    }).toThrow("id is required");
  });
  it("throws an error when items are empty", () => {
    expect(() => {
      let order = new Order("sdfds", "123", []);
    }).toThrow("items  quantity must be greater than zero");
  });
  it("throws an error when customerId is empty", () => {
    expect(() => {
      let order = new Order("asdas", "", [new OrderItem("123", "order item", 54, "p1", 10)]);
    }).toThrow("customerId is required");
  });
  it("should calculate total correctly", () => {
    let order = new Order("asdas", "dd", [
      new OrderItem("123", "order item", 20, "p1", 2),
      new OrderItem("123", "order item", 30, "p2", 5),
      new OrderItem("123", "order item", 54, "p3", 4),
    ]);
    expect(order.total()).toBe(406);
  });
  it("should check if quantity is greater than 1", () => {
    expect(() => {
      new Order("asdas", "dd", [
        new OrderItem("123", "order item", 20, "p1", 0),
        new OrderItem("123", "order item", 30, "p2", -1),
        new OrderItem("123", "order item", 54, "p3", 4),
      ]);
    }).toThrow("item quantity should be greater than 1");
  });
  it("should check if quantity is greater than 1", () => {
    expect(() => {
      new Order("asdas", "dd", [
        new OrderItem("123", "order item", 0, "p1", 2),
        new OrderItem("123", "order item", -2, "p2", 1),
        new OrderItem("123", "order item", 3, "p3", 4),
      ]);
    }).toThrow("price should be greater than 0");
  });
});
