import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './project.entity';
import { BaseEntity } from './base.entity';

@Entity('metric_hash')
export class MetricHash extends BaseEntity {
	@Column({ name: 'project_id', type: 'uuid' })
	project_id: string;

	@Column({type: 'varchar', length: 64, unique: true})
	hash_value: string;

	@Column({ type: 'timestamp with time zone' })
	expires_at: Date;

	@ManyToOne(() => Project, (project) => project.metricHashes, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'project_id' })
	project: Project;
}
