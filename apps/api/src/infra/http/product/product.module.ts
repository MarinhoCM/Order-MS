import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../database/database.module";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";

@Module({
    imports: [DatabaseModule],
    providers: [ProductService],
    exports: [ProductService],
    controllers: [ProductController]
})
export class ProductModule { }