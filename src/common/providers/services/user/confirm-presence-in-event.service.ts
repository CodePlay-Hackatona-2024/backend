import { Injectable } from "@nestjs/common";
import { Result, Ok, Err } from "rust-option";
import { PrismaService } from "src/common/database/database.service";


@Injectable()
export class ConfirmPresenceInEventService {
    constructor(private readonly database: PrismaService) {}

    async confirm_presence_in_event(
        user_id: string,
        event_id: string,
        confirmation_code: string
    ): Promise<Result<string, string>> {

        const event = await this.database.event.findUnique({
            where: { event_id }
        });

        const user = await this.database.user.findUnique({
            where: { id: user_id },
            include: {
                events: true
            }
        });

        if (!event) {
            return Err('Evento não encontrado');
        }

        if (!user) {
            return Err('Usuário não encontrado');
        }

        if (event.confirmation_code !== confirmation_code) {
            return Err('Código de confirmação inválido');
        }

        try {
            await this.database.user.update({
                where: { id: user_id },
                data: {
                    balance: user.balance + event.reward
                }
            });

            return Ok('Presença confirmada com sucesso');
        } catch (error) {
            return Err('Falha ao confirmar presença');
        }
        
    }
}