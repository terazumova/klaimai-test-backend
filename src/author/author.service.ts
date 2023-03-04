import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Authors } from 'src/typeorm/authors.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
  ) {}

  async getRandomAuthor() {
    return await this.authorsRepository
      .createQueryBuilder()
      .orderBy('RANDOM()')
      .getOne();
  }
}
