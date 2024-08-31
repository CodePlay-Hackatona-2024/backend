import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';

@Injectable()
export class FetchItemsService {
  constructor(private readonly database: PrismaService) {}

  async fetch_items(): Promise<Result<string, string>> {
    const items = await this.database.item.findMany();
    return Ok(JSON.stringify(items));
  }
}