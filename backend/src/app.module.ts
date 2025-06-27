import { Logger, Module } from '@nestjs/common';
import { MetricModule } from './modules/metric/metric.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './modules/project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import AppDataSource from '../database/data-source';
import { CleanupModule } from './modules/cleanup/cleanup.module';
import { RabbitMQModule } from './modules/queue/rabbitmq.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				...AppDataSource.options,
			}),
			dataSourceFactory: async (options) => {
				const dataSource = await new DataSource(options).initialize();

				Logger.log(
					`Database connection established successfully with ${dataSource.options.database}`,
				);

				return dataSource;
			},
		}),
		MetricModule,
		ProjectModule,
		CleanupModule,
		RabbitMQModule
	],
})
export class AppModule {}
