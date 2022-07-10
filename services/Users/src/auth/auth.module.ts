import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { FortyTwoStrategy } from "./auth.strategy";
import { SessionSerializer } from "./utils/Serializer";

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    FortyTwoStrategy,
    SessionSerializer,
    {
      provide: "AUTH_SERVICE",
      useClass: AuthService
    }
  ],
})
export class AuthModule {}
