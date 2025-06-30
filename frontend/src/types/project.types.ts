export interface DependencyDto {
  dependencies: string[];
  native_modules: string[];
  total_dependencies: number;
}

export interface IndentDistributionDto {
  level: number;
  count: number;
}

export interface IndentationFileStatsDto {
  maxIndentLevel: number;
  averageIndentLevel: number;
  indentDistribution: IndentDistributionDto[];
  usesSpaces: boolean;
  usesTabs: boolean;
  mixedIndentation: boolean;
}

export interface IndentationFileDto {
  filename: string;
  path: string;
  stats: IndentationFileStatsDto[];
}

export interface IndentationDto {
  directory: string;
  files: IndentationFileDto[];
}

export interface MetricDto {
  public_methods: number;
  private_methods: number;
  average_function_size: string;
  recorded_at: string;
  lines: number;
  functions: number;
  classes: number;
  comments: number;
  comment_percentage: string;
  dependencies: DependencyDto[];
  indentationAnalysis: IndentationDto[];
}

export interface ProjectMetadata {
  language: string;
  framework: string;
  team: string;
  tags: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  repository_url: string;
  is_active: boolean;
  metadata: ProjectMetadata;
  metrics: MetricDto[];
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}