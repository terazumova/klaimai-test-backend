import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LocalAuthGuard } from '../local-auth.guard';

@Controller('login')
export class LoginController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async login(@Request() req) {
    const generatedToken = await this.authService.login(req.user);

    if (generatedToken) {
      return {
        success: true,
        data: {
          token: generatedToken,
        },
      };
    }

    return {
      success: false,
      data: {},
    };
  }
}
