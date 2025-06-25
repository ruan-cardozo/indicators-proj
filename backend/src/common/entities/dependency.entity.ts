import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Metric } from './metric.entity';
import { BaseEntity } from './base.entity';

@Entity('dependency')
export class Dependency extends BaseEntity {
	@Column({ type: 'uuid' })
	metric_id: string;

	@ManyToOne(() => Metric, (metric) => metric.dependencies, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'metric_id' })
	metric: Metric;

	@Column({ nullable: true })
	name: string;

	@Column({ type: 'text', array: true, nullable: true })
	dependencies: string[];

	@Column({ type: 'text', array: true, nullable: true })
	native_modules: string[];

	@Column({ type: 'int', nullable: true })
	total_dependencies: number;
}
