import { EventDispatcherInterface, EventHandlers } from "./event-distpatcher.interface"
import { EventHandlerInterface } from "./event-handler.interface"
import { EventInterface } from "./event.interface"

export class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: EventHandlers = {
    event: [],
  }

  get getEventHandlers(): EventHandlers {
    return this.eventHandlers
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name

    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event)
      })
    }
  }
  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const eventHandlerIndex = this.eventHandlers[eventName].indexOf(eventHandler)

      if (eventHandlerIndex != -1) this.eventHandlers[eventName].splice(eventHandlerIndex, 1)

      return
    }
    this.eventHandlers[eventName] = []
  }
  unregisterAll(): void {
    this.eventHandlers = {}
  }
}
