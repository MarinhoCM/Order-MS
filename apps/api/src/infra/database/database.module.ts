import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CustomerRepository, OrderRepository, StockMovementRepository, StockRepository } from "./repository";

@Module({
    providers: [
        PrismaService,
        CustomerRepository,
        OrderRepository,
        StockMovementRepository,
        StockRepository
    ],
    exports: [
        PrismaService,
        CustomerRepository,
        OrderRepository,
        StockMovementRepository,
        StockRepository
    ]
})
export class DatabaseModule { }
