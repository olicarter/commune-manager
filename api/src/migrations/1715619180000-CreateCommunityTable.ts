import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommunityTable1715619180000 implements MigrationInterface {
  name = 'CreateCommunityTable1715619180000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "communities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_communities_id" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "communities"`);
  }
}
