import { Controller, Post, Request } from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async login(@Request() req) {
    const { email, password } = req.body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return {
        success: false,
        data: {
          message: "There's no such user.",
        },
      };
    }

    const arePasswordsEqual = await this.authService.comparePasswords(
      user.password,
      password,
    );

    if (!arePasswordsEqual) {
      return {
        success: false,
        data: {
          message: 'The password is wrong.',
        },
      };
    }

    const generatedToken = await this.authService.login(user);

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
