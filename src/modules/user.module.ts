import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { CreateUserService } from "src/common/providers/services/user/create-user.service";
import { CreateUserController } from "src/common/controllers/user/create-user.controller";
import { LoginUserService } from "src/common/providers/services/user/login-user.service";
import { LoginUserController } from "src/common/controllers/user/login-user.controller";
import { RegisterInEventController } from "src/common/controllers/user/register-in-event.controller";
import { RegisterInEventService } from "src/common/providers/services/user/register-in-event.service";

@Module({
    imports: [PrismaModule],
    providers: [CreateUserService, LoginUserService, RegisterInEventService],
    controllers: [CreateUserController, LoginUserController, RegisterInEventController]
})

export class UserModule {}