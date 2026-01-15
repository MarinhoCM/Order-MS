import { OrderCreateDto, PatchOrderParamsDto } from "@api/infra/http/order/dto/order.dto";
import { Prisma } from "@prisma/client";
import { IOrder } from "../interfaces";

export class OrderMapper {
    public static toPrismaOrderMapper(data: OrderCreateDto): [IOrder, Prisma.OrderItemCreateManyInput[]] {

        const orderModel = {
            customer: data.customer,
            value: data.value,
            status: data.status
        } as IOrder

        const orderItemModel = data.items.map(item => {
            return {
                ammount: item.ammount,
                productId: item.product,
                value: item.value
            }
        }) as Prisma.OrderItemCreateManyInput[]

        return [orderModel, orderItemModel]
    }

    public static toPrismaUpdateOrderMapper(id: number, data: PatchOrderParamsDto): Prisma.OrderUpdateInput {
        const { items, status, value } = data
        return {
            ...(value !== undefined && { value }),

            ...(status !== undefined && {
                status: {
                    connect: { id: status }
                }
            }),
            ...(items?.length && {
                items: {
                    deleteMany: {
                        orderId: id
                    },
                    createMany: {
                        data: items.map(item => {
                            return {
                                ammount: item.ammount,
                                productId: item.product,
                                value: item.value
                            }
                        })
                    }
                }
            })
        }
    }
}