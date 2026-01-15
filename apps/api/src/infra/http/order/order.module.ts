import { DatabaseModule } from "@api/infra/database/database.module";
import { Module } from "@nestjs/common";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
    imports: [DatabaseModule],
    controllers: [OrderController],
    providers: [OrderService],
    exports: [OrderService]
})
export class OrderModule { }