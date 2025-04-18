import { EventHandlerInterface } from "../../../event/@shared/event-handler.interface"
import { EventInterface } from "../../../event/@shared/event.interface"

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(`sending email to ${event.eventData.email}`)
  }
}
