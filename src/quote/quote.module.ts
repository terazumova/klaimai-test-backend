import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quotes } from '../typeorm/quotes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quotes])],
  providers: [QuoteService],
  controllers: [QuoteController],
})
export class QuoteModule {}
