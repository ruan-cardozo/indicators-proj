import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Metric } from "src/common/entities/metric.entity";
import { Project } from "src/common/entities/project.entity";
import { Dependency } from "src/common/entities/dependency.entity";
import { IndentationAnalysis } from "src/common/entities/identation-analysis.entity";
import { Repository } from "typeorm";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class DatabasePopulatorService {

	private readonly logger = new Logger(DatabasePopulatorService.name);

	constructor(
		@InjectRepository(Project)
		private readonly projectRepository: Repository<Project>,
		@InjectRepository(Metric)
		private readonly metricRepository: Repository<Metric>,
		@InjectRepository(Dependency)
		private readonly dependencyRepository: Repository<Dependency>,
		@InjectRepository(IndentationAnalysis)
		private readonly indentationAnalysisRepository: Repository<IndentationAnalysis>
	) { }

	public async populateDatabase() {

		this.logger.log("Iniciando população do banco de dados...");

		try {

			await this.clearDatabase();

			const seedData = this.loadSeedData();

			const projects = await this.createProjects(seedData.projects);

			await this.createMetricsByProject(projects, seedData.projects);

			this.logger.log("População do banco de dados concluída com sucesso!");
		} catch (error) {
			this.logger.error("Erro ao popular o banco de dados", error);
			throw error;
		}
	}

	private loadSeedData() {
		try {

			const jsonPath = path.join(process.cwd(), 'database', 'database-populator', 'database-populator.json');

			this.logger.log(`Tentando carregar arquivo: ${jsonPath}`);

			const jsonData = fs.readFileSync(jsonPath, 'utf8');
			const parsedData = JSON.parse(jsonData);

			this.logger.log(`Arquivo carregado com sucesso! Projetos encontrados: ${parsedData?.projects?.length || 0}`);

			return parsedData;

		} catch (error) {

			this.logger.error('Erro ao carregar arquivo JSON:', error);
			throw error;
		}
	}

	private async createProjects(projectsData: any[]) {

		this.logger.log(`Criando ${projectsData.length} projetos...`);

		const projects: Project[] = [];

		for (const projectData of projectsData) {

			const project = this.projectRepository.create({
				name: projectData.name,
				description: projectData.description,
				repository_url: projectData.repository_url,
				is_active: projectData.is_active,
				metadata: projectData.metadata,
				last_metric_at: new Date()
			});

			const savedProject = await this.projectRepository.save(project);

			projects.push(savedProject);

			this.logger.log(`Projeto ${savedProject.name} criado com sucesso (ID: ${savedProject.id})`);
		}

		return projects;
	}

	private async createMetricsByProject(projects: Project[], projectsData: any[]) {

		this.logger.log('Criando métricas para os projetos...');

		for (let i = 0; i < projects.length; i++) {

			const project = projects[i];
			const projectData = projectsData[i];

			if (!projectData.metrics || projectData.metrics.length === 0) {

				this.logger.warn(`Projeto ${project.name} não possui métricas no JSON`);

				continue;
			}

			let metricsCreated = 0;

			for (const metricData of projectData.metrics) {

				const metric = this.metricRepository.create({
					project_id: project.id,
					recorded_at: new Date(metricData.recorded_at),
					lines: metricData.lines,
					functions: metricData.functions,
					classes: metricData.classes,
					comments: metricData.comments,
					comment_percentage: metricData.comment_percentage,
					created_at: new Date(),
					updated_at: new Date()
				});

				const savedMetric = await this.metricRepository.save(metric);

				if (metricData.dependencies) {

					await this.createDependencyForMetric(savedMetric.id, metricData.dependencies);
				}

				if (metricData.indentation) {

					await this.createIndentationAnalysisForMetric(savedMetric.id, metricData.indentation);
				}

				metricsCreated++;
			}

			this.logger.log(`${metricsCreated} métricas criadas para o projeto ${project.name}`);
		}
	}

	private async createDependencyForMetric(metricId: string, dependencyData: any) {
		try {
			const dependency = this.dependencyRepository.create({
				metric_id: metricId,
				dependencies: dependencyData.dependencies || [],
				native_modules: dependencyData.native_modules || [],
				total_dependencies: dependencyData.total_dependencies || 0,
				created_at: new Date(),
				updated_at: new Date()
			});

			await this.dependencyRepository.save(dependency);
		} catch (error) {
			this.logger.error(`Erro ao criar dependência para métrica ${metricId}:`, error);
		}
	}

	private async createIndentationAnalysisForMetric(metricId: string, indentationData: any) {

		try {
			const indentationAnalysis = this.indentationAnalysisRepository.create({
				metric_id: metricId,
				directory: indentationData.directory || '/src',
				created_at: new Date(),
				updated_at: new Date()
			});

			await this.indentationAnalysisRepository.save(indentationAnalysis);

		} catch (error) {

			this.logger.error(`Erro ao criar análise de indentação para métrica ${metricId}:`, error);
		}
	}

	private async clearDatabase() {
		this.logger.log("Limpando o banco de dados...");

		try {

			await this.dependencyRepository.createQueryBuilder().delete().execute();
			await this.indentationAnalysisRepository.createQueryBuilder().delete().execute();
			await this.metricRepository.createQueryBuilder().delete().execute();
			await this.projectRepository.createQueryBuilder().delete().execute();

			this.logger.log("Banco de dados limpo com sucesso.");
		} catch (error) {
			this.logger.error("Erro ao limpar banco de dados:", error);
			throw error;
		}
	}
}