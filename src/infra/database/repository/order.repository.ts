import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { IOrder, IOrderItemEvent } from "@common/interfaces";

@Injectable()
export class OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async save(orderData: IOrder, itemsData: IOrderItemEvent[]) {
        return await this.prisma.order.create({
            data: {
                codigoPedido: orderData.codigoPedido,
                codigoCliente: orderData.codigoCliente,
                total: orderData.total,
                itens: {
                    createMany: {
                        data: itemsData
                    }
                }
            },
            include: {
                itens: true
            }
        })
    }
}