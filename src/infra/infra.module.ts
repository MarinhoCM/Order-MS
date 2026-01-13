import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { HttpModule } from "./http/http.module";
import { QueueModule } from "./queue/queue.module";

@Module({
    imports: [
        DatabaseModule,
        HttpModule,
        QueueModule
    ]
})
export class InfraModule { }