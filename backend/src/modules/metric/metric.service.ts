import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { Repository } from 'typeorm';
import { Metric } from 'src/common/entities/metric.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetricService {
	constructor(
		@InjectRepository(Metric)
		private readonly metricRepository: Repository<Metric>,
	) {}

	public async create(metricDto: CreateMetricDto, projectId: string) {
		const metric = this.metricRepository.create({
			...metricDto,
			comment_percentage: metricDto.comment_percentage?.toString(),
			project_id: projectId,
		});

		return this.metricRepository.save(metric);
	}
}
