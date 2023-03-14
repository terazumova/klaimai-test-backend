import { Controller, Delete, Query } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';

@Controller('logout')
export class LogoutController {
  constructor(private readonly tokenService: TokenService) {}

  @Delete()
  async logout(@Query() query) {
    const token = query?.token;

    if (token) {
      await this.tokenService.deleteOldToken(token);

      return {
        success: true,
        data: {},
      };
    }

    return {
      success: false,
      data: {},
    };
  }
}
