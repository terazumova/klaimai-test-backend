import { Controller, Get, Query } from '@nestjs/common';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Get()
  async getQuoteInformation(@Query() query) {
    const quote = await this.quoteService.getRandomQuote(query.authorId);

    if (!quote) {
      return {
        success: false,
        data: {
          message: "Quote wasn't found.",
        },
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
