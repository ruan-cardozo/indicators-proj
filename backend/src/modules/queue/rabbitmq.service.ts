import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

type GenericObject = Record<string, any>;

@Injectable()
export class RabbitMQService {
	constructor(
		@Inject('RABBITMQ_SERVICE') private readonly client: ClientProxy,
	) {}

	async sendMessage(queue: string, message: GenericObject): Promise<void> {
		await firstValueFrom(this.client.emit(queue, message));
	}
}
