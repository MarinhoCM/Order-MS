import { OrderRepository } from "@api/infra/database/repository/order.repository";
import { Injectable } from "@nestjs/common";
import { OrderCreateDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async save(data: OrderCreateDto) {
        return 
    }
}