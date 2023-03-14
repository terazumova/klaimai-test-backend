import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from '../token/token.service';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req?.query?.token;

    if (!token) {
      throw new UnauthorizedException();
    }

    const isTokenValid = await this.tokenService.verifyToken(token);

    if (!isTokenValid) {
      throw new UnauthorizedException();
    }

    next();
  }
}
