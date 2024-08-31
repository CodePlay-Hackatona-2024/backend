import { ApiProperty } from "@nestjs/swagger";

export class LoginUserModel {
    @ApiProperty({
        description: 'E-mail do usuário',
        example: 'abc@gmail.com',
        required: true,
    })
    email: string;

    @ApiProperty({
        description: 'Senha do usuário',
        example: '123456',
        required: true,
    })
    password: string;
}