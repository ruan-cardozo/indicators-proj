import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Metric } from './metric.entity';
import { DependencyItem } from './dependency-item.entity';

@Entity('dependency')
export class Dependency extends BaseEntity {
    @Column('uuid')
    metric_id: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column({ type: 'integer' })
    total_count: number;

    @ManyToOne(() => Metric, (metric) => metric.dependencies, {
        onDelete: 'CASCADE',
    })
    metric: Metric;

    @OneToMany(() => DependencyItem, (item) => item.dependency)
    items: DependencyItem[];
}