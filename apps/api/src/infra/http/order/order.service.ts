import { OrderMapper, ResponseMapper } from "@api/common/mappers";
import { OrderRepository } from "@api/infra/database/repository/order.repository";
import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { GetOrderParamsQueryDto, OrderCreateDto, PatchOrderParamsDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository
    ) { }

    async save(data: OrderCreateDto) {
        const [order, items] = OrderMapper.toPrismaOrderMapper(data)
        return await this.orderRepository.save(order, items)
    }

    async searchOrder(params: GetOrderParamsQueryDto) {
        let data: any;
        const page = Math.max(1, Number(params.page) || 1)
        const limit = Math.max(1, Number(params.limit) || 10)
        const [skip, take] = [((page - 1) * limit), limit]

        if (params?.id) {
            data = await this.orderRepository.getOrderById(params.id)
        } else if (params?.customerCode) {
            data = await this.orderRepository.getOrdersByCustomerCode(params.customerCode, skip, take)
        } else if (params?.initialDate && params?.finalDate) {
            data = await this.orderRepository.getOrdersByDates(params?.initialDate, params?.finalDate, skip, take)
        } else {
            data = await this.orderRepository.getAll(skip, take)
        }

        return ResponseMapper.toResult(data, HttpStatus.CREATED, 'The order was created successfully.')
    }

    async editOrder(id: number, data: PatchOrderParamsDto) {
        if (!id) throw new BadRequestException('You need to provide the orderId to perform the update.')
        const orderModel = OrderMapper.toPrismaUpdateOrderMapper(id, data)
        const resultData = await this.orderRepository.updateOrder(id, orderModel)
        return ResponseMapper.toResult(resultData, HttpStatus.OK, 'The order was successfully edited.')
    }

    async cancelOrder(orderId: number) {
        if (!orderId) throw new BadRequestException('You need to provide the orderId to perform the cancellation.')
        const resultData = await this.orderRepository.cancelOrder(orderId)
        return ResponseMapper.toResult(resultData, HttpStatus.OK, 'The order was successfully cancelled.')
    }
}