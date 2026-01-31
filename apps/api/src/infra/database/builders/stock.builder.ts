import { Prisma } from "@prisma/client";

export class StockSearchBuilder {
    private where: Prisma.StockWhereInput = {}

    withAmmount(ammount: number) {
        if (!ammount) return this
        this.where.ammount = ammount;
        return this
    }

    withProduct(productId: number) {
        if (!productId) return this
        this.where.productId = productId;
        return this
    }

    withStore(storeId: number) {
        if (!storeId) return this
        this.where.storeId = storeId
        return this
    }

    build(): Prisma.StockWhereInput {
        return this.where;
    }
}