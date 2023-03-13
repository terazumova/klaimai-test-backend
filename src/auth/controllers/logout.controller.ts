import {
  Controller,
  Delete,
  UseGuards,
  Request,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../jwt-auth.guard';

@Controller('logout')
export class LogoutController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Delete()
  async logout(@Request() req) {
    await this.authService.logout(req.user);

    return {
      success: true,
      data: {},
    };
  }
}
