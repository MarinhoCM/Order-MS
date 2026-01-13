import { ORDER_QUEUE_RABBITMQ, ORDER_SERVICE_RABBITMQ } from "@common/constraints";
import { queueConfig } from "@config/settings.config";
import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { QueueConsumer } from "./queue.consumer";
import { OrderModule } from "../http/order/order.module";

@Module({
    imports: [
        ClientsModule.register([{
            name: ORDER_SERVICE_RABBITMQ,
            transport: Transport.RMQ,
            options: {
                urls: [queueConfig.url],
                queue: ORDER_QUEUE_RABBITMQ,
                queueOptions: {
                    durable: false
                },
            }
        }]),
        OrderModule
    ],
    controllers: [QueueConsumer]
})
export class QueueModule { }
