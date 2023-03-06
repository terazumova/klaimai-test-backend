import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { Users } from 'src/typeorm/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async login(user: Users) {
    await this.tokenService.deleteOldToken(user.id);
    return await this.tokenService.generateToken(user);
  }

  async logout(user: Users) {
    return await this.tokenService.deleteOldToken(user.id);
  }
}
