import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IStockMovement } from "@api/common/interfaces";

@Injectable()
export class StockRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async getStockAmmountByProductsAndStore(products: number[], storeId: number) {
        return await this.prisma.stock.findMany({
            where: {
                productId: {
                    in: products
                },
                storeId
            }
        })
    }

    async getStockAmmountByProducts(products: number[]) {
        return await this.prisma.stock.findMany({
            where: {
                productId: {
                    in: products
                }
            }
        })
    }

    async updateStockByReservations(reservations: IStockMovement[]) {
        const updations: any[] = []
        for await (let item of reservations) {
            const update = await this.prisma.stock.update({
                where: {
                    storeId_productId: {
                        productId: item.productId,
                        storeId: item.storeId
                    }
                },
                data: {
                    ammount: item.newQty
                }
            })

            updations.push(update)
        }
    }
}
