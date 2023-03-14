import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/users.entity';
import { UserService } from './user.service';
import { ProfileController } from './profile/profile.controller';
import { TokenService } from 'src/token/token.service';
import { Tokens } from 'src/typeorm/tokens.entity';

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
