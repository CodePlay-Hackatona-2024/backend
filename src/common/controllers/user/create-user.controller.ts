import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserModel } from 'src/common/model/user/user-model';
import { CreateUserService } from 'src/common/providers/services/user/create-user.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.USER.route)
@ApiTags(API_TAGS_CONTROLLER.USER.name)
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar novo usuário',
    description: 'Este endpoint permite a criação de um novo usuário.',
  })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
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
    description: 'Erro na criação do usuário',
    schema: {
      default: [
        'É obrigatório preencher todos os campos.',
        'O e-mail informado já está sendo utilizado.',
      ],
    },
  })
  async create_user(
    @Body() body: CreateUserModel,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { name, email, password, document } = body;
    const result = await this.service.create_user(
      name,
      email,
      password,
      document,
    );
    if (result.isErr()) {
      res.status(400);
      return { message: result.unwrapErr() };
    }
    return { id: result.unwrap() };
  }
}
