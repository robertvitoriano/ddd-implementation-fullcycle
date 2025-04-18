import { EventHandlerInterface } from "../../../@shared/event/event-handler.interface"
import { EventInterface } from "../../../@shared/event/event.interface"

export class EnviaConsoleLogHandler implements EventHandlerInterface {
  handle(event: EventInterface): void {
    const { customerName, newAddress, customerId } = event.eventData
    console.log(`Endereço do cliente: ${customerId}, ${customerName} alterado para: ${newAddress}`)
  }
}
