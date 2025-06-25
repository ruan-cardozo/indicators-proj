import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { IndentDistribution } from './indent-distribution.entity';
import { BaseEntity } from './base.entity';
import { IndentationAnalysis } from './identation-analysis.entity';

@Entity('indentation_file')
export class IndentationFile extends BaseEntity {
	@Column({ name: 'indentation_analysis_id', type: 'uuid' })
	indentation_analysis_id: string;

	@ManyToOne(() => IndentationAnalysis, (analysis) => analysis.files, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'indentation_analysis_id' })
	indentation_analysis: IndentationAnalysis;

	@Column()
	filename: string;

	@Column()
	path: string;

	@Column({ type: 'int' })
	max_indent_level: number;

	@Column({ type: 'float' })
	average_indent_level: number;

	@Column({ type: 'boolean' })
	uses_spaces: boolean;

	@Column({ type: 'boolean' })
	uses_tabs: boolean;

	@Column({ type: 'boolean' })
	mixed_indentation: boolean;

	@OneToMany(() => IndentDistribution, (dist) => dist.indentation_file)
	distributions: IndentDistribution[];
}
