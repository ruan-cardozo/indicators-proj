import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IndentationFile } from './identation-file.entity';

@Entity('indent_distribution')
export class IndentDistribution extends BaseEntity {
    @Column('uuid')
    indentation_file_id: string;

    @Column({ type: 'integer' })
    level: number;

    @Column({ type: 'integer' })
    count: number;

    @ManyToOne(() => IndentationFile, (file) => file.distributions, {
        onDelete: 'CASCADE',
    })
    indentation_file: IndentationFile;
}