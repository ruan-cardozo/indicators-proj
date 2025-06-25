import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { IndentationFile } from './identation-file.entity';

@Entity('indent_distribution')
export class IndentDistribution extends BaseEntity {
	@Column({ name: 'indentation_file_id', type: 'uuid' })
	indentation_file_id: string;

	@ManyToOne(() => IndentationFile, (file) => file.distributions, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'indentation_file_id' })
	indentation_file: IndentationFile;

	@Column({ type: 'int' })
	level: number;

	@Column({ type: 'int' })
	count: number;
}
