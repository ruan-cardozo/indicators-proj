import { Module } from '@nestjs/common';
import { MetricsController } from './metric.controller';
import { MetricService } from './metric.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from 'src/common/entities/metric.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Metric])],
	controllers: [MetricsController],
	providers: [MetricService],
})
export class MetricModule {}
