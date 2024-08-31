import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';

@Injectable()
export class UpdateBalanceService {
    constructor(private readonly database: PrismaService) {}
    
    async update_balance(
        user_id: string,
        item_id: string,
    ): Promise<Result<string, string>> {
        const existing_user = await this.database.user.findUnique({
            where: { id: user_id },
            include: { items: true },
        });
        if (!existing_user) {
        return Err('Usuário não encontrado');
        }

        const existing_item = await this.database.item.findUnique({
            where: { item_id: item_id },
        });
        
        if (!existing_item) {
            return Err('Item não encontrado');
        }

        const value = existing_item.value;

        if(existing_user.balance < value) {
            return Err('Saldo insuficiente');
        }
        
        const new_balance = existing_user.balance - value >= 0 ? existing_user.balance - value : 0;
        const updated_user = await this.database.user.update({
            where: { id: user_id },
            data: {
                balance: new_balance,
                items: {
                    connect: { item_id: item_id },
                }
            },
        });

        
    
        return Ok('Saldo atualizado');
    }
}