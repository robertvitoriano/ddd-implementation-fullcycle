import { SendEmailWhenProductIsCreatedHandler } from "../product/handler/send-email-when-product-is-created.handler"
import { ProductCreatedEvent } from "../product/product-created.event"
import { EventDispatcher } from "./event-dispatcher"

describe("Domain events tests", () => {
  it("Should be able to register a new event handler", () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()

    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
  })
  it("Should be able to unregister an event", () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler)
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0)
  })

  it("Should be able to unregister all events", () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    eventDispatcher.register("ProductCreatedEvent", eventHandler)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

    eventDispatcher.unregisterAll()
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).not.toBeDefined()
  })

  it("SHOULD NOTIFY ALL EVENT HANDLERS", () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(eventHandler, "handle")

    eventDispatcher.register("ProductCreatedEvent", eventHandler)
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined()

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1)

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler)
    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    })

    eventDispatcher.notify(productCreatedEvent)
    expect(spyEventHandler).toHaveBeenCalled()
  })
})
