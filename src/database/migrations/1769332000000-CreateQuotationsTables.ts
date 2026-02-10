import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateQuotationsTables1769332000000 implements MigrationInterface {
  name = 'CreateQuotationsTables1769332000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."quotations_status_enum" AS ENUM('draft', 'sent', 'accepted', 'rejected')`,
    );
    await queryRunner.query(
      `CREATE TABLE "quotations" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "number" character varying NOT NULL,
        "client_name" character varying NOT NULL,
        "status" "public"."quotations_status_enum" NOT NULL DEFAULT 'draft',
        "valid_until" date,
        "subtotal" numeric(15,2) NOT NULL DEFAULT '0',
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "created_by_id" uuid NOT NULL,
        CONSTRAINT "UQ_quotations_number" UNIQUE ("number"),
        CONSTRAINT "PK_quotations" PRIMARY KEY ("id"),
        CONSTRAINT "FK_quotations_created_by" FOREIGN KEY ("created_by_id") REFERENCES "users"("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "quotation_items" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "quotation_id" uuid NOT NULL,
        "product_id" uuid,
        "description" text NOT NULL,
        "quantity" numeric(15,4) NOT NULL,
        "unit_price" numeric(15,2) NOT NULL,
        "total" numeric(15,2) NOT NULL,
        "sort_order" integer NOT NULL DEFAULT 0,
        CONSTRAINT "PK_quotation_items" PRIMARY KEY ("id"),
        CONSTRAINT "FK_quotation_items_quotation" FOREIGN KEY ("quotation_id") REFERENCES "quotations"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_quotation_items_product" FOREIGN KEY ("product_id") REFERENCES "products"("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "quotation_items"`);
    await queryRunner.query(`DROP TABLE "quotations"`);
    await queryRunner.query(`DROP TYPE "public"."quotations_status_enum"`);
  }
}
