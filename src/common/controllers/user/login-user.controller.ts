import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoginUserModel } from 'src/common/model/user/login-user-model';
import { LoginUserService } from 'src/common/providers/services/user/login-user.service';
import { API_TAGS_CONTROLLER } from 'src/common/utils/enums/api-tags';

@Controller(API_TAGS_CONTROLLER.USER.route)
@ApiTags(API_TAGS_CONTROLLER.USER.name)
export class LoginUserController {
  constructor(private readonly service: LoginUserService) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Validar login do usuário',
    description: 'Este endpoint permite a validação do login de um usuário.',
  })
  @ApiResponse({
    status: 200,
    description: 'Login válidado com sucesso',
    schema: {
      default: [
        'Login efetuado com sucesso',
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Login não validado',
    schema: {
      default: [
        'Informações de login inválidos',
      ],
    },
  })
  async login_user(
    @Body() body: LoginUserModel,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { email, password } = body;
    const result = await this.service.login_user(
      email,
      password,
    );
    if (result.isErr()) {
      res.status(400);
      return { message: result.unwrapErr() };
    }
    return { id: result.unwrap() };
  }
}
