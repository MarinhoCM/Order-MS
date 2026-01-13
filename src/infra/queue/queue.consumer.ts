import type { IOrderEvent } from '@common/interfaces';
import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { OrderService } from '../http/order/order.service';

@Controller()
export class QueueConsumer {
    private readonly logger = new Logger(QueueConsumer.name)

    constructor(
        private readonly orderService: OrderService
    ) { }

    @EventPattern('order.created')
    async handleMessage(@Payload() data: IOrderEvent) {
        this.logger.log('Mensagem recebida:', data);
        await this.orderService.save(data)
    }
}
