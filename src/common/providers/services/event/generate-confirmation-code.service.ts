import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';

@Injectable()
export class GenerateConfirmationCodeService {
    constructor(private readonly database: PrismaService) {}

    async generate_confirmation_code(event_id: string): Promise<Result<string, string>> {
        const confirmation_code = Math.random().toString(36).substring(7);

        try {
            await this.database.event.update({
                where: { event_id },
                data: {
                    confirmation_code
                }
            });
            return Ok(confirmation_code);
        } catch (error) {
            return Err('Failed to generate confirmation code');
        }
    }
}