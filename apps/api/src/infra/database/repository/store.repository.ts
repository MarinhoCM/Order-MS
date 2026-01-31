import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StoreRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }


    async save(data: Prisma.StoreCreateInput) {
        return await this.prisma.store.create({
            data
        })
    }

    async getByCorporeCode(corporeCode: string) {
        return await this.prisma.store.findFirst({
            where: {
                corporeCode
            }
        })
    }

    async getAll() {
        return await this.prisma.store.findMany()
    }

    async update(id: number, data: Prisma.StoreUpdateInput) {
        return await this.prisma.store.update({
            where: {
                id
            },
            data
        })
    }

}