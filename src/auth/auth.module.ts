import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TokenService } from 'src/token/token.service';
import { Tokens } from 'src/typeorm/tokens.entity';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LoginController } from './controllers/login.controller';
import { RegisterController } from './controllers/register.controller';
import { LocalStrategy } from './local.strategy';
import { LogoutController } from './controllers/logout.controller';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Tokens]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [RegisterController, LoginController, LogoutController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    TokenService,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
