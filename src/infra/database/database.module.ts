import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { OrderRepository } from "./repository/order.repository";

@Module({
    providers: [
        PrismaService,
        OrderRepository
    ],
    exports: [
        PrismaService,
        OrderRepository
    ]
})
export class DatabaseModule { }