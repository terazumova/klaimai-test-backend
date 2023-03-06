import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAuthorTable1677956169413 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE authors (
                id serial PRIMARY KEY,
                name varchar NOT NULL
            )`,
    );

    await queryRunner.query(
      `INSERT INTO authors (id, name)
          VALUES (1, 'Walt Disney'), (2, 'Mark Twain'), (3, 'Albert Einstein')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE authors');
  }
}
