import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductIngredientOrderMenuLocationLogisticReport1713841770028 implements MigrationInterface {
    name = 'ProductIngredientOrderMenuLocationLogisticReport1713841770028'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logistic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "totalPrice" money NOT NULL, "slug" text NOT NULL, "location_id" uuid, CONSTRAINT "UQ_15c54e1e833f7828f4d3a03f48f" UNIQUE ("name"), CONSTRAINT "UQ_0df9ed414ac2f6025407f74a071" UNIQUE ("slug"), CONSTRAINT "PK_b370bf6bf20ab3bfe7fcd67bc7e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "location" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "location" text NOT NULL, "slug" text NOT NULL, CONSTRAINT "UQ_f0336eb8ccdf8306e270d400cf0" UNIQUE ("name"), CONSTRAINT "UQ_6bad13da63bb61c073341294716" UNIQUE ("location"), CONSTRAINT "UQ_ff73a7032e673d18bacf8d06c9a" UNIQUE ("slug"), CONSTRAINT "PK_876d7bdba03c72251ec4c2dc827" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "category" "public"."ingredient_category_enum" NOT NULL DEFAULT 'Otros', "unitMeasurement" text NOT NULL, "quantity" integer NOT NULL, "dangerQuantity" integer NOT NULL, "purchasePrice" money NOT NULL, "salePrice" money, "slug" text NOT NULL, "location_id" uuid, CONSTRAINT "UQ_b6802ac7fbd37aa71d856a95d8f" UNIQUE ("name"), CONSTRAINT "UQ_92c3338c696827432934924b37d" UNIQUE ("slug"), CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_to_ingredient" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productId" uuid NOT NULL, "ingredientId" uuid NOT NULL, "quantityIngredient" integer NOT NULL DEFAULT '1', CONSTRAINT "PK_a2031760d75ba8ad4e68d903188" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "tableNumber" integer NOT NULL, "status" "public"."order_status_enum" NOT NULL DEFAULT 'ORDER CREATED', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_abcf3e22c7bde40de76b993294e" UNIQUE ("name"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "price" money NOT NULL, "slug" text NOT NULL, "category" "public"."product_category_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logistic_ingredients_ingredient" ("logisticId" uuid NOT NULL, "ingredientId" uuid NOT NULL, CONSTRAINT "PK_43a50a2c016e1b744692fba0473" PRIMARY KEY ("logisticId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_74771721e6c4f3342aac09381b" ON "logistic_ingredients_ingredient" ("logisticId") `);
        await queryRunner.query(`CREATE INDEX "IDX_161da5cadb478c74f6218d2255" ON "logistic_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`CREATE TABLE "order_products_product" ("orderId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_59f5d41216418eba313ed3c7d7c" PRIMARY KEY ("orderId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f9ea0b0e59e0d98ade4f2d5e9" ON "order_products_product" ("orderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d6c66c08b9c7e84a1b657797df" ON "order_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "logistic" ADD CONSTRAINT "FK_10bd58e619db1e1de320e66cf4a" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_4485bcb564bc1448841103191b4" FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_ingredient" ADD CONSTRAINT "FK_be99d38f3450fad85a32a408cc0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_to_ingredient" ADD CONSTRAINT "FK_0deeef93a4de2b135ef59a8e8b4" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" ADD CONSTRAINT "FK_74771721e6c4f3342aac09381b9" FOREIGN KEY ("logisticId") REFERENCES "logistic"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" ADD CONSTRAINT "FK_161da5cadb478c74f6218d22552" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_products_product" ADD CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_d6c66c08b9c7e84a1b657797dff"`);
        await queryRunner.query(`ALTER TABLE "order_products_product" DROP CONSTRAINT "FK_1f9ea0b0e59e0d98ade4f2d5e99"`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" DROP CONSTRAINT "FK_161da5cadb478c74f6218d22552"`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" DROP CONSTRAINT "FK_74771721e6c4f3342aac09381b9"`);
        await queryRunner.query(`ALTER TABLE "product_to_ingredient" DROP CONSTRAINT "FK_0deeef93a4de2b135ef59a8e8b4"`);
        await queryRunner.query(`ALTER TABLE "product_to_ingredient" DROP CONSTRAINT "FK_be99d38f3450fad85a32a408cc0"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_4485bcb564bc1448841103191b4"`);
        await queryRunner.query(`ALTER TABLE "logistic" DROP CONSTRAINT "FK_10bd58e619db1e1de320e66cf4a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d6c66c08b9c7e84a1b657797df"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1f9ea0b0e59e0d98ade4f2d5e9"`);
        await queryRunner.query(`DROP TABLE "order_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_161da5cadb478c74f6218d2255"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74771721e6c4f3342aac09381b"`);
        await queryRunner.query(`DROP TABLE "logistic_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "product_to_ingredient"`);
        await queryRunner.query(`DROP TABLE "ingredient"`);
        await queryRunner.query(`DROP TABLE "location"`);
        await queryRunner.query(`DROP TABLE "logistic"`);
    }

}
