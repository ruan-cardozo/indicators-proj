import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDependencyTable1750721820923 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "dependency" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "metric_id" uuid NOT NULL,
                "name" varchar NOT NULL,
                "type" varchar NOT NULL,
                "total_count" integer NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "FK_metric_id" FOREIGN KEY ("metric_id") REFERENCES "metric"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "dependency"`);
    }

}
