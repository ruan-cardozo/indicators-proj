import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Metric } from './metric.entity';
import { IndentationFile } from './identation-file.entity';
import { BaseEntity } from './base.entity';

@Entity('indentation_analysis')
export class IndentationAnalysis extends BaseEntity {
	@Column({ name: 'metric_id', type: 'uuid' })
	metric_id: string;

	@ManyToOne(() => Metric, (metric) => metric.indentationAnalysis, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'metric_id' })
	metric: Metric;

	@Column()
	directory: string;

	@OneToMany(() => IndentationFile, (file) => file.indentation_analysis)
	files: IndentationFile[];
}
