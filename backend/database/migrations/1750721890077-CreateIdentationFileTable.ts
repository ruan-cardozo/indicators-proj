import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIdentationFileTable1750721890077 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "indentation_file" (
                "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
                "indentation_analysis_id" uuid NOT NULL,
                "filename" varchar NOT NULL,
                "file_path" varchar NOT NULL,
                "max_indent_level" integer NOT NULL,
                "average_indent_level" float NOT NULL,
                "uses_spaces" boolean NOT NULL,
                "uses_tabs" boolean NOT NULL,
                "mixed_indentation" boolean NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "fk_indentation_analysis" FOREIGN KEY ("indentation_analysis_id") REFERENCES "indentation_analysis"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "indentation_file"`);
    }

}
