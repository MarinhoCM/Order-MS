import { IStockMovement } from "@api/common/interfaces";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StockRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: Prisma.StockCreateInput) {
        return await this.prisma.stock.create({
            data
        })
    }

    async update(storeId: number, productId: number, data: Prisma.StockUpdateInput) {
        return await this.prisma.stock.update({
            where: {
                storeId_productId: {
                    storeId,
                    productId
                }
            },
            data: {
                ammount: data.ammount
            }
        })
    }

    async getStockByProductAndStore(productId: number, storeId: number) {
        return await this.prisma.stock.findMany({
            where: {
                productId,
                storeId
            }
        })
    }

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

    async search(where: Prisma.StockWhereInput, skip: number, take: number) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.stock.findMany({ where, skip, take }),
            this.prisma.stock.count()
        ])

        return {
            data,
            total,
            pageSize: take
        }
    }
}
