import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { Dependency } from './dependency.entity';
import { IndentationAnalysis } from './identation-analysis.entity';

@Entity('metric')
export class Metric extends BaseEntity {
	@Column({ name: 'project_id', type: 'uuid' })
	project_id: string;

	@Column({ type: 'timestamp with time zone', nullable: true })
	recorded_at: Date;

	@Column({ type: 'integer', nullable: true })
	lines: number;

	@Column({ type: 'integer', nullable: true })
	functions: number;

	@Column({ type: 'integer', nullable: true })
	classes: number;

	@Column({ type: 'integer', nullable: true })
	comments: number;

	@Column({ nullable: true })
	comment_percentage: string;

	@Column({ nullable: true })
	average_function_size: string;

	@ManyToOne(() => Project, (project) => project.metrics, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'project_id' })
	project: Project;

	@OneToMany(() => Dependency, (dependency) => dependency.metric)
	dependencies: Dependency[];

	@OneToMany(() => IndentationAnalysis, (analysis) => analysis.metric)
	indentationAnalysis: IndentationAnalysis[];
}
