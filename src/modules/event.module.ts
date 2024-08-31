import { Module } from "@nestjs/common";
import { CreateEventController } from "src/common/controllers/event/create-event.controller";
import { CreateEventService } from "src/common/providers/services/event/create-event.service";
import { PrismaModule } from "./database.module";

@Module({
    imports: [PrismaModule],
    providers: [CreateEventService],
    controllers: [CreateEventController]  
})

export class EventModule {}