import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { Users } from '../typeorm/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly tokenService: TokenService) {}

  async login(user: Users) {
    await this.tokenService.deleteOldTokenByUserId(user.id);
    return await this.tokenService.generateToken(user);
  }

  async comparePasswords(userPassword: string, currentPassword: string) {
    return await bcrypt.compare(currentPassword, userPassword);
  }
}
