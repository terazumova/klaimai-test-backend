import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from '../typeorm/tokens.entity';
import { Users } from '../typeorm/users.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Tokens)
    private tokenRepository: Repository<Tokens>,
  ) {}

  async generateToken(user: Users) {
    const expiresAt = this.getExpiresDate().toString();
    const token = uuidv4();
    const tokenObject = await this.tokenRepository.create({
      token,
      user,
      expiresAt,
    });

    await this.tokenRepository.save(tokenObject);

    return token;
  }

  async verifyToken(token): Promise<boolean> {
    const tokenObject = await this.findToken(token);

    if (!tokenObject) {
      return false;
    }

    const parsedDate = Date.parse(tokenObject.expiresAt);

    if (parsedDate && !this.isTokenExpired(parsedDate)) {
      return true;
    }

    return false;
  }

  async findToken(token: string): Promise<Tokens> {
    return await this.tokenRepository.findOne({ where: { token } });
  }

  async findTokenByUserId(userId: number): Promise<Tokens> {
    return await this.tokenRepository.findOne({
      where: { userId },
    });
  }

  async deleteOldTokenByUserId(userId: number): Promise<DeleteResult> {
    if (userId !== undefined) {
      return await this.tokenRepository.delete({ userId });
    }

    return null;
  }

  async deleteOldToken(token: string): Promise<DeleteResult> {
    if (token !== undefined) {
      return await this.tokenRepository.delete({ token });
    }

    return null;
  }

  getExpiresDate = (): Date => {
    const currentTime = new Date().getTime();

    return new Date(currentTime + 60 * 60 * 24 * 1000);
  };

  isTokenExpired = (expiresDate): boolean => {
    return Date.now() > expiresDate;
  };
}
