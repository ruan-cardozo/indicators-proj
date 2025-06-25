import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMetricHashTable1750721940296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "metric_hash" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "project_id" uuid NOT NULL,
                "hash_value" varchar NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "expires_at" TIMESTAMP,
                "status" varchar NOT NULL,
                CONSTRAINT "fk_metric_hash_project" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "metric_hash"`);
    }
}
