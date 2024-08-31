import { Body, Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.ITEM.route)
@ApiTags(API_TAGS_CONTROLLER.ITEM.name)
export class FetchItemsController {
    constructor(private readonly service: FetchItemsService) {}

    @Get()
    @ApiOperation({
        summary: 'Buscar itens',
        description: 'Este endpoint permite a busca de todos os itens cadastrados.',
    })
    @ApiResponse({
        status: 200,
        description: 'Itens encontrados com sucesso',
        schema: {
            type: 'object',
            properties: {
                items: {
                    type: 'array',
                    items: {
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
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Erro na busca dos itens',
        schema: {
            default: [
                'Nenhum item encontrado',
            ],
        },
    })
    async fetch_items(
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.fetch_items();
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { items: JSON.parse(result.unwrap()) };
    }
}