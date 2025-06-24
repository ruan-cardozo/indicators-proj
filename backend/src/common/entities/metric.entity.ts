import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';
import { Dependency } from './dependency.entity';
import { IndentationAnalysis } from './identation-analysis.entity';

@Entity('metric')
export class Metric extends BaseEntity {
	@Column('uuid')
	project_id: string;

	@Column({ type: 'timestamp with time zone' })
	recorded_at: Date;

	@Column({ type: 'integer' })
	lines: number;

	@Column({ type: 'integer' })
	functions: number;

	@Column({ type: 'integer' })
	classes: number;

	@Column({ type: 'integer' })
	comments: number;

	@Column()
	comment_percentage: string;

	@ManyToOne(() => Project, (project) => project.metrics, {
		onDelete: 'CASCADE',
	})
	project: Project;

	@OneToMany(() => Dependency, (dependency) => dependency.metric)
	dependencies: Dependency[];

	@OneToMany(() => IndentationAnalysis, (analysis) => analysis.metric)
	indentationAnalysis: IndentationAnalysis[];
}
