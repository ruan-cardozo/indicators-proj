import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQWorker } from './rabbitmq.worker';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from 'src/common/entities/metric.entity';
import { Project } from 'src/common/entities/project.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Metric, Project]),
		ClientsModule.register([
			{
				name: 'RABBITMQ_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://admin:admin@localhost:5672'],
					queue: 'metrics_queue',
					queueOptions: {
						durable: true,
					},
				},
			},
		]),
	],
	controllers: [RabbitMQWorker],
	providers: [RabbitMQService, RabbitMQWorker],
	exports: [RabbitMQService],
})
export class RabbitMQModule {}
