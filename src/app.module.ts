import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/database.module';
import { UserModule } from './modules/user.module';
import { ItemModule } from './modules/item.module';
import { EventModule } from './modules/event.module';
import { PartnerModule } from './modules/partner.module';

@Module({
  imports: [PrismaModule, UserModule, ItemModule, EventModule, PartnerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
