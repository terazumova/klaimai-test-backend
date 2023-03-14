import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../typeorm/users.entity';
import { UserService } from './user.service';
import { ProfileController } from './profile/profile.controller';
import { TokenService } from '../token/token.service';
import { Tokens } from '../typeorm/tokens.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Tokens]),
  ],
  providers: [UserService, TokenService],
  exports: [UserService],
  controllers: [ProfileController],
})
export class UserModule {}
