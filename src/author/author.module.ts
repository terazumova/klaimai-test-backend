import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Authors } from '../typeorm/authors.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Authors])],
  providers: [AuthorService],
  controllers: [AuthorController],
})
export class AuthorModule {}
