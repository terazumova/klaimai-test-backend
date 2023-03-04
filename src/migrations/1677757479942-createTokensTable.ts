import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTokensTable1677757479942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE tokens (
              id serial PRIMARY KEY,
              token varchar NOT NULL,
              "userId" int,
              FOREIGN KEY ("userId") REFERENCES users (id)
          )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE tokens');
  }
}
