import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @UseGuards(JwtAuthGuard)
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
