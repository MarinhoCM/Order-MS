import { IOrderEvent } from "@common/interfaces";
import { Injectable } from "@nestjs/common";
import { OrderRepository } from "src/infra/database/repository/order.repository";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async save(data: IOrderEvent) {
        const total = data.itens.reduce((acc, item) => acc + (item.preco * item.quantidade), 0)
        const order = {
            ...data,
            total
        }

        return await this.orderRepository.save(order, order.itens)
    }
}