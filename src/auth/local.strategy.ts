import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/typeorm/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<Users> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    const arePasswordsEqual = await this.comparePasswords(
      user.password,
      password,
    );

    if (!arePasswordsEqual) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async comparePasswords(userPassword: string, currentPassword: string) {
    return await bcrypt.compare(currentPassword, userPassword);
  }
}
