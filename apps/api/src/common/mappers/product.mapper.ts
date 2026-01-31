import { Prisma } from "@prisma/client";
import { IPrismaProductCreate } from "../interfaces";

export class ProductMapper {
    static toPrisma(product: IPrismaProductCreate): Prisma.ProductCreateInput {
        const { sku } = product
        return {
            ...product,
            sku: {
                create: sku
            }
        }
    }
}