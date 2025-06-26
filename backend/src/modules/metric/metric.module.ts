import { Module } from '@nestjs/common';
import { MetricsController } from './metric.controller';
import { MetricService } from './metric.service';
import { RabbitMQModule } from '../queue/rabbitmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from 'src/common/entities/metric.entity';
import { DeduplicationModule } from '../deduplication/deduplication.module';

@Module({
	imports: [RabbitMQModule, TypeOrmModule.forFeature([Metric]), DeduplicationModule],
	controllers: [MetricsController],
	providers: [MetricService],
})
export class MetricModule {}
