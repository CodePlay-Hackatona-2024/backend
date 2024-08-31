import {  Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreatePartnerModel } from 'src/common/model/partner/create-partner-model';
import { CreatePartnerService } from 'src/common/providers/services/partner/create-partner.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.PARTNER.route)
@ApiTags(API_TAGS_CONTROLLER.PARTNER.name)
export class CreatePartnerController {
    constructor(private readonly service: CreatePartnerService) {} 

    @Post()
    @ApiOperation({
        summary: 'Cadastrar parceiro',
        description: 'Este endpoint permite o cadastro de um novo parceiro.',
    })
    @ApiResponse({
        status: 201,
        description: 'Parceiro cadastrado com sucesso',
        schema: {
            type: 'object',
            properties: {
                partner_id: {
                    type: 'string',
                    example: 'clzh3p8hk00009e8rzhxvtube',
                },
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Erro no cadastro do parceiro',
        schema: {
            default: [
                'É obrigatório preencher todos os campos.',
                'O parceiro informado já está cadastrado.',
            ],
        },
    })
    async create_item(
        @Body() body: CreatePartnerModel,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.create_partner(body);
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { partner_id: result.unwrap() };
    }
    
}