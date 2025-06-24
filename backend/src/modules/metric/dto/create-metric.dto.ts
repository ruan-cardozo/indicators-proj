import { IsInt, IsNumber, Min, Max, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMetricDto {
	@ApiProperty({
		description: 'Date and time when the metric was recorded',
		example: '2024-01-15T10:30:00Z',
	})
	@IsDateString({}, { message: 'recorded_at must be a valid date string' })
	recorded_at: string;

	@ApiProperty({
		description: 'Number of lines of code',
		example: 1500,
		minimum: 0,
	})
	@IsInt({ message: 'lines must be an integer' })
	@Min(0, { message: 'lines cannot be negative' })
	@Type(() => Number)
	lines: number;

	@ApiProperty({
		description: 'Number of functions',
		example: 25,
		minimum: 0,
	})
	@IsInt({ message: 'functions must be an integer' })
	@Min(0, { message: 'functions cannot be negative' })
	@Type(() => Number)
	functions: number;

	@ApiProperty({
		description: 'Number of classes',
		example: 10,
		minimum: 0,
	})
	@IsInt({ message: 'classes must be an integer' })
	@Min(0, { message: 'classes cannot be negative' })
	@Type(() => Number)
	classes: number;

	@ApiProperty({
		description: 'Number of comments',
		example: 150,
		minimum: 0,
	})
	@IsInt({ message: 'comments must be an integer' })
	@Min(0, { message: 'comments cannot be negative' })
	@Type(() => Number)
	comments: number;

	@ApiProperty({
		description: 'Percentage of comments in the code',
		example: 15.5,
		minimum: 0,
		maximum: 100,
	})
	@IsNumber({}, { message: 'comment_percentage must be a number' })
	@Min(0, { message: 'comment_percentage cannot be negative' })
	@Max(100, { message: 'comment_percentage cannot exceed 100' })
	@Type(() => Number)
	@Transform(({ value }) => Math.round(value * 100) / 100)
	comment_percentage: number;
}
