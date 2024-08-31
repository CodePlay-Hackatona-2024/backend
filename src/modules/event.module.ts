import { Module } from "@nestjs/common";
import { CreateEventController } from "src/common/controllers/event/create-event.controller";
import { CreateEventService } from "src/common/providers/services/event/create-event.service";
import { PrismaModule } from "./database.module";
import { FetchEventsService } from "src/common/providers/services/event/fetch-events.service";
import { FetchEventsController } from "src/common/controllers/event/fetch-events.controller";
import { ListDetailsEventService } from "src/common/providers/services/event/list-details-event.service";
import { ListDetailsEventController } from "src/common/controllers/event/list-details-event.controller";
import { GenerateConfirmationCodeService } from "src/common/providers/services/event/generate-confirmation-code.service";
import { GenerateConfirmationCodeController } from "src/common/controllers/event/generate-confirmation-code.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreateEventService, FetchEventsService, ListDetailsEventService, GenerateConfirmationCodeService],
    controllers: [CreateEventController, FetchEventsController, ListDetailsEventController, GenerateConfirmationCodeController]  
})

export class EventModule {}