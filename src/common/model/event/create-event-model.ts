import { ApiProperty } from "@nestjs/swagger";

export class CreateEventModel {
    @ApiProperty({
        type: String,
        description: 'Título do evento',
        example: 'Evento de treinamento'
    })
    title: string;

    @ApiProperty({
        type: String,
        description: 'Descrição do evento',
        example: 'Evento para realizar treinamento'
    })
    description: string;

    @ApiProperty({
        type: String,
        description: 'Date que irá ocorrer o evento',
        example: '2024-10-10T15:00:00.000Z'
    })
    date: string;
    
    @ApiProperty({
        type: Number,
        description: 'Capacidade do evento',
        example: 100
    })
    capacity: number;

    @ApiProperty({
        type: String,
        description: 'Tipo do evento',
        example: 'Type',
    })
    type: string;

    @ApiProperty({
        type: String,
        description: 'Local do evento',
        example: 'Local',
    })
    local: string;

    @ApiProperty({
        type: String,
        description: 'Imagem do evento',
        example: 'Imagem',
        required: false
    })
    photo_url: string;


}