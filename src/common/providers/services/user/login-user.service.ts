import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';
import { Result, Ok, Err } from 'rust-option';
import { Encrypt } from 'src/common/utils/auth/encrypt';

@Injectable()
export class LoginUserService {
  constructor(private readonly database: PrismaService) {}

  async login_user(
    email: string,
    password: string,
  ): Promise<Result<string, string>> {
    const encrypted_password = await Encrypt.hash_password(password);
    const existing_user = await this.database.user.findUnique({
        where: { email, password: encrypted_password },
    });
    if (!existing_user) {
      return Err('Informações de login inválidas');
    }
    return Ok("Login efetuado com sucesso");
  }
}
