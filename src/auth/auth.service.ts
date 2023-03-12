import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from 'src/token/token.service';
import { Users } from 'src/typeorm/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async login(user: Users) {
    await this.tokenService.deleteOldToken(user.id);
    return await this.tokenService.generateToken(user);
  }

  async logout(user: Users) {
    return await this.tokenService.deleteOldToken(user.id);
  }

  async comparePasswords(userPassword: string, currentPassword: string) {
    return await bcrypt.compare(currentPassword, userPassword);
  }
}
