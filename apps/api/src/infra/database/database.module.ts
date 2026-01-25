import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CustomerRepository, OrderRepository, StockMovementRepository, StockRepository } from "./repository";
import { ProductRepository } from "./repository/product.repository";

@Module({
    providers: [
        PrismaService,
        CustomerRepository,
        ProductRepository,
        OrderRepository,
        StockMovementRepository,
        StockRepository
    ],
    exports: [
        PrismaService,
        CustomerRepository,
        ProductRepository,
        OrderRepository,
        StockMovementRepository,
        StockRepository
    ]
})
export class DatabaseModule { }
