import { Body, Controller, Param, Patch, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RegisterInEventService } from 'src/common/providers/services/user/register-in-event.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.USER.route)
@ApiTags(API_TAGS_CONTROLLER.USER.name)
export class RegisterInEventController {
  constructor(private readonly service: RegisterInEventService) {}

  @Patch('/register/:event_id/:user_id')
  @ApiOperation({
    summary: 'Registrar o usuário em um evento',
    description: 'Este endpoint realiza a inscrição de um usuário em um evento.',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuário registrado no evento com sucesso',
    schema: {
      default: [
        'Usuário registrado no evento com sucesso',
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Falha no registro do usuário no evento',
    schema: {
      default: [
        'Usuário já registrado no evento',
      ],
    },
  })
  async register_in_event(
    @Param('event_id') event_id: string,
    @Param('user_id') user_id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.service.register_in_event(
      user_id,
      event_id,
    );
    if (result.isErr()) {
      res.status(400);
      return { message: result.unwrapErr() };
    }
    return { user: result.unwrap() };
  }
}
