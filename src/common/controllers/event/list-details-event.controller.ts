import {  Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ListDetailsEventService } from 'src/common/providers/services/event/list-details-event.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.EVENT.route)
@ApiTags(API_TAGS_CONTROLLER.EVENT.name)
export class ListDetailsEventController {

    constructor(private readonly service: ListDetailsEventService) {}

    @Get("/details/:id")
    @ApiOperation({
        summary: 'Buscar detalhes do item',
        description: 'Este endpoint permite a busca de detalhes de um item.',
    })
    @ApiResponse({
        status: 200,
        description: 'Detalhes do item encontrados',
        schema: {
            type: 'object',
            properties: {
                item_id: {
                    type: 'string',
                    example: 'clzh3p8hk00009e8rzhxvtube',
                },
                name: {
                    type: 'string',
                    example: 'Cupom',
                },
                description: {
                    type: 'string',
                    example: 'Cupom de desconto',
                },
                value: {
                    type: 'number',
                    example: 50.00,
                },
                partner: {
                    type: 'object',
                    properties: {
                        partner_id: {
                            type: 'string',
                            example: 'clzh3p8hk00009e8rzhxvtube',
                        },
                        name: {
                            type: 'string',
                            example: 'Parceiro',
                        },
                    },
                },
            },
        },
    })
    @ApiResponse({
        status: 404,
        description: 'Detalhes do item não encontrados',
        schema: {
            default: [
                'Nenhum item encontrado',
            ],
        },
    })
    async list_details_event(
        @Param('id') id: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.list_details_event(id);
        if (result.isErr()) {
            res.status(404);
            return { message: result.unwrapErr() };
        }
        return { item: result.unwrap() };
    }
}