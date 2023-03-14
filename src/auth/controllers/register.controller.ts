import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../../user/user.dto';
import { UserService } from '../../user/user.service';
import { TokenService } from '../../token/token.service';

@Controller('register')
export class RegisterController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const user = await this.userService.findByEmail(email);

    if (user) {
      return {
        success: false,
        data: {
          message: 'User with this email already exists.',
        },
      };
    }

    const newUser = await this.userService.createUser(createUserDto);

    if (newUser) {
      await this.tokenService.generateToken(newUser);
    }

    return {
      success: !!newUser ?? false,
      data: {},
    };
  }
}
