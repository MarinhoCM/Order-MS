import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { StockController } from "./stock.controller";
import { StockService } from "./stock.service";

@Module({
    imports: [DatabaseModule],
    providers: [StockService],
    exports: [StockService],
    controllers: [StockController]
})
export class StockModule { }