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
    const existing_user = await this.database.user.findUnique({
        where: { email },
    });
    if (!existing_user) {
      return Err('Informações de login inválidas');
    }

    const is_password_valid = await Encrypt.compare_password(
      password,
      existing_user.password,
    );

    console.log(password, existing_user.password);

    if (!is_password_valid) {
      return Err('Informações de login inválidas');
    }

    return Ok(existing_user.id);
  }
}
