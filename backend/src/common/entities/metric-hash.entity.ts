import { Column, Entity, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from './base.entity';

@Entity('metric_hash')
export class MetricHash extends BaseEntity {
	@Column('uuid')
	project_id: string;

	@Column()
	hash_value: string;

	@Column({ type: 'timestamp with time zone' })
	expires_at: Date;

	@Column()
	status: string;

	@ManyToOne(() => Project, (project) => project.metricHashes, {
		onDelete: 'CASCADE',
	})
	project: Project;
}
