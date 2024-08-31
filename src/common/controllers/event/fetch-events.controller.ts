import { Body, Controller, Get, Param, Res } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { FetchEventsService } from "src/common/providers/services/event/fetch-events.service";
import { API_TAGS_CONTROLLER } from "src/common/utils/enums/api-tags";

@Controller(API_TAGS_CONTROLLER.EVENT.route)
@ApiTags(API_TAGS_CONTROLLER.EVENT.name)
export class FetchEventsController {
    constructor(private readonly service: FetchEventsService) {}

    @Get("/:id")
    @ApiOperation({
        summary: 'Buscar eventos',
        description: 'Este endpoint permite a busca de eventos.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do usuário',
        required: true,
        schema: {
            type: 'string',
            example: 'clzh3p8hk00009e8rzhxvtube',
        },
    })
    @ApiResponse({
        status: 200,
        description: 'Eventos encontrados',
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
        status: 404,
        description: 'Eventos não encontrados',
        schema: {
            default: [
                'Nenhum evento encontrado',
            ],
        },
    })
    async fetch_events(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.fetch_events(id);
        if (result.isErr()) {
            res.status(404);
            return { message: result.unwrapErr() };
        }
        return { events: result.unwrap() };
    }
}