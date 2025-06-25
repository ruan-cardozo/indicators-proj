import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDependencyItemTable1750721851368 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "dependency_item" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "dependency_id" uuid NOT NULL,
                "name" varchar NOT NULL,
                "category" varchar NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "FK_dependency_item_dependency" FOREIGN KEY ("dependency_id") REFERENCES "dependency"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dependency_item"`);
    }

}
