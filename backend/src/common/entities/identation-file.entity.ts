import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IndentationAnalysis } from './identation-analysis.entity';
import { IndentDistribution } from './indent-distribution.entity';

@Entity('indentation_file')
export class IndentationFile extends BaseEntity {
    @Column('uuid')
    indentation_analysis_id: string;

    @Column()
    filename: string;

    @Column()
    file_path: string;

    @Column({ type: 'integer' })
    max_indent_level: number;

    @Column({ type: 'float' })
    average_indent_level: number;

    @Column({ type: 'boolean' })
    uses_spaces: boolean;

    @Column({ type: 'boolean' })
    uses_tabs: boolean;

    @Column({ type: 'boolean' })
    mixed_indentation: boolean;

    @ManyToOne(() => IndentationAnalysis, (analysis) => analysis.files, {
        onDelete: 'CASCADE',
    })
    indentation_analysis: IndentationAnalysis;

    @OneToMany(() => IndentDistribution, (distribution) => distribution.indentation_file)
    distributions: IndentDistribution[];
}