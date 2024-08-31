import { ApiProperty } from "@nestjs/swagger";

export class CreateItemModel {
    @ApiProperty({
        type: String,
        description: 'Nome do item',
        example: 'Cupom'
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'Descrição do item',
        example: 'Cupom de desconto'
    })
    description: string;

    @ApiProperty({
        type: Number,
        description: 'Valor/preço do item',
        example: 50
    })
    value: number;

}