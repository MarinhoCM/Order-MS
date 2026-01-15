import { PrismaService } from "@api/infra/database/prisma/prisma.service";
import { IOrder } from "@api/common/interfaces";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async save(orderData: IOrder, itemsData: Prisma.OrderItemCreateManyInput[]) {
        return this.prisma.order.create({
            data: {
                customerId: orderData.customer,
                orderStatusId: orderData.status,
                value: orderData.value,

                items: {
                    createMany: {
                        data: itemsData
                    }
                }
            },
            include: {
                items: true
            }
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
            where: {
                customerId: customerCode
            },
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
            orderBy: {
                createdAt: 'desc'
            },
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