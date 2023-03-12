import { MigrationInterface, QueryRunner } from 'typeorm';

export class createQuoteTable1678008258623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE quotes (
        id serial PRIMARY KEY,
        quote varchar NOT NULL,
        "authorId" int,
        FOREIGN KEY ("authorId") REFERENCES authors (id)
      )`,
    );

    await queryRunner.query(
      `INSERT INTO quotes (id, "authorId", quote)
        VALUES (1, 1, 'The more you like yourself, the less you are like anyone else, which makes you unique.'),
        (2, 1, 'Disneyland is a work of love. We didn''t go into Disneyland just with the idea of making money.'),
        (3, 1, 'I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter.'),
        (4, 2, 'The secret of getting ahead is getting started.'),
        (5, 2, 'Part of the secret of a success in life is to eat what you like and let the food fight it out inside.'),
        (6, 2, 'You can''t depend on your eyes when your imagination is out of focus.'),
        (7, 3, 'Look deep into nature, and then you will understand everything better.'),
        (8, 3, 'Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.'),
        (9, 3, 'The only source of knowledge is experience.')
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE quotes');
  }
}
