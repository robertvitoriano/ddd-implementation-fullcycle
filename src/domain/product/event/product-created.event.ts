import { EventInterface } from "../../event/@shared/event.interface"

export class ProductCreatedEvent implements EventInterface {
  dataTimeOcurred: Date
  eventData: any
  constructor(eventData: any) {
    this.dataTimeOcurred = new Date()
    this.eventData = eventData
  }
}
