import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('project')
export class ProjectController {
	constructor(private readonly projectService: ProjectService) {}

	@Get(':id')
	public getOne(@Param('id') id: string) {
		return this.projectService.getOne(id);
	}

	@Get()
	public getAll() {
		return this.projectService.getAll();
	}

	@Post()
	public create(@Body() createProjectDto: CreateProjectDto) {
		return this.projectService.create(createProjectDto);
	}
}
