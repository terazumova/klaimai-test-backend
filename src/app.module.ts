import { Module } from '@nestjs/common';
import { InfoModule } from './info/info.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthorModule } from './author/author.module';
import databaseConfig from './config/database-config';

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
    InfoModule,
    UserModule,
    AuthModule,
    AuthorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
