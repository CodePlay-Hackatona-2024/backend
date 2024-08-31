import { Module } from "@nestjs/common";
import { CreateEventController } from "src/common/controllers/event/create-event.controller";
import { CreateEventService } from "src/common/providers/services/event/create-event.service";
import { PrismaModule } from "./database.module";
import { FetchEventsService } from "src/common/providers/services/event/fetch-events.service";
import { FetchEventsController } from "src/common/controllers/event/fetch-events.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreateEventService, FetchEventsService],
    controllers: [CreateEventController, FetchEventsController]  
})

export class EventModule {}