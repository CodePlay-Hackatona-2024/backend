import {  Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateItemModel } from 'src/common/model/item/create-item-model';
import { CreateItemService } from 'src/common/providers/services/item/create-item.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.ITEM.route)
@ApiTags(API_TAGS_CONTROLLER.ITEM.name)
export class CreateItemController {
    constructor(private readonly service: CreateItemService) {} 

    @Post()
    @ApiOperation({
        summary: 'Cadastrar item',
        description: 'Este endpoint permite o cadastro de um novo item.',
    })
    @ApiResponse({
        status: 201,
        description: 'Item cadastrado com sucesso',
        schema: {
            type: 'object',
            properties: {
                item_id: {
                    type: 'string',
                    example: 'clzh3p8hk00009e8rzhxvtube',
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Erro no cadastro do item',
        schema: {
            default: [
                'É obrigatório preencher todos os campos.',
                'O item informado já está cadastrado.',
            ],
        },
    })
    async create_item(
        @Body() body: CreateItemModel,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.create_item(body);
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { item_id: result.unwrap() };
    }
    
}