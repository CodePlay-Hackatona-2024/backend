import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';
import { ListDetailsEventModel } from 'src/common/model/event/list-details-event-model';
import { DateTime } from 'luxon';

@Injectable()
export class ListDetailsEventService {
  constructor(private readonly database: PrismaService) {}

  async list_details_event(event_id: string): Promise<Result<ListDetailsEventModel, string>> {
    const event = await this.database.event.findUnique({
        where: { event_id },
    })

    if (!event) {
      return Err('Evento não encontrado');
    }

    const formattedDate = DateTime.fromJSDate(event.date)
    .toFormat('dd-MM-yyyy HH:mm');

    const formattedEvent = { ...event, date: formattedDate }

    return Ok(formattedEvent);
  }
}