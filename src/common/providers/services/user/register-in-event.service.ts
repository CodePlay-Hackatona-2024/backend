import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';

@Injectable()
export class RegisterInEventService {
  constructor(private readonly database: PrismaService) {}

  async register_in_event(
    user_id: string,
    event_id: string,
  ): Promise<Result<string, string>> {
    const existing_user = await this.database.user.findUnique({
        where: { id: user_id },
    });
    if (!existing_user) {
      return Err('Usuário não encontrado');
    }

    const existing_event = await this.database.event.findUnique({
        where: { event_id },
    });
    if (!existing_event) {
      return Err('Evento não encontrado');
    }

    const updated_event = await this.database.event.update({
        where: { event_id: event_id },
        data: {
            participants: {
                connect: { id: user_id },
            },
        },
    });

    const updated_user = await this.database.user.update({
        where: { id: user_id },
        data: {
            events: {
                connect: { event_id: event_id },
            },
        },
    });


    return Ok('Usuário registrado no evento');
  }
}
