import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { RabbitMQService } from '../queue/rabbitmq.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/common/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
	constructor(
		private readonly rabbitMQService: RabbitMQService,
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
	) {}

	public getOne(uuid: string) {
		return this.projectRepository.findOne({
			where: { id: uuid },
			relations: [
			'metrics',
            'metrics.dependencies',
            'metrics.indentationAnalysis',
            'metrics.indentationAnalysis.files',
            'metrics.indentationAnalysis.files.distributions',
            'metricHashes',
			],
		});
	}

	public getAll() {
		return this.projectRepository.find({
			relations: [
				'metrics',
				'metrics.dependencies',
				'metrics.indentationAnalysis',
				'metrics.indentationAnalysis.files',
				'metrics.indentationAnalysis.files.distributions',
				'metricHashes'
			],
		});
	}

	public async create(createProjectDto: CreateProjectDto) {
		await this.rabbitMQService.sendMessage(
			'projects_queue',
			createProjectDto,
		);

		return {
			status: 'Project creation message sent to RabbitMQ',
			queue: 'projects_queue',
		};
	}
}
