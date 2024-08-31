import { Module } from "@nestjs/common";
import { PrismaModule } from "./database.module";
import { CreateUserService } from "src/common/providers/services/user/create-user.service";
import { CreateUserController } from "src/common/controllers/user/create-user.controller";
import { LoginUserService } from "src/common/providers/services/user/login-user.service";
import { LoginUserController } from "src/common/controllers/user/login-user.controller";
import { RegisterInEventController } from "src/common/controllers/user/register-in-event.controller";
import { RegisterInEventService } from "src/common/providers/services/user/register-in-event.service";
import { UpdateBalanceService } from "src/common/providers/services/user/update-balance.service";
import { UpdateBalanceController } from "src/common/controllers/user/update-balance.controller";
import { ConfirmPresenceInEventService } from "src/common/providers/services/user/confirm-presence-in-event.service";
import { ConfirmPresenceInEventController } from "src/common/controllers/user/confirm-presence-in-event.controller";
import { GetUserDetailsService } from "src/common/providers/services/user/get-user-details.service";
import { GetUserDetailsController } from "src/common/controllers/user/get-user-details.controller";

@Module({
    imports: [PrismaModule],
    providers: [CreateUserService, LoginUserService, RegisterInEventService, UpdateBalanceService, ConfirmPresenceInEventService, GetUserDetailsService],
    controllers: [CreateUserController, LoginUserController, RegisterInEventController, UpdateBalanceController, ConfirmPresenceInEventController, GetUserDetailsController]
})

export class UserModule {}