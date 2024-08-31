import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { CreatePartnerService } from "src/common/providers/services/partner/create-partner.service";
import { CreatePartnerController } from "src/common/controllers/partner/create-partner.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreatePartnerService],
    controllers: [CreatePartnerController]
})

export class PartnerModule {}