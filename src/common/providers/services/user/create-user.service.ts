import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';
import { Encrypt } from 'src/common/utils/auth/encrypt';

@Injectable()
export class CreateUserService {
  constructor(private readonly database: PrismaService) {}

  async create_user(
    name: string,
    email: string,
    password: string,
    document: string,
  ): Promise<Result<string, string>> {
    const existing_user = await this.database.user.findUnique({
      where: { email },
    });
    if (existing_user) {
      return Err('O email informado já esta sendo utilizado');
    }

    const createdUser = await this.database.user.create({
      data: {
        name,
        email,
        password: await Encrypt.hash_password(password),
        document, 
        balance: 0,
        isOrganizer: false,
    },
    });
    return Ok(createdUser.id);
  }
}
