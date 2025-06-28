import { Logger, Module } from '@nestjs/common';
import { MetricModule } from './modules/metric/metric.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './modules/project/project.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import AppDataSource from '../database/data-source';
import { CleanupModule } from './modules/cleanup/cleanup.module';
import { RabbitMQModule } from './modules/queue/rabbitmq.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DatabasePopulatorModule } from '../database/database-populator/database-populator.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		ScheduleModule.forRoot(),
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
		RabbitMQModule,
		DatabasePopulatorModule
	],
})
export class AppModule {}
