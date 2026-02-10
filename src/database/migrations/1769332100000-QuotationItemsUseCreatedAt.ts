import { MigrationInterface, QueryRunner } from 'typeorm';

export class QuotationItemsUseCreatedAt1769332100000 implements MigrationInterface {
  name = 'QuotationItemsUseCreatedAt1769332100000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP COLUMN "sort_order"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "quotation_items" ADD "sort_order" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "quotation_items" DROP COLUMN "created_at"`,
    );
  }
}
