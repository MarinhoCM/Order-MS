import { OrderCreateDto, PatchOrderParamsDto } from "@api/infra/http/order/dto/order.dto";
import { Prisma } from "@prisma/client";
import { IOrder, IOrderItem } from "../interfaces";

export class OrderMapper {
    public static toPrismaOrderMapper(data: OrderCreateDto): [IOrder, IOrderItem[]] {

        const orderModel = {
            customer: data.customer,
            value: data.value,
            status: data.status,
            store: data.store
        } as IOrder

        const orderItemModel = data.items.map(item => {
            return {
                ammount: item.ammount,
                productId: item.product,
                value: item.value
            }
        }) as IOrderItem[]

        return [orderModel, orderItemModel]
    }

    public static toPrismaUpdateOrderMapper(id: number, data: PatchOrderParamsDto): Prisma.OrderUpdateInput {
        const { items, value } = data
        return {
            ...(value !== undefined && { value }),
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