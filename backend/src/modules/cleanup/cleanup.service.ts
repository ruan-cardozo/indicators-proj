import { Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "src/common/entities/project.entity";
import { LessThan, Repository } from "typeorm";

export class CleanupService {

    private readonly logger = new Logger(CleanupService.name)

    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async cleanupProjects() {
        
        this.logger.log("Running daily cleanup of projects...");

        try {
            
            const date = new Date();
            date.setDate(date.getDate() - 7);

            this.logger.log(`Deleting project not updated since ${date.toISOString()}`);

            const inactiveProjects = await this.projectRepository.find({
                where: {
                    updated_at: LessThan(date)
                },
                select: ["id", "name", "updated_at"]
            });
            
            if (inactiveProjects.length === 0) {
                this.logger.log("No projects to delete.");
                return;
            }

            this.logger.log(`Found ${inactiveProjects.length} projects to delete.`);

            inactiveProjects.forEach(project => {
                this.logger.log(`Deleting project ${project.name} (ID: ${project.id}) last updated at ${project.updated_at.toISOString()}`);
            });

            const deleteResult = await this.projectRepository.delete({
                updated_at: LessThan(date)
            });

            this.logger.log(`Deleted ${deleteResult.affected} projects.`);

        } catch (error) {
            this.logger.error("Error during project cleanup", error);
        }
    }
}