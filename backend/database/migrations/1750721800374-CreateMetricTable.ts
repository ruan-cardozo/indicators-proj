import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMetricTable1750721800374 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "metric" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "project_id" uuid NOT NULL,
                "recorded_at" timestamp NOT NULL,
                "lines" integer NOT NULL,
                "functions" integer NOT NULL,
                "classes" integer NOT NULL,
                "comments" integer NOT NULL,
                "comment_percentage" varchar NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "FK_metric_project" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE CASCADE
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "metric";`);
    }

}
