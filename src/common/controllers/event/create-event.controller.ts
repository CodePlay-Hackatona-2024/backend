import { Body, Controller, Post, Res } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { CreateEventModel } from "src/common/model/event/create-event-model";
import { CreateEventService } from "src/common/providers/services/event/create-event.service";
import { API_TAGS_CONTROLLER } from "src/common/utils/enums/api-tags";

@Controller(API_TAGS_CONTROLLER.EVENT.route)
@ApiTags(API_TAGS_CONTROLLER.EVENT.name)
export class CreateEventController {
    constructor(private readonly service: CreateEventService) {}

    @Post()
    @ApiOperation({
        summary: 'Criar novo evento',
        description: 'Este endpoint permite a criação de um novo evento.',
    })
    @ApiResponse({
        status: 201,
        description: 'Evento criado com sucesso',
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    example: 'clzh3p8hk00009e8rzhxvtube',
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Erro na criação do evento',
        schema: {
            default: [
                'É obrigatório preencher todos os campos.',
                'O organizador informado não existe.',
            ],
        },
    })
    async create_event(
        @Body() body: CreateEventModel,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.create_event(body);
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { id: result.unwrap() };
    }
}