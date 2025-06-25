import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	private readonly logger = new Logger(HttpExceptionFilter.name);

	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		let status = HttpStatus.INTERNAL_SERVER_ERROR;
		let message = 'Internal server error';
		let error = 'Internal Server Error';

		if (exception instanceof HttpException) {
			status = exception.getStatus();
			const errorResponse = exception.getResponse();

			if (typeof errorResponse === 'string') {
				message = errorResponse;
			} else if (
				typeof errorResponse === 'object' &&
				errorResponse !== null
			) {
				message = (errorResponse as any).message || message;
				error = (errorResponse as any).error || error;
			}
		} else if (exception instanceof Error) {
			message = exception.message;
			error = exception.name;
		}

		this.logger.error(
			`${request.method} ${request.url} - ${status} - ${message}`,
			exception instanceof Error ? exception.stack : undefined,
		);

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			error,
			message,
			...(process.env.NODE_ENV === 'development' && {
				stack: exception instanceof Error ? exception.stack : undefined,
			}),
		});
	}
}
