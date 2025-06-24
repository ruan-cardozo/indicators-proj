import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Dependency } from './dependency.entity';

@Entity('dependency_item')
export class DependencyItem extends BaseEntity {
    @Column('uuid')
    dependency_id: string;

    @Column()
    name: string;

    @Column()
    category: string;

    @ManyToOne(() => Dependency, (dependency) => dependency.items, {
        onDelete: 'CASCADE',
    })
    dependency: Dependency;
}