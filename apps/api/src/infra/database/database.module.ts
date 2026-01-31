import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { CustomerRepository, OrderRepository, StockMovementRepository, StockRepository } from "./repository";
import { ProductRepository } from "./repository/product.repository";
import { StoreRepository } from "./repository/store.repository";

@Module({
    providers: [
        PrismaService,
        CustomerRepository,
        ProductRepository,
        OrderRepository,
        StockMovementRepository,
        StockRepository,
        StoreRepository
    ],
    exports: [
        PrismaService,
        CustomerRepository,
        ProductRepository,
        OrderRepository,
        StockMovementRepository,
        StockRepository,
        StoreRepository
    ]
})
export class DatabaseModule { }
