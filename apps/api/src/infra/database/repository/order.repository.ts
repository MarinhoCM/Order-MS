import { PrismaService } from "@api/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";


@Injectable()
export class OrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async save(orderData: any, itemsData: any[]) {
        return
    }
}