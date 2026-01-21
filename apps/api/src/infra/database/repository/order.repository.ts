import { IOrder, IOrderItem, IStockMovement, StockMovementTypeEnum } from "@api/common/interfaces";
import { PrismaService } from "@api/infra/database/prisma/prisma.service";
import { OrderStatusEnum } from "@api/common/enums/order.enum";
import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { Prisma } from "@prisma/client";


@Injectable()
export class OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async save(orderData: IOrder, itemsData: IOrderItem[]) {
        const orderStore = orderData.store
        const productIds = itemsData.map(item => item.productId)

        return this.prisma.$transaction(async (tx) => {
            const stock = await tx.stock.findMany({
                where: {
                    productId: {
                        in: productIds
                    },
                    storeId: orderStore
                }
            })

            if (stock.length !== itemsData.length) {
                throw new UnprocessableEntityException(
                    `No stock was found for the products at the branch ${orderStore}.`
                )
            }

            const stockMap = new Map(stock.map(s => [s.productId, s]))
            const stockReservationsModel: IStockMovement[] = []
            for (const item of itemsData) {
                const productStock = stockMap.get(item.productId)

                if (!productStock) {
                    throw new UnprocessableEntityException(
                        `No stock was found for the product ${item.productId}.`
                    )
                }

                if (productStock.ammount < item.ammount) {
                    throw new UnprocessableEntityException(
                        `Insufficient stock for the products: ${item.productId}`
                    )
                }

                const stockMovementModel: IStockMovement = {
                    previousQty: productStock.ammount,
                    quantity: item?.ammount,
                    newQty: (productStock.ammount - item?.ammount),
                    productId: productStock.productId,
                    orderId: 0,
                    reason: 'MOVIMENTAÇÃO PARA PEDIDO DE VENDA',
                    storeId: orderStore,
                    type: StockMovementTypeEnum.VENDA
                }
                stockReservationsModel.push(stockMovementModel)
            }

            const order = await tx.order.create({
                data: {
                    customerId: orderData.customer,
                    orderStatusId: orderData.status,
                    storeId: orderData.store,
                    value: orderData.value,
                    items: { createMany: { data: itemsData } }
                },
                include: { items: true }
            })

            const stockMovementsWithOrder = stockReservationsModel.map(item => ({
                ...item,
                orderId: order.id
            }))

            await Promise.all(
                stockMovementsWithOrder.map(item =>
                    tx.stock.update({
                        where: {
                            storeId_productId: {
                                productId: item.productId,
                                storeId: item.storeId
                            }
                        },
                        data: {
                            ammount: {
                                decrement: item.quantity
                            }
                        }
                    })
                )
            )

            await tx.stockMovement.createMany({
                data: stockMovementsWithOrder
            })
        })
    }

    async cancelOrder(orderId: number) {
        return await this.prisma.$transaction(async (tx) => {
            const stockMovement = await tx.stockMovement.findMany({
                where: {
                    orderId: orderId
                }
            })

            if (!stockMovement) {
                throw new UnprocessableEntityException(
                    `No stock movement could be identified for the order.`
                )
            }

            await Promise.all(
                stockMovement.map(item =>
                    Promise.all([
                        tx.stock.update({
                            where: {
                                storeId_productId: {
                                    productId: item.productId,
                                    storeId: item.storeId
                                }
                            },
                            data: {
                                ammount: item.previousQty
                            }
                        }),

                        tx.stockMovement.update({
                            where: {
                                storeId_productId_orderId: {
                                    storeId: item.storeId,
                                    productId: item.productId,
                                    orderId: item.orderId
                                }
                            },
                            data: {
                                newQty: item.previousQty,
                                previousQty: item.newQty
                            }
                        })
                    ])
                )
            )

            return await tx.order.update({
                where: {
                    id: orderId
                },
                data: {
                    orderStatusId: OrderStatusEnum.CANCELED
                },
                include: {
                    status: true
                }
            })
        })
    }

    async getOrderById(id: number) {
        return await this.prisma.order.findFirst({
            where: {
                id
            }
        })
    }

    async getOrdersByCustomerCode(customerCode: number, skip: number, take: number) {
        return await this.prisma.order.findMany({
            where: { customerId: customerCode },
            skip,
            take
        })
    }

    async getOrdersByDates(initialDate: string, finalDate: string, skip: number, take: number) {
        return await this.prisma.order.findMany({
            where: {
                AND: {
                    createdAt: {
                        gte: new Date(initialDate),
                        lte: new Date(finalDate)
                    },
                }
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take
        })
    }

    async getAll(skip: number, take: number) {
        return await this.prisma.order.findMany({
            skip,
            take
        })
    }

    async updateOrder(id: number, data: Prisma.OrderUpdateInput) {
        return await this.prisma.order.update({
            where: { id },
            data
        })
    }
}