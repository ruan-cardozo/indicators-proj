import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
	IsBoolean,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	IsUrl,
	MaxLength,
	MinLength,
} from 'class-validator';

export class CreateProjectDto {
	@ApiProperty({
		description: 'Name of the project',
		example: 'My Awesome Project',
		minLength: 3,
		maxLength: 100,
	})
	@IsString()
	@IsNotEmpty({ message: 'Project name is required' })
	@MinLength(3, {
		message: 'Project name must be at least 3 characters long',
	})
	@MaxLength(100, { message: 'Project name must not exceed 100 characters' })
	@Transform(({ value }) => value?.trim())
	name: string;

	@ApiProperty({
		description: 'Description of the project',
		example: 'A project to track code metrics and quality over time',
		minLength: 10,
		maxLength: 500,
	})
	@IsString()
	@IsNotEmpty({ message: 'Project description is required' })
	@MinLength(10, {
		message: 'Description must be at least 10 characters long',
	})
	@MaxLength(500, { message: 'Description must not exceed 500 characters' })
	@Transform(({ value }) => value?.trim())
	description: string;

	@ApiProperty({
		description: 'Repository URL',
		example: 'https://github.com/username/project-name',
	})
	@IsUrl({}, { message: 'repository_url must be a valid URL' })
	@IsNotEmpty({ message: 'Repository URL is required' })
	repository_url: string;

	@ApiPropertyOptional({
		description: 'Whether the project is active',
		example: true,
		default: true,
	})
	@IsOptional()
	@IsBoolean({ message: 'is_active must be a boolean' })
	is_active?: boolean;

	@ApiPropertyOptional({
		description: 'Additional metadata for the project',
		example: {
			language: 'TypeScript',
			framework: 'NestJS',
			team: 'Backend Team',
			tags: ['api', 'metrics', 'monitoring'],
		},
	})
	@IsOptional()
	@IsObject({ message: 'metadata must be an object' })
	metadata?: Record<string, any>;
}
