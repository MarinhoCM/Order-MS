import { ProductMapper } from "@api/common/mappers";
import { ProductSearchBuilder } from "@api/infra/database/builders";
import { ProductRepository } from "@api/infra/database/repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProductDto, QuerySearchProductDto, UpdateProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {
    constructor(
        private readonly repository: ProductRepository
    ) { }

    async create(product: CreateProductDto) {
        const model = ProductMapper.toPrisma(product)
        return await this.repository.create(model)
    }

    async search(params: QuerySearchProductDto) {
        const query = new ProductSearchBuilder()
            .withCode(params.code)
            .withDescription(params.description)
            .withPrice(params.price)
            .withSkuInfos(params.skuInfos)
            .build();

        const skip = (params.page - 1) * params.limit
        return await this.repository.get(query, skip, params.limit)
    }

    async editProduct(code: string, data: UpdateProductDto) {
        const product = await this.repository.getProductByCode(code)

        if (!product) throw new NotFoundException(`The product not found.`)

        return await this.repository.update(product.id, data)
    }

    async deactivate(code: string) {
        const product = await this.repository.getProductByCode(code)

        if (!product) throw new NotFoundException(`The product not found.`)
        return await this.repository.update(product.id, { active: false })
    }
}