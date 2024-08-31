import { Module } from "@nestjs/common";
import { CreateEventController } from "src/common/controllers/event/create-event.controller";
import { CreateEventService } from "src/common/providers/services/event/create-event.service";
import { PrismaModule } from "./database.module";
import { FetchEventsService } from "src/common/providers/services/event/fetch-events.service";
import { FetchEventsController } from "src/common/controllers/event/fetch-events.controller";
import { ListDetailsEventService } from "src/common/providers/services/event/list-details-event.service";
import { ListDetailsEventController } from "src/common/controllers/event/list-details-event.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreateEventService, FetchEventsService, ListDetailsEventService],
    controllers: [CreateEventController, FetchEventsController, ListDetailsEventController]  
})

export class EventModule {}