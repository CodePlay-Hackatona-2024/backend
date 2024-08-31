import { ApiProperty } from "@nestjs/swagger";

export class CreatePartnerModel {
    @ApiProperty({
        type: String,
        description: 'Nome do parceiro',
        example: 'Renner'
    })
    name: string;

    @ApiProperty({
        type: String,
        description: 'Logo do parceiro',
        example: 'cdn.renner.com.br/logo.png'
    })
    logo: string;

    @ApiProperty({
        type: Array<String>,
        description: 'Itens que o parceiro oferece',
        example: ['Cupom', 'Desconto', 'Promoção']
    })
    items: Array<string>;

}