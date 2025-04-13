import { CustomerCreatedEvent } from "../customer/customer-created-event"
import { EnviaConsoleLog1Handler } from "../customer/handler/envia-consolelog1.handler"
import { EnviaConsoleLog2Handler } from "../customer/handler/envia-consolelog2.handler"
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

  it("should notify event handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher()
    const eventHandler1 = new EnviaConsoleLog1Handler()
    const eventHandler2 = new EnviaConsoleLog2Handler()

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle")
    const spyEventHandler2 = jest.spyOn(eventHandler1, "handle")

    const consoleLogSpy = jest.spyOn(console, "log")

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1)
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2)
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined()

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2)

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1)

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer created 1",
    })

    eventDispatcher.notify(customerCreatedEvent)

    expect(spyEventHandler1).toHaveBeenCalledTimes(1)
    expect(spyEventHandler2).toHaveBeenCalledTimes(1)

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    )

    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    )
  })
})
