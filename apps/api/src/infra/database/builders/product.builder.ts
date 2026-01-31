import { QuerySearchProductBySkuInfos } from "@api/infra/http/product/dto/product.dto";
import { Prisma } from '@prisma/client';

export class ProductSearchBuilder {
    private where: Prisma.ProductWhereInput = {};

    withCode(code?: string) {
        if (code) {
            this.where.code = { contains: code };
        }
        return this;
    }

    withDescription(description?: string) {
        if (description) {
            this.where.description = { contains: description };
        }
        return this;
    }

    withPrice(price?: number) {
        if (!price) return this;

        this.where.OR = [
            ...(this.where.OR ?? []),
            { netValue: { equals: price } },
            { grossValue: { equals: price } },
        ];

        return this;
    }


    withSkuInfos(sku?: QuerySearchProductBySkuInfos) {
        if (!sku) return this;

        const skuWhere = {
            ...(sku.ean && { ean: sku.ean }),
            ...(sku.color && { color: sku.color }),
            ...(sku.weight && { weight: sku.weight }),
            ...(sku.length && { length: sku.length }),
            ...(sku.height && { height: sku.height }),
            ...(sku.width && { width: sku.width }),
        };

        if (Object.keys(skuWhere).length > 0) this.where.sku = skuWhere;

        return this;
    }

    build(): Prisma.ProductWhereInput {
        return this.where;
    }
}
