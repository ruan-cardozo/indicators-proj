import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';
import { MetricHash } from '../../common/entities/metric-hash.entity';
import { CreateMetricDto, DependencyDto, IdentationDto, IndentationFileDto } from '../metric/dto/create-metric.dto';

export interface MetricDeduplicationData {
  projectId: string;
  timestamp: Date;
  lines: number;
  functions: number;
  classes: number;
  comments: number;
  dependencies: DependencyDto;
  indentation: IdentationDto;
}

@Injectable()
export class DeduplicationService {
  constructor(
    @InjectRepository(MetricHash)
    private readonly metricHashRepository: Repository<MetricHash>,
  ) {}

  public generateMetricHashFromDto(
    projectId: string,
    metricDto: CreateMetricDto
  ): string {
    const normalizedTimestamp = Math.floor(
      new Date(metricDto.recorded_at).getTime() / 60000
    ) * 60000;

    const dependencySummary = this.calculateDependencySummary(metricDto.dependencies);

    const indentationSummary = this.calculateIndentationSummaryFromDto(metricDto.indentation);

    const hashInput = [
      projectId,
      normalizedTimestamp.toString(),
      metricDto.lines?.toString() || '0',
      metricDto.functions?.toString() || '0',
      metricDto.classes?.toString() || '0',
      metricDto.comments?.toString() || '0',
      dependencySummary.totalCount.toString(),
      dependencySummary.dependenciesHash,
      indentationSummary.totalFiles.toString(),
      indentationSummary.averageQuality.toString(),
    ].join('|');

    return createHash('sha256').update(hashInput).digest('hex');
  }

  public generateMetricHash(data: MetricDeduplicationData): string {
    const normalizedTimestamp = Math.floor(
      new Date(data.timestamp).getTime() / 60000
    ) * 60000;

    const dependencySummary = this.calculateDependencySummary(data.dependencies);
    const indentationSummary = this.calculateIndentationSummaryFromDto(data.indentation);

    const hashInput = [
      data.projectId,
      normalizedTimestamp.toString(),
      data.lines?.toString() || '0',
      data.functions?.toString() || '0',
      data.classes?.toString() || '0',
      data.comments?.toString() || '0',
      dependencySummary.totalCount.toString(),
      dependencySummary.dependenciesHash,
      indentationSummary.totalFiles.toString(),
      indentationSummary.averageQuality.toString(),
    ].join('|');

    return createHash('sha256').update(hashInput).digest('hex');
  }

  private calculateDependencySummary(dependencies: DependencyDto) {
    if (!dependencies) {
      return { totalCount: 0, dependenciesHash: '' };
    }

    const allDeps = [
      ...(dependencies.dependencies || []),
      ...(dependencies.native_modules || [])
    ].sort();

    const totalCount = dependencies.total_dependencies || allDeps.length;
    const dependenciesHash = allDeps.join(',');

    return { totalCount, dependenciesHash };
  }

  private calculateIndentationSummaryFromDto(indentation: IdentationDto) {
    if (!indentation || !indentation.files || indentation.files.length === 0) {
      return { totalFiles: 0, averageQuality: 0 };
    }

    let totalFiles = 0;
    let totalQuality = 0;

    indentation.files.forEach(file => {
      totalFiles++;
      const qualityScore = this.calculateFileQualityScoreFromDto(file);
      totalQuality += qualityScore;
    });

    if (totalFiles === 0) {
      return { totalFiles: 0, averageQuality: 0 };
    }

    const averageQuality = Math.round((totalQuality / totalFiles) * 100) / 100;
    return { totalFiles, averageQuality };
  }

  private calculateFileQualityScoreFromDto(file: IndentationFileDto): number {
    let score = 100;

    const stats = file.stats;

    if (stats.mixedIndentation) {
      score -= 40;
    }

    if (stats.usesSpaces && stats.usesTabs) {
      score -= 30;
    }

    if (stats.maxIndentLevel > 6) {
      score -= (stats.maxIndentLevel - 6) * 5;
    }

    if (stats.averageIndentLevel > 4) {
      score -= (stats.averageIndentLevel - 4) * 3;
    }

    return Math.max(0, score);
  }

  async storeHash(hash: string, projectId: string): Promise<MetricHash> {
    const metricHash = this.metricHashRepository.create({
      hash_value: hash,
      project_id: projectId,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 dias de validade
    });
    return this.metricHashRepository.save(metricHash);
  }

  async isDuplicate(hash: string): Promise<boolean> {
    const existing = await this.metricHashRepository.findOne({
      where: { hash_value: hash },
    });
    return !!existing;
  }

  async cleanOldHashes(daysOld: number = 30): Promise<number> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysOld);

    const result = await this.metricHashRepository
      .createQueryBuilder()
      .delete()
      .where('created_at < :cutoffDate', { cutoffDate })
      .execute();

    return result.affected || 0;
  }
}