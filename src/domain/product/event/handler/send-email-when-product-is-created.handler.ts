import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface"
import { EventInterface } from "../../../@shared/event/event.interface"

export class SendEmailWhenProductIsCreatedHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    console.log(`sending email to ${event.eventData.email}`)
  }
}
