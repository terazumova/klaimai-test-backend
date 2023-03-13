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
import { LogoutController } from './controllers/logout.controller';
import { jwtConstants } from './constants';
@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Tokens]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [RegisterController, LoginController, LogoutController],
  providers: [
    AuthService,
    JwtStrategy,
    ConfigService,
    TokenService,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
