import entities from '../typeorm/index';
import { DataSourceOptions } from 'typeorm';
import { createInfoTable1677655779587 } from 'src/migrations/1677655779587-createInfoTable';
import { createUsersTable1677677372374 } from 'src/migrations/1677677372374-createUsersTable';
import { createTokensTable1677757479942 } from 'src/migrations/1677757479942-createTokensTable';
import { createAuthorTable1677956169413 } from 'src/migrations/1677956169413-createAuthorTable';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'klaimai_db',
  entities: entities,
  synchronize: false,
  migrations: [
    createInfoTable1677655779587,
    createUsersTable1677677372374,
    createTokensTable1677757479942,
    createAuthorTable1677956169413,
  ],
};

export default databaseConfig;
