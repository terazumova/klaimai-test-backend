import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getQuoteInformation(@Query() query) {
    const quote = await this.quoteService.getRandomQuote(query.authorId);

    if (!quote) {
      return {
        success: false,
        data: {},
      };
    }
    return {
      success: true,
      data: {
        authorId: quote['authorId'],
        quoteId: quote.id,
        quote: quote.quote,
      },
    };
  }
}
