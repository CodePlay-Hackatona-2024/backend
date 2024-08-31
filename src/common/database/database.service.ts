import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Encrypt } from '../utils/auth/encrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    if (process.env.USE_MOCK_USER) {
      await this.user.upsert({
        create: {
          id: 'mockUserId',
          document: 'mockUserDocument',
          name: 'mockUser',
          email: 'mockUser@example.com',
          password: await Encrypt.hash_password('mockUser'),
          balance: 1000,
          isOrganizer: false,
        },
        update: {},
        where: {
          id: 'mockUserId',
        },
      });
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
