import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenService } from '../token/token.service';
import { Tokens } from '../typeorm/tokens.entity';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { LogoutController } from './controllers/logout.controller';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Tokens])],
  controllers: [RegisterController, LoginController, LogoutController],
  providers: [AuthService, ConfigService, TokenService],
})
export class AuthModule {}
