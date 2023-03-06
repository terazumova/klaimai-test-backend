import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from 'src/typeorm/tokens.entity';
import { Users } from 'src/typeorm/users.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(Tokens)
    private tokenRepository: Repository<Tokens>,
  ) {}

  async generateToken(user: Users) {
    const expiresIn = 60 * 60 * 24;
    const payload = {
      sub: user.id,
      username: user.email,
    };
    const token = await this.jwtService.sign(payload, { expiresIn });
    const tokenObject = await this.tokenRepository.create({
      token,
      user,
    });

    await this.tokenRepository.save(tokenObject);

    return token;
  }

  async verifyToken(token): Promise<any> {
    try {
      const data = this.jwtService.verify(token);
      const tokenObject = await this.findToken(token);

      if (tokenObject) {
        return { id: data?.sub };
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async findToken(token: string): Promise<Tokens> {
    return await this.tokenRepository.findOne({ where: { token } });
  }

  async findTokenByUserId(userId: number): Promise<Tokens> {
    return await this.tokenRepository.findOne({
      where: { user: { id: userId } },
    });
  }

  async deleteOldToken(userId: number): Promise<DeleteResult> {
    return await this.tokenRepository.delete({ user: { id: userId } });
  }
}
