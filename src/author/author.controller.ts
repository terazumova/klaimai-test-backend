import { Controller, Get } from '@nestjs/common';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async getAuthorInformation() {
    const author = await this.authorService.getRandomAuthor();

    if (!author) {
      return {
        success: false,
        data: {
          message: 'No author was found.',
        },
      };
    }

    return {
      success: true,
      data: {
        authorId: author.id,
        name: author.name,
      },
    };
  }
}
