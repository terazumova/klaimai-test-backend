import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authors } from '../typeorm/authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
  ) {}

  async getRandomAuthor() {
    return new Promise<Authors>((resolve) => {
      setTimeout(async () => {
        const author = await this.authorsRepository
          .createQueryBuilder()
          .orderBy('RANDOM()')
          .getOne();

        resolve(author);
      }, 5000);
    });
  }
}
