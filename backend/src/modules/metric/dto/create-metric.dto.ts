import {
	IsInt,
	IsNumber,
	Min,
	IsDateString,
	IsString,
	IsArray,
	ValidateNested,
	IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DependencyDto {
	@ApiProperty({ type: [String], example: ['express', 'lodash'] })
	@IsArray()
	@IsString({ each: true })
	dependencies: string[];

	@ApiProperty({ type: [String], example: ['fs', 'path'] })
	@IsArray()
	@IsString({ each: true })
	native_modules: string[];

	@ApiProperty({ example: 10 })
	@IsInt()
	@Min(0)
	total_dependencies: number;
}

export class IndentDistributionDto {
	@ApiProperty({ example: 2 })
	@IsInt()
	@Min(0)
	level: number;

	@ApiProperty({ example: 15 })
	@IsInt()
	@Min(0)
	count: number;
}

export class IndentationFileStatsDto {
	@ApiProperty({ example: 8 })
	@IsInt()
	@Min(0)
	maxIndentLevel: number;

	@ApiProperty({ example: 2.5 })
	@IsNumber()
	averageIndentLevel: number;

	@ApiProperty({ type: [IndentDistributionDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => IndentDistributionDto)
	indentDistribution: IndentDistributionDto[];

	@ApiProperty()
	@IsBoolean()
	usesSpaces: boolean;

	@ApiProperty()
	@IsBoolean()
	usesTabs: boolean;

	@ApiProperty()
	@IsBoolean()
	mixedIndentation: boolean;
}

export class IndentationFileDto {
	@ApiProperty({ example: 'index.js' })
	@IsString()
	filename: string;

	@ApiProperty({ example: '/src/index.js' })
	@IsString()
	path: string;

	@ApiProperty({ type: IndentationFileStatsDto })
	@ValidateNested()
	@Type(() => IndentationFileStatsDto)
	stats: IndentationFileStatsDto;
}

export class IdentationDto {
	@ApiProperty({ example: '/src' })
	@IsString()
	directory: string;

	@ApiProperty({ type: [IndentationFileDto] })
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => IndentationFileDto)
	files: IndentationFileDto[];
}

export class CreateMetricDto {
	@ApiProperty({
		description: 'Date and time when the metric was recorded',
		example: '2024-01-15T10:30:00Z',
	})
	@IsDateString()
	recorded_at: string;

	@ApiProperty({ example: 1500 })
	@IsInt()
	@Min(0)
	lines: number;

	@ApiProperty({ example: 25 })
	@IsInt()
	@Min(0)
	functions: number;

	@ApiProperty({ example: 10 })
	@IsInt()
	@Min(0)
	classes: number;

	@ApiProperty({ example: 150 })
	@IsInt()
	@Min(0)
	comments: number;

	@ApiProperty({ example: '15.5%' })
	@IsString()
	@Transform(({ value }) => {
		if (typeof value === 'string' && /^\d+(\.\d+)?%$/.test(value)) {
			return value;
		}
		throw new Error(
			'comment_percentage must be a string in the format "number%"',
		);
	})
	comment_percentage: string;

	@ApiProperty({ type: [DependencyDto] })
	@ValidateNested({ each: true })
	@Type(() => DependencyDto)
	dependencies: DependencyDto;

	@ApiProperty({ type: IdentationDto })
	@ValidateNested()
	@Type(() => IdentationDto)
	indentation: IdentationDto;
}
