import {
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@CreateDateColumn({ type: 'timestamp with time zone' })
	created_at: Date;

	@UpdateDateColumn({ type: 'timestamp with time zone' })
	updated_at: Date;
}
