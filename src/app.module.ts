import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InfoModule } from './info/info.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import { QuoteModule } from './quote/quote.module';
import databaseConfig from './config/database-config';
import { ValidationMiddleware } from './auth/validation.middleware';
import { TokenService } from './token/token.service';
import { Tokens } from './typeorm/tokens.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return databaseConfig;
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Tokens]),
    InfoModule,
    UserModule,
    AuthModule,
    AuthorModule,
    QuoteModule,
  ],
  controllers: [],
  providers: [TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes('profile', 'author', 'quote', 'logout');
  }
}
