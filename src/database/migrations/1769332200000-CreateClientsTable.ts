import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClientsTable1769332200000 implements MigrationInterface {
  name = 'CreateClientsTable1769332200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "code" character varying NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying,
        "phone" character varying,
        "address" text,
        "tax_id" character varying,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_clients_code" UNIQUE ("code"),
        CONSTRAINT "PK_clients" PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
