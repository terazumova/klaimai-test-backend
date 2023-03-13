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
    return new Promise<Quotes>((resolve) => {
      setTimeout(async () => {
        const quote = await this.quotesRepository
          .createQueryBuilder('quotes')
          .where('quotes.authorId = :id', { id: authorId })
          .orderBy('RANDOM()')
          .getOne();

        resolve(quote);
      }, 5000);
    });
  }
}
