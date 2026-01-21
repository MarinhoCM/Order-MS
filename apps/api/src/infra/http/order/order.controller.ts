import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { GetOrderParamsQueryDto, OrderCreateDto, PatchOrderParamsDto } from "./dto/order.dto";
import { OrderService } from "./order.service";

@Controller('order/v1')
export class OrderController {
    constructor(
        private readonly service: OrderService
    ) { }

    @Post('create')
    async createOrder(@Body() data: OrderCreateDto) {
        return await this.service.save(data)
    }

    @Get('')
    async getOrder(@Query() params: GetOrderParamsQueryDto) {
        return await this.service.searchOrder(params)
    }

    @Patch('edit/:id')
    async editOrder(@Body() data: PatchOrderParamsDto, @Param('id') id: number) {
        return await this.service.editOrder(id, data)
    }

    @Delete('cancel/:id')
    async cancelOrder(@Param('id') id: number) {
        return await this.service.cancelOrder(id)
    }
}