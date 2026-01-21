import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { StoreService } from "./store.service";

@Controller('store/v1')
export class StoreController {
    constructor(
        private readonly service: StoreService
    ) { }

    @Post()
    async createStore() { }

    @Get()
    async getStore() { }

    @Patch()
    async editStore() { }

    @Delete()
    async removeStore() { }
}