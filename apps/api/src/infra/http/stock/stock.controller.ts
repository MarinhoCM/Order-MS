import { Body, Controller, Get, Patch, Post, Query } from "@nestjs/common";
import { CreateStockDto, QueryGetStockDto, UpdateStockDto } from "./dto/stock.dto";
import { StockService } from "./stock.service";

@Controller('stock/v1')
export class StockController {
    constructor(
        private readonly service: StockService
    ) { }

    @Post()
    async createStock(@Body() data: CreateStockDto) {
        return await this.service.create(data)
    }

    @Get()
    async getStock(@Query() params: QueryGetStockDto) {
        return await this.service.search(params)
    }

    @Patch()
    async editStock(@Body() data: UpdateStockDto) {
        const { product, store } = data
        return await this.service.updateStock(product, store, data)
    }
}