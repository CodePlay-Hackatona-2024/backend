import { Injectable } from "@nestjs/common";
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';


@Injectable()
export class GetUserDetailsService {
    constructor(private readonly database: PrismaService) {}

    async get_user_details(
        id: string,
    ): Promise<Result<{id: string, name: string, balance: number}, string>> {
        try {
            const user = await this.database.user.findUnique({
                where: { id },
            });

            if (!user) {
                return Err('User not found');
            }

            return Ok({id: user.id, name: user.name, balance: user.balance});
        } catch (error) {
            console.log(error);
            return Err('Failed to fetch user');
        }
    }
}