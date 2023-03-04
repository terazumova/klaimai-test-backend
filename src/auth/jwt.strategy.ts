import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokenService: TokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(payload: any) {
    // const token = req.headers.authorization.slice(7);
    // const tokenExists = await this.tokenService.exists(user._id, token);
    // if (tokenExists) {
    //   return user;
    // } else {
    //   throw new UnauthorizedException();
    // }
    //return { userId: payload.sub, username: payload.username };
  }
}
