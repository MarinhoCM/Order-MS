import { Body, Controller, Logger, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { OrderCreateDto } from "./dto/order.dto";

@Controller('order')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    private readonly logger = new Logger(OrderController.name)

    @Post()
    async CreateOrder(@Body() data: OrderCreateDto) {
        return await this.orderService.save(data)
    }
}