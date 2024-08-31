import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { Err, Ok, Result } from "rust-option";
import { PrismaService } from "src/common/database/database.service";
import { FetchEventsModel } from "src/common/model/event/fetch-events-model";

@Injectable()
export class FetchEventsService {
    constructor(private readonly database: PrismaService) {}

    async fetch_events(
        user_id: string,
    ): Promise<Result<FetchEventsModel[], string>> {
        try {
            const events = await this.database.event.findMany();
            const user = await this.database.user.findUnique({
                where: { id: user_id },
                include: {
                    events: true
                }
            });

            console.log('passa o findUnique');  
            if (!user) {
                return Err('User not found');
            }

            user.events.forEach(event => {
                events.forEach(e => {
                    if (e.event_id === event.event_id) {
                        e.isRegistered = true;
                    }
                });
            });

            const formattedEvents = events.map(event => {
                const formattedDate = DateTime.fromJSDate(event.date)
                    .toFormat('dd-MM-yyyy HH:mm');

                return {
                    ...event,
                    date: formattedDate
                };
            });

            return Ok(formattedEvents);
        } catch (error) {
            console.log(error);
            return Err('Failed to fetch events');
        }
    }
}
