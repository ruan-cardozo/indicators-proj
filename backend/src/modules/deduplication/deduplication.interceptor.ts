import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeduplicationService } from './deduplication.service';
import { CreateMetricDto } from '../metric/dto/create-metric.dto';

@Injectable()
export class DeduplicationInterceptor implements NestInterceptor {

  constructor(private readonly deduplicationService: DeduplicationService) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const metricData: CreateMetricDto = request.body;
    const projectId: string = request.params.projectId;

    Logger.log(`Verificando duplicação para projeto: ${projectId}`, );
    Logger.log(`Dados recebidos:`, {
      recorded_at: metricData.recorded_at,
      lines: metricData.lines,
      functions: metricData.functions,
      classes: metricData.classes,
      comments: metricData.comments,
      hasDependencies: !!metricData.dependencies,
      hasIndentation: !!metricData.indentation,
    });

    const hash = this.deduplicationService.generateMetricHashFromDto(
      projectId,
      metricData
    );
    
    Logger.log(`Hash gerado: ${hash}`);

    const isDuplicate = await this.deduplicationService.isDuplicate(hash);
     Logger.log(`É duplicata? ${isDuplicate}`, );

    if (isDuplicate) {
        Logger.log('Rejeitando métricas duplicadas');
        throw new ConflictException({
          message: 'Métricas duplicadas detectadas',
          hash,
          projectId,
          timestamp: new Date().toISOString(),
          action: 'rejected',
          details: {
            lines: metricData.lines,
            functions: metricData.functions,
            classes: metricData.classes,
            comments: metricData.comments,
          }
        });
    }

    Logger.log('Métricas aceitas, continuando processamento');

    request.deduplicationHash = hash;
    request.processedMetricData = metricData;

    return next.handle();
  }
}