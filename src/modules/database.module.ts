import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/database/database.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
