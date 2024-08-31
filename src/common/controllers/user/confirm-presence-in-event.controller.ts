import { Body, Controller, Patch, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ConfirmPresenceInEventModel } from "src/common/model/user/confirm-presence-in-event-model";
import { ConfirmPresenceInEventService } from "src/common/providers/services/user/confirm-presence-in-event.service";
import { API_TAGS_CONTROLLER } from "src/common/utils/enums/api-tags";
import { Response } from 'express';



@Controller(API_TAGS_CONTROLLER.USER.route)
@ApiTags(API_TAGS_CONTROLLER.USER.name)
export class ConfirmPresenceInEventController {

    constructor(private readonly service: ConfirmPresenceInEventService) {}

    @Patch('/confirm-presence')
    @ApiOperation({
        summary: 'Confirmar presença em evento',
        description: 'Este endpoint permite a confirmação de presença em um evento.',
    })
    @ApiResponse({
        status: 200,
        description: 'Presença confirmada com sucesso',
        schema: {
            default: [
                'Presença confirmada com sucesso',
            ],
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Falha na confirmação de presença',
        schema: {
            default: [
                'Usuário não registrado no evento',
            ],
        },
    })
    async confirm_presence_in_event(
        @Body() body: ConfirmPresenceInEventModel,
        @Res({ passthrough: true }) res: Response,
    ) {
        const { event_id, user_id, confirmation_code } = body;
        const result = await this.service.confirm_presence_in_event(
            user_id,
            event_id,
            confirmation_code,
        );
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { user: result.unwrap() };
    }
}