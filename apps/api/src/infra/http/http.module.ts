import { Module } from "@nestjs/common";
import { CustomerModule } from "./customer/customer.module";
import { OrderModule } from "./order/order.module";
import { ProductModule } from "./product/product.module";
import { StockModule } from "./stock/stock.module";
import { StoreModule } from "./store/store.module";

@Module({
    imports: [
        CustomerModule,
        OrderModule,
        ProductModule,
        StockModule,
        StoreModule
    ]
})
export class HttpModule { }
