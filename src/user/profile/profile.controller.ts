import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from '../user.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfileInformation(@Request() req) {
    const userId = req?.user?.id;
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
