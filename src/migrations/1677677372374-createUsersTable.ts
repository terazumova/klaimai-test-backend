import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1677677372374 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE users (
        id serial PRIMARY KEY,
        fullname varchar NOT NULL,
        email varchar NOT NULL,
        password varchar NOT NULL
      )`,
    );

    await queryRunner.query(
      `INSERT INTO users (id, fullname, email, password)
        VALUES (0, 'Alexey Kornilov', 'alexey@klaim.ai', '$2a$10$.OU76oTYPNOXtsSTBUyKQ.OHEIvymVXJXQeP4BcNmw5D9/bwdrhGG')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE users');
  }
}
