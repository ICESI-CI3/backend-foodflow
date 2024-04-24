import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductIngredients1713971497403 implements MigrationInterface {
    name = 'ProductIngredients1713971497403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_4e2ebe4f79ec74f11e3695b42ca"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "name" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "role" text array NOT NULL, "rating" integer NOT NULL DEFAULT '-1', "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "logistic_ingredients_ingredient" ("logisticId" uuid NOT NULL, "ingredientId" uuid NOT NULL, CONSTRAINT "PK_43a50a2c016e1b744692fba0473" PRIMARY KEY ("logisticId", "ingredientId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_74771721e6c4f3342aac09381b" ON "logistic_ingredients_ingredient" ("logisticId") `);
        await queryRunner.query(`CREATE INDEX "IDX_161da5cadb478c74f6218d2255" ON "logistic_ingredients_ingredient" ("ingredientId") `);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "logistic_id"`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" ADD CONSTRAINT "FK_74771721e6c4f3342aac09381b9" FOREIGN KEY ("logisticId") REFERENCES "logistic"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" ADD CONSTRAINT "FK_161da5cadb478c74f6218d22552" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" DROP CONSTRAINT "FK_161da5cadb478c74f6218d22552"`);
        await queryRunner.query(`ALTER TABLE "logistic_ingredients_ingredient" DROP CONSTRAINT "FK_74771721e6c4f3342aac09381b9"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "logistic_id" uuid`);
        await queryRunner.query(`DROP INDEX "public"."IDX_161da5cadb478c74f6218d2255"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_74771721e6c4f3342aac09381b"`);
        await queryRunner.query(`DROP TABLE "logistic_ingredients_ingredient"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_4e2ebe4f79ec74f11e3695b42ca" FOREIGN KEY ("logistic_id") REFERENCES "logistic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
