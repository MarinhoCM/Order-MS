import { CreateStockDto } from "@api/src/infra/http/stock/dto/stock.dto";
import { Prisma } from "@prisma/client";

export class StockMapper {
    static toPrisma(data: CreateStockDto): Prisma.StockCreateInput {
        return {
            ammount: data.ammount,
            product: {
                connect: {
                    id: data.product
                }
            },
            store: {
                connect: {
                    id: data.store
                }
            }
        }
    }
}