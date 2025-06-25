import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
	Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
	private readonly logger = new Logger('HTTP');

	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const request = context.switchToHttp().getRequest();
		const { method, url, body, headers } = request;
		const startTime = Date.now();

		this.logger.log(
			`➡️  ${method} ${url} - ${JSON.stringify({
				userAgent: headers['user-agent'],
				ip: request.ip,
				...(method !== 'GET' && { body: JSON.stringify(body) }),
			})}`,
		);

		return next.handle().pipe(
			tap({
				next: () => {
					const response = context.switchToHttp().getResponse();
					const elapsedTime = Date.now() - startTime;

					this.logger.log(
						`⬅️  ${method} ${url} - ${response.statusCode} - ${elapsedTime}ms`,
					);
				},
				error: (error) => {
					const elapsedTime = Date.now() - startTime;

					this.logger.error(
						`❌ ${method} ${url} - ${error.status || 500} - ${elapsedTime}ms - ${error.message}`,
					);
				},
			}),
		);
	}
}
