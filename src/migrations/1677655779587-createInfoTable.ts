import { MigrationInterface, QueryRunner } from 'typeorm';

export class createInfoTable1677655779587 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE info (id int NOT NULL PRIMARY KEY, description text)`,
    );

    await queryRunner.query(
      `INSERT INTO info (id, description) VALUES (1, 'Some information about the company.')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE info');
  }
}
