import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from '../typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>,
  ) {}

  getDescription() {
    return this.infoRepository.findOne({
      where: {},
      order: { id: 'DESC' },
    });
  }
}
