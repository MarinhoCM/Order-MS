import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProductRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(product: any) {
        return await this.prisma.product.create({
            data: product
        })
    }

    async update(id: number, product: any) {
        return await this.prisma.product.update({
            where: {
                id
            },
            data: product
        })
    }

    async getCustomerById(id: number) {
        return await this.prisma.product.findFirst({
            where: {
                id
            }
        })
    }

    async getCustomerByName(name: string) {
        return await this.prisma.product.findFirst({
            where: {
                description: {
                    contains: name
                }
            }
        })
    }

    async getCustomerByCode(code: string) {
        return await this.prisma.product.findFirst({
            where: {
                code
            }
        })
    }

}