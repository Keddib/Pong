import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { TypeOrmSession } from 'src/auth/utils/Session.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmConfigService {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    // return {
    //     type: 'postgres',
    //     host: this.config.get<string>('DATABASE_HOST'),
    //     port: this.config.get<number>('DATABASE_PORT'),
    //     database: this.config.get<string>('DATABASE_NAME'),
    //     username: this.config.get<string>('DATABASE_USER'),
    //     password: this.config.get<string>('DATABASE_PASSWORD'),

    // };
    return {
      name:"default",
      type: 'sqlite',
      database: './dbfile.db',
      entities: [User, TypeOrmSession],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
