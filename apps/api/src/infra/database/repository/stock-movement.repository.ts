import { IStockMovement } from "@api/common/interfaces/stockMovement.interface";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StockMovementRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async reservation(stockReservation: IStockMovement[]) {
        return await this.prisma.stockMovement.createMany({
            data: stockReservation
        })
    }
}