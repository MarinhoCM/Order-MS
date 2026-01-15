import { Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { GetOrderParamsQueryDto, OrderCreateDto, PatchOrderParamsDto } from "./dto/order.dto";
import { OrderService } from "./order.service";

@Controller('order/v1')
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) { }

    @Post('create')
    async CreateOrder(@Body() data: OrderCreateDto) {
        return await this.orderService.save(data)
    }

    @Get('')
    async GetOrder(@Query() params: GetOrderParamsQueryDto) {
        return await this.orderService.searchOrder(params)
    }

    @Patch('edit/:id')
    async editOrder(@Body() data: PatchOrderParamsDto, @Param('id') id: number) {
        return await this.orderService.editOrder(id, data)
    }
}