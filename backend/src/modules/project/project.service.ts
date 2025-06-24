import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/common/entities/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

	constructor( 
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>) { }

	public async create(createProjectDto: CreateProjectDto) {

		const project = this.projectRepository.create(createProjectDto);

		return this.projectRepository.save(project);
	}
}
