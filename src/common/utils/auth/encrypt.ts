import * as bcrypt from 'bcrypt';

export class Encrypt {
  private static readonly saltRounds = 10;

  static async hash_password(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }

  static async compare_password(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
