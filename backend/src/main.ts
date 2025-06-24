import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'debug'],
		cors: false,
	});

	const configService = app.get(ConfigService);

	app.setGlobalPrefix('api');
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: '1',
	});
	app.enableCors({
		origin: configService.get<string>('CORS_ORIGIN', '*').split(','),
		credentials: true,
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
			validationError: {
				target: false,
				value: false,
			},
		}),
	);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(
		new TransformInterceptor(),
		new LoggingInterceptor(),
	);
	app.enableShutdownHooks();

	const swaggerConfig = new DocumentBuilder()
        .setTitle('Indicators API')
        .setDescription('API documentation for the Indicators project')
        .setVersion('1.0')
        .build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

	const port = configService.get<number>('PORT', 3001);
	const environment = configService.get<string>('NODE_ENV', 'development');

	const appUrl = `http://localhost:${port}`;

	Logger.log(`
		🚀 Application is running on: ${appUrl}
		🌍 Environment: ${environment}
		📝 API Prefix: /api
		🔖 API Version: v1
		📚 Swagger Docs: ${appUrl}/api/docs
	`);

	await app.listen(port ?? 3001);
}

process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
	process.exit(1);
});

bootstrap();
