import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quotes } from 'src/typeorm/quotes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuoteService {
  constructor(
    @InjectRepository(Quotes)
    private readonly quotesRepository: Repository<Quotes>,
  ) {}

  async getRandomQuote(authorId: number) {
    return await this.quotesRepository
      .createQueryBuilder('quotes')
      .where('quotes.authorId = :id', { id: authorId })
      .orderBy('RANDOM()')
      .getOne();
  }
}
