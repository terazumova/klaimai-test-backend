import { Controller, Get, Query } from '@nestjs/common';
import { TokenService } from 'src/token/token.service';
import { UserService } from '../user.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Get()
  async getProfileInformation(@Query() query) {
    const tokenObject = await this.tokenService.findToken(query.token);
    const userId = tokenObject?.userId;
    const user =
      userId !== undefined ? await this.userService.findById(userId) : null;

    if (!user) {
      return {
        success: false,
        data: {},
      };
    }

    return {
      success: true,
      data: {
        fullname: user.fullname,
        email: user.email,
      },
    };
  }
}
