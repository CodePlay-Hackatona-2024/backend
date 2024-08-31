import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';
import { CreateItemModel } from 'src/common/model/item/create-item-model';

@Injectable()
export class CreateItemService {
    constructor(private readonly database: PrismaService) {}

    async create_item(
        item: CreateItemModel
    ): Promise<Result<string, string>> {
        try {
            const created_item = await this.database.item.create({
                data: {
                    name: item.name,
                    description: item.description,
                    value: item.value,    
                }
            });

            return Ok(created_item.item_id);
        } catch (error) {
            return Err('Falha ao criar item');
        }
    }
}