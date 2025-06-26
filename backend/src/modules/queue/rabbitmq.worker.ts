import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from 'src/common/entities/metric.entity';
import { Project } from 'src/common/entities/project.entity';
import { Repository } from 'typeorm';
import { MetricMessage } from '../metric/metric.service';
import { CreateProjectDto } from '../project/dto/create-project.dto';
import { IndentDistribution } from 'src/common/entities/indent-distribution.entity';
import { IndentationFile } from 'src/common/entities/identation-file.entity';
import { IndentationAnalysis } from 'src/common/entities/identation-analysis.entity';
import { Dependency } from 'src/common/entities/dependency.entity';
import { DeduplicationService } from '../deduplication/deduplication.service';

@Controller()
export class RabbitMQWorker {
	constructor(
		@InjectRepository(Metric)
		private metricRepository: Repository<Metric>,
		@InjectRepository(Project)
		private projectRepository: Repository<Project>,
		private readonly deduplicationService: DeduplicationService,
	) {}

	@MessagePattern('metrics_queue')
	async handleMetricMessage(message: MetricMessage) {
		const { projectId, metricData, deduplicationHash } = message;
		const { dependencies } = metricData;

		const queryRunner = this.metricRepository.manager.connection.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		let savedMetric: Metric;

		try {
			const metric = queryRunner.manager.create(Metric, {
				project_id: projectId,
				recorded_at: metricData.recorded_at || new Date(),
				lines: metricData.lines,
				functions: metricData.functions,
				classes: metricData.classes,
				comments: metricData.comments,
				comment_percentage: metricData.comment_percentage,
			});
			savedMetric = await queryRunner.manager.save(metric);

			const dependency = queryRunner.manager.create(Dependency, {
				metric_id: savedMetric.id,
				dependencies: dependencies.dependencies,
				native_modules: dependencies.native_modules,
				total_dependencies: Number(dependencies.total_dependencies),
			});
			await queryRunner.manager.save(dependency);

			if (metricData.indentation) {
				const analysis = queryRunner.manager.create(IndentationAnalysis, {
					directory: metricData.indentation.directory,
					metric_id: savedMetric.id,
				});
				const savedAnalysis = await queryRunner.manager.save(analysis);

				for (const file of metricData.indentation.files || []) {
					const indentationFile = queryRunner.manager.create(IndentationFile, {
						filename: file.filename,
						path: file.path,
						indentation_analysis_id: savedAnalysis.id,
						max_indent_level: file.stats.maxIndentLevel,
						average_indent_level: file.stats.averageIndentLevel,
						uses_spaces: file.stats.usesSpaces,
						uses_tabs: file.stats.usesTabs,
						mixed_indentation: file.stats.mixedIndentation,
					});
					const savedFile = await queryRunner.manager.save(indentationFile);

					for (const dist of file.stats.indentDistribution || []) {
						const indentDist = queryRunner.manager.create(IndentDistribution, {
							level: dist.level,
							count: dist.count,
							indentation_file_id: savedFile.id,
						});
						await queryRunner.manager.save(indentDist);
					}
				}
			}

			await queryRunner.commitTransaction();
			console.log(`✅ Métrica salva com sucesso: ${savedMetric.id}`);

		} catch (error) {

			if (queryRunner.isTransactionActive) {
				await queryRunner.rollbackTransaction();
			}
			console.error(`❌ Erro ao salvar métrica: ${error.message}`);
			return { success: false, error: error.message };
		} finally {

			await queryRunner.release();
		}

		let hashStored = false;
		if (deduplicationHash) {
			try {
				console.log('💾 Salvando hash de deduplicação...');
				await this.deduplicationService.storeHash(deduplicationHash, projectId);
				hashStored = true;
				console.log(`✅ Hash salvo com sucesso: ${deduplicationHash}`);
			} catch (hashError) {
				console.error(`❌ Erro ao salvar hash (métrica já foi salva): ${hashError.message}`);
			}
		}

		return { 
			success: true, 
			metricId: savedMetric.id,
			hashStored
		};
	}

	@MessagePattern('projects_queue')
	async handleProjectMessage(message: CreateProjectDto) {
		Logger.log(
			`Received message on projects_queue: ${JSON.stringify(message)}`,
			'RabbitMQWorker',
		);

		try {
			const project = this.projectRepository.create({
				...message,
				last_metric_at: new Date(),
			});

			await this.projectRepository.save(project);

			Logger.log(
				`Project created with ID ${project.id}`,
				'RabbitMQWorker',
			);
		} catch (error) {
			Logger.error(
				`Error creating project: ${error.message}`,
				error.stack,
				'RabbitMQWorker',
			);
		}
	}
}
