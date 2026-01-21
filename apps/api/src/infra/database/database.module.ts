import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { OrderRepository } from "./repository/order.repository";
import { StockMovementRepository, StockRepository } from "./repository";

@Module({
    providers: [
        PrismaService,
        OrderRepository,
        StockRepository,
        StockMovementRepository
    ],
    exports: [
        PrismaService,
        OrderRepository,
        StockRepository,
        StockMovementRepository
    ]
})
export class DatabaseModule { }
