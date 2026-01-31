import { StockMapper } from "@api/common/mappers";
import { Injectable, NotFoundException } from "@nestjs/common";
import { StockSearchBuilder } from "../../database/builders";
import { StockRepository } from "../../database/repository";
import { CreateStockDto, QueryGetStockDto, UpdateStockDto } from "./dto/stock.dto";

@Injectable()
export class StockService {
    constructor(
        private readonly stock: StockRepository
    ) { }

    async create(data: CreateStockDto) {
        const model = StockMapper.toPrisma(data)
        return await this.stock.create(model)
    }

    async search(params: QueryGetStockDto) {
        const query = new StockSearchBuilder()
            .withAmmount(params.ammount)
            .withProduct(params.product)
            .withStore(params.store)
            .build()

        const skip = (params.page - 1) * params.limit
        return await this.stock.search(query, skip, params.limit)
    }

    async updateStock(product: number, store: number, data: Pick<UpdateStockDto, "ammount">) {
        const stock = await this.stock.getStockByProductAndStore(product, store)
        if (!stock) throw new NotFoundException(`The product ${product} has no found on store ${store}`)

        return await this.stock.update(product, store, data)
    }
}   