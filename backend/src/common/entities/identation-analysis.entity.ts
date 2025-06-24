import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Metric } from './metric.entity';
import { IndentationFile } from './identation-file.entity';

@Entity('indentation_analysis')
export class IndentationAnalysis extends BaseEntity {
    @Column('uuid')
    metric_id: string;

    @Column()
    directory: string;

    @ManyToOne(() => Metric, (metric) => metric.indentationAnalysis, {
        onDelete: 'CASCADE',
    })
    metric: Metric;

    @OneToMany(() => IndentationFile, (file) => file.indentation_analysis)
    files: IndentationFile[];
}