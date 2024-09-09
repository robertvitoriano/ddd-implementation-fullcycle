import { Order } from "./order";
describe("order' unit test", () => {
  it("throw error no id is given", () => {
    expect(() => {
      new Order("", "456", []);
    }).toThrow("id is required");
  });
});
