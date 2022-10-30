import { Module } from "@nestjs/common"
import { TypegooseModule } from "nestjs-typegoose"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { getJwtConfig } from "../config/jwt.config"
import { UserModel } from "./user.model"

@Module({
	controllers: [AuthController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: UserModel,
				schemaOptions: {
					collection: "User"
				}
			}
		]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		ConfigModule,
		PassportModule
	],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
