import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from 'src/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InfoService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>,
  ) {}

  async getDescription() {
    const infoObject = await this.infoRepository.findOne({
      where: {},
      order: { id: 'DESC' },
    });

    if (!infoObject) {
      return {
        success: false,
        data: {},
      };
    }

    return {
      success: true,
      data: {
        info: infoObject.info,
      },
    };
  }
}
