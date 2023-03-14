import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTokensTable1677757479942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE tokens (
        id serial PRIMARY KEY,
        token varchar NOT NULL,
        "userId" int UNIQUE,
        FOREIGN KEY ("userId") REFERENCES users (id),
        "expiresAt" varchar NOT NULL
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tokens');
  }
}
