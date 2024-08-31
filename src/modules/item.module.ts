import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { FetchItemsService } from "src/common/providers/services/item/fetch-items.service";
import { FetchItemsController } from "src/common/controllers/item/fetch-items.controller";
import { CreateItemService } from "src/common/providers/services/item/create-item.service";
import { CreateItemController } from "src/common/controllers/item/create-item.controller";

@Module({
    imports: [PrismaModule],
    providers: [FetchItemsService, CreateItemService],
    controllers: [FetchItemsController, CreateItemController]
})

export class ItemModule {}