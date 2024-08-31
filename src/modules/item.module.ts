import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { FetchItemsService } from "src/common/providers/services/item/fetch-items.service";
import { FetchItemsController } from "src/common/controllers/item/fetch-items.controller";

@Module({
    imports: [PrismaModule],
    providers: [FetchItemsService],
    controllers: [FetchItemsController]
})

export class ItemModule {}