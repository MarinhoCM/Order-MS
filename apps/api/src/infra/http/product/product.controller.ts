import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateProductDto, QuerySearchProductDto, UpdateProductDto } from "./dto/product.dto";
import { ProductService } from "./product.service";

@Controller('product/v1')
export class ProductController {
    constructor(
        private readonly service: ProductService
    ) { }

    @Post()
    async createProduct(@Body() product: CreateProductDto) {
        return await this.service.create(product)
    }

    @Get()
    async getProduct(@Query() params: QuerySearchProductDto) {
        return await this.service.search(params)
    }

    @Patch(':code')
    async editProduct(@Param('code') code: string, @Body() data: UpdateProductDto) {
        return await this.service.editProduct(code, data)
    }

    @Delete(':code')
    async removeProduct(@Param('code') code: string) {
        return await this.service.deactivate(code)
    }
}
