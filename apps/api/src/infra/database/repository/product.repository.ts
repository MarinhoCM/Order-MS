import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(product: Prisma.ProductCreateInput) {
        return await this.prisma.product.create({
            data: product
        })
    }

    async update(id: number, product: Prisma.ProductUpdateInput) {
        return await this.prisma.product.update({
            where: {
                id
            },
            data: product
        })
    }

    async get(where: Prisma.ProductWhereInput, skip: number, take: number) {
        const [data, total] = await this.prisma.$transaction([
            this.prisma.product.findMany({ where, skip, take }),
            this.prisma.product.count({ where }),
        ]);

        return {
            data,
            total,
            pageSize: take,
        };
    }

    async getProductById(id: number) {
        return await this.prisma.product.findFirst({
            where: {
                id
            }
        })
    }

    async getProductByCode(code: string) {
        return await this.prisma.product.findFirst({
            where: {
                code
            }
        })
    }

}