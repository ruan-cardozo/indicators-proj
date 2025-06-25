import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdentationAnalysisTable1750721877875 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "indentation_analysis" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "metric_id" uuid NOT NULL,
                "directory" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "fk_metric_id" FOREIGN KEY ("metric_id") REFERENCES "metric"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "identation_analysis"`);
    }
}
