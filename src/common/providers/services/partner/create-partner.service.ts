import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';
import { CreatePartnerModel } from 'src/common/model/partner/create-partner-model';

@Injectable()
export class CreatePartnerService {
    constructor(private readonly database: PrismaService) {}

    async create_partner(
        partner: CreatePartnerModel
    ): Promise<Result<string, string>> {
        try {
            const created_partner = await this.database.partner.create({
                data: {
                    name: partner.name,
                    logo: partner.logo,
                    items: {
                        connect: partner.items.map(item => ({ item_id: item }))
                    }   
                }
            });

            return Ok(created_partner.id);
        } catch (error) {
            return Err('Falha ao criar parceiro');
        }
    }
}