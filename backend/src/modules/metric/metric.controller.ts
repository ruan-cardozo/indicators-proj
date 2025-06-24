import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { ApiTags } from '@nestjs/swagger';
import { MetricService } from './metric.service';

@ApiTags('Metrics')
@Controller('projects')
export class MetricsController {
	constructor(private readonly metricService: MetricService) {}

	@Post(':projectId/metrics')
	public create(
		@Param('projectId') projectId: string,
		@Body() metricDto: CreateMetricDto,
	) {
		return this.metricService.create(metricDto, projectId);
	}
}
