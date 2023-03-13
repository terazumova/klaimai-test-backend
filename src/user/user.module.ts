import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/typeorm/users.entity';
import { UserService } from './user.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [UserService],
  controllers: [ProfileController],
})
export class UserModule {}
