import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { ApiTags } from '@nestjs/swagger';
import { MetricService } from './metric.service';
import { DeduplicationInterceptor } from '../deduplication/deduplication.interceptor';

export interface RequestWithDeduplication extends Request {
  deduplicationHash?: string;
  processedMetricData?: CreateMetricDto;
}

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
	@HttpCode(HttpStatus.CREATED)
	@UseInterceptors(DeduplicationInterceptor)
	public create(
		@Param('projectId') projectId: string,
		@Body() metricDto: CreateMetricDto,
		@Req() req: RequestWithDeduplication
	) {
		return this.metricService.create(metricDto, projectId, req);
	}
}
