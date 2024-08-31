import {  Controller, Param, Patch, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GenerateConfirmationCodeService } from 'src/common/providers/services/event/generate-confirmation-code.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.EVENT.route)
@ApiTags(API_TAGS_CONTROLLER.EVENT.name)
export class GenerateConfirmationCodeController {
    constructor(private readonly service: GenerateConfirmationCodeService) {}

    @Patch("/generate-confirmation-code/:event_id")
    @ApiOperation({
        summary: 'Gerar código de confirmação',
        description: 'Este endpoint permite a geração de um código de confirmação para um evento.',
    })
    @ApiResponse({
        status: 200,
        description: 'Código de confirmação gerado com sucesso',
        schema: {
            default: [
                'Código de confirmação gerado com sucesso',
            ],
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Falha na geração do código de confirmação',
        schema: {
            default: [
                'Evento não encontrado',
            ],
        },
    })
    async generate_confirmation_code(
        @Param('event_id') event_id: string,
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.service.generate_confirmation_code(
            event_id,
        );
        if (result.isErr()) {
            res.status(400);
            return { message: result.unwrapErr() };
        }
        return { user: result.unwrap() };
    }
}