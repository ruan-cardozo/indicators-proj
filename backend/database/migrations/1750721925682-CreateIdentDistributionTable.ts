import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdentDistributionTable1750721925682 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "indent_distribution" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "indentation_file_id" uuid NOT NULL,
                "level" integer NOT NULL,
                "count" integer NOT NULL,
                "created_at" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "fk_indent_distribution_indentation_file" FOREIGN KEY ("indentation_file_id") REFERENCES "indentation_file"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "indent_distribution"`);
    }

}
