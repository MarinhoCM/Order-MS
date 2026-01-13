import { Controller, Logger } from "@nestjs/common";
import { OrderService } from "./order.service";

@Controller('orders')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    private readonly logger = new Logger(OrderController.name)



    // inserir rotas de consulta de pedidos com base no cliente
    
}