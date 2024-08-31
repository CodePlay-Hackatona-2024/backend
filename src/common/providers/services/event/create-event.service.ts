import { Injectable } from "@nestjs/common";
import { Err, Ok, Result } from "rust-option";
import { PrismaService } from "src/common/database/database.service";
import { CreateEventModel } from "src/common/model/event/create-event-model";
import { DateTime } from 'luxon';

@Injectable()
export class CreateEventService {
    constructor(private readonly database: PrismaService) {}

    async create_event(
        data: CreateEventModel
    ): Promise<Result<string, string>> {

        const formattedDate = DateTime.fromISO(data.date);
        if (!formattedDate.isValid) {
            return Err('Invalid date format');
        }

        const createdEvent = await this.database.event.create({
            data: {
                title: data.title,
                description: data.description,
                date: formattedDate.toJSDate(),
                capacity: data.capacity,
                type: data.type,
                // organizer: {
                //     connect: {
                //         id: data.organizerId
                //     }
                // }
            }
        });
        return Ok('Evento criado com sucesso');
    }
}