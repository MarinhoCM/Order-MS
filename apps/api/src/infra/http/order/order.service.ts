import { OrderMapper, ResponseMapper } from "@api/common/mappers";
import { OrderRepository } from "@api/infra/database/repository/order.repository";
import { BadRequestException, HttpStatus, Injectable } from "@nestjs/common";
import { GetOrderParamsQueryDto, OrderCreateDto, PatchOrderParamsDto } from "./dto/order.dto";

@Injectable()
export class OrderService {
    constructor(
        private readonly repository: OrderRepository
    ) { }

    async save(data: OrderCreateDto) {
        const [order, items] = OrderMapper.toPrismaOrderMapper(data)
        return await this.repository.save(order, items)
    }

    async searchOrder(params: GetOrderParamsQueryDto) {
        let data: any;
        const page = Math.max(1, Number(params.page) || 1)
        const limit = Math.max(1, Number(params.limit) || 10)
        const [skip, take] = [((page - 1) * limit), limit]

        if (params?.id) {
            data = await this.repository.getOrderById(params.id)
        } else if (params?.customerCode) {
            data = await this.repository.getOrdersByCustomerCode(params.customerCode)
        } else if (params?.initialDate && params?.finalDate) {
            data = await this.repository.getOrdersByDates(params?.initialDate, params?.finalDate, skip, take)
        } else {
            data = await this.repository.getAll(skip, take)
        }

        return ResponseMapper.toResult(data, HttpStatus.OK, '')
    }

    async editOrder(id: number, data: PatchOrderParamsDto) {
        if (!id) throw new BadRequestException('You need to provide the orderId to perform the update.')
        const orderModel = OrderMapper.toPrismaUpdateOrderMapper(id, data)
        const resultData = await this.repository.updateOrder(id, orderModel)
        return ResponseMapper.toResult(resultData, HttpStatus.OK, 'The order was successfully edited.')
    }

    async cancelOrder(orderId: number) {
        if (!orderId) throw new BadRequestException('You need to provide the orderId to perform the cancellation.')
        const resultData = await this.repository.cancelOrder(orderId)
        return ResponseMapper.toResult(resultData, HttpStatus.OK, 'The order was successfully cancelled.')
    }
}