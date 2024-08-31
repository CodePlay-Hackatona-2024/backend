import { ApiProperty } from '@nestjs/swagger';

export class CreateUserModel {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João',
    required: true,
  })
  name: string;


  @ApiProperty({
    description: 'E-mail do usuário',
    example: 'teste@gmail.com',
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: '12345',
    required: true,
  })
  password: string;

  @ApiProperty({
    description: 'Documento do usuário',
    example: '123.456.789-00',
    required: true,
  })
    document: string;
}
