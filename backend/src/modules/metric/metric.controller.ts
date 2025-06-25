import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { ApiTags } from '@nestjs/swagger';
import { MetricService } from './metric.service';

@ApiTags('Metrics')
@Controller('project/metric')
export class MetricsController {
	constructor(private readonly metricService: MetricService) {}

	@Get()
	public getAll() {
		return this.metricService.getAll();
	}

	@Get(':id')
	public getOne(@Param() uuid: string) {
		return this.metricService.getOne(uuid);
	}

	@Post(':projectId')
	public create(
		@Param('projectId') projectId: string,
		@Body() metricDto: CreateMetricDto,
	) {
		return this.metricService.create(metricDto, projectId);
	}
}
