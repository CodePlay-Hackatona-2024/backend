import { ApiProperty } from "@nestjs/swagger";


export class ConfirmPresenceInEventModel {
    @ApiProperty({
        type: String,
        description: 'ID do evento',
        example: '123456'
    })
    event_id: string;

    @ApiProperty({
        type: String,
        description: 'ID do usuário',
        example: '123456'
    })
    user_id: string;

    @ApiProperty({
        type: String,
        description: 'Codigo de confirmação',
        example: '134564'
    })
    confirmation_code: string;
}