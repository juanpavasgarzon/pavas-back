import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1769331543736 implements MigrationInterface {
  name = 'CreateProductsTable1769331543736';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."products_unit_measure_enum" AS ENUM('unit', 'kg', 'gr', 'lt', 'ml', 'm', 'cm', 'm2', 'm3', 'box', 'pack')`,
    );
    await queryRunner.query(
      `CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "name" character varying NOT NULL, "description" text, "unit_measure" "public"."products_unit_measure_enum" NOT NULL DEFAULT 'unit', "conversion_factor" numeric(10,4) NOT NULL DEFAULT '1', "manages_inventory" boolean NOT NULL DEFAULT true, "base_price" numeric(15,2), "current_stock" numeric(15,4) NOT NULL DEFAULT '0', "minimum_stock" numeric(15,4) NOT NULL DEFAULT '0', "location" character varying, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7cfc24d6c24f0ec91294003d6b8" UNIQUE ("code"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "products"`);
    await queryRunner.query(`DROP TYPE "public"."products_unit_measure_enum"`);
  }
}
