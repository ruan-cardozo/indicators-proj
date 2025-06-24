import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Metric } from './metric.entity';
import { MetricHash } from './metric-hash.entity';

@Entity('project')
export class Project extends BaseEntity {
	@Column()
	name: string;

	@Column()
	description: string;

	@Column({ type: 'timestamp with time zone' })
	last_metric_at: Date;

	@Column({ default: true })
	is_active: boolean;

	@Column()
	repository_url: string;

	@Column({ type: 'jsonb', nullable: true })
	metadata: Record<string, any>;

	@OneToMany(() => Metric, (metric) => metric.project)
	metrics: Metric[];

	@OneToMany(() => MetricHash, (metricHash) => metricHash.project)
	metricHashes: MetricHash[];
}
