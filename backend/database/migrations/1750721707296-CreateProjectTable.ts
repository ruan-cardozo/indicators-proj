import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectTable1750721707296 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "project" (
            "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            "name" VARCHAR(255) NOT NULL,
            "description" TEXT,
            "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            "last_metric_at" TIMESTAMP WITH TIME ZONE,
            "is_active" BOOLEAN DEFAULT TRUE,
            "repository_url" VARCHAR(512),
            "metadata" JSONB
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS "project";
        `);
    }
}
