import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { StockService } from "./stock.service";

@Controller()
export class StockController {
    constructor(
        private readonly service: StockService
    ) { }

    @Post()
    async createStock() { }

    @Get()
    async getStock() { }

    @Patch()
    async editStock() { }

    @Delete()
    async removeStock() { }
}