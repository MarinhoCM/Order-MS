import { Controller, Delete, Get, Patch, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

@Controller('product/v1')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) { }

    @Post()
    async createProduct() { }

    @Get()
    async getProduct() { }

    @Patch()
    async editProduct() { }

    @Delete()
    async removeProduct() { }
}
