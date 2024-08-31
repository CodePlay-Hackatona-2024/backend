import { Controller, Param, Patch, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UpdateBalanceService } from 'src/common/providers/services/user/update-balance.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.USER.route)
@ApiTags(API_TAGS_CONTROLLER.USER.name)
export class UpdateBalanceController {
    constructor(private readonly service: UpdateBalanceService) {}

    @Patch('/buy/:user_id/:item_id')
    @ApiOperation({
        summary: 'Atualizar saldo do usuário',
        description: 'Este endpoint permite a atualização do saldo de um usuário.',
    })
    @ApiResponse({
        status: 200,
        description: 'Saldo atualizado com sucesso',
        schema: {
            default: [
                'Saldo atualizado com sucesso',
            ],
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Saldo não atualizado',
        schema: {
            default: [
                'Saldo insuficiente',
            ],
        },
    })
    async update_balance(
        @Param('user_id') user_id: string,
        @Param('item_id') item_id: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.update_balance(
            user_id,
            item_id,
        );
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { user: result.unwrap() };
    }
}