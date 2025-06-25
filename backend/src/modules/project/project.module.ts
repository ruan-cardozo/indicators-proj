import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from 'src/common/entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '../queue/rabbitmq.module';

@Module({
	imports: [RabbitMQModule, TypeOrmModule.forFeature([Project])],
	controllers: [ProjectController],
	providers: [ProjectService],
})
export class ProjectModule {}
