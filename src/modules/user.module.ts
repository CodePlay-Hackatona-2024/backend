import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { CreateUserService } from "src/common/providers/services/user/create-user.service";
import { CreateUserController } from "src/common/controllers/user/create-user.controller";
import { LoginUserService } from "src/common/providers/services/user/login-user.service";
import { LoginUserController } from "src/common/controllers/user/login-user.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreateUserService, LoginUserService],
    controllers: [CreateUserController, LoginUserController]
})

export class UserModule {}