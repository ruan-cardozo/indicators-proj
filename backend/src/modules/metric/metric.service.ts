import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { RabbitMQService } from '../queue/rabbitmq.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Metric } from 'src/common/entities/metric.entity';
import { RequestWithDeduplication } from './metric.controller';

export type MetricMessage = {
	projectId: string;
	metricData: CreateMetricDto;
	deduplicationHash?: string;
};

@Injectable()
export class MetricService {
	constructor(
		private readonly rabbitMQService: RabbitMQService,
		@InjectRepository(Metric)
		private readonly repository: Repository<Metric>,
	) {}

	public getAll() {
		return this.repository.find({
			loadRelationIds: true,
		});
	}

	public getOne(uuid: string) {
		return this.repository.findOne({
			where: { id: uuid },
			loadRelationIds: true,
		});
	}

	public async create(metricDto: CreateMetricDto, projectId: string, req: RequestWithDeduplication) {

		const message = {
			projectId,
			metricData: {
				...metricDto,
			},
			deduplicationHash: req.deduplicationHash,
		} as MetricMessage;

		await this.rabbitMQService.sendMessage('metrics_queue', message);

		return { status: 'Message sent to RabbitMQ', queue: 'metrics_queue' };
	}
}
