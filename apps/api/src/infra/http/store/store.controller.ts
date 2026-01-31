import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateStoreDto, UpdateStoreDto } from "./dto/store.dto";
import { StoreService } from "./store.service";

@Controller('store/v1')
export class StoreController {
    constructor(
        private readonly service: StoreService
    ) { }

    @Post()
    async createStore(@Body() data: CreateStoreDto) {
        return await this.service.create(data)
    }

    @Get()
    async getStore() {
        return await this.service.search()
    }

    @Patch(':corporeCode')
    async editStore(@Param('corporeCode') corporeCode: string, @Body() data: UpdateStoreDto) {
        return await this.service.edit(corporeCode, data)
    }

    @Delete(':corporeCode')
    async removeStore(@Param('corporeCode') corporeCode: string) {
        return await this.service.deactivate(corporeCode)
    }
}