import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { CreateUserService } from "src/common/providers/services/user/create-user.service";
import { CreateUserController } from "src/common/controllers/user/create-user.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreateUserService],
    controllers: [CreateUserController]
})

export class UserModule {}