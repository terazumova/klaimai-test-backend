import entities from '../typeorm/index';
import { DataSourceOptions } from 'typeorm';
import { createInfoTable1677655779587 } from '../migrations/1677655779587-createInfoTable';
import { createUsersTable1677677372374 } from '../migrations/1677677372374-createUsersTable';
import { createTokensTable1677757479942 } from '../migrations/1677757479942-createTokensTable';
import { createAuthorTable1677956169413 } from '../migrations/1677956169413-createAuthorTable';
import { createQuoteTable1678008258623 } from '../migrations/1678008258623-createQuoteTable';

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
    createQuoteTable1678008258623,
  ],
};

export default databaseConfig;
