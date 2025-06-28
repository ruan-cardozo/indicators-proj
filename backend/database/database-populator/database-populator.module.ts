import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabasePopulatorService } from './database-populator.service';
import { Project } from '../../src/common/entities/project.entity';
import { Metric } from '../../src/common/entities/metric.entity';
import { Dependency } from '../../src/common/entities/dependency.entity';
import { IndentationAnalysis } from '../../src/common/entities/identation-analysis.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, Metric, Dependency, IndentationAnalysis])
    ],
    providers: [DatabasePopulatorService],
    exports: [DatabasePopulatorService]
})
export class DatabasePopulatorModule { }