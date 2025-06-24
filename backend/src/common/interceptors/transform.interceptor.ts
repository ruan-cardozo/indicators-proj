import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
	statusCode: number;
	message: string;
	data: T;
	timestamp: string;
	path: string;
}

@Injectable()
export class TransformInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> {
		const request = context.switchToHttp().getRequest();
		const response = context.switchToHttp().getResponse();

		return next.handle().pipe(
			map((data) => ({
				statusCode: response.statusCode,
				message: data?.message || 'Success',
				data: data?.data || data,
				timestamp: new Date().toISOString(),
				path: request.url,
			})),
		);
	}
}
