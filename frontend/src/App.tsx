import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Code2, GitBranch, MessageCircle, FileText, Calendar, TrendingUp, Package, Layers, Settings } from 'lucide-react';
import './index.css';

interface DependencyDto {
  dependencies: string[];
  native_modules: string[];
  total_dependencies: number;
}

interface IndentDistributionDto {
  level: number;
  count: number;
}

interface IndentationFileStatsDto {
  maxIndentLevel: number;
  averageIndentLevel: number;
  indentDistribution: IndentDistributionDto[];
  usesSpaces: boolean;
  usesTabs: boolean;
  mixedIndentation: boolean;
}

interface IndentationFileDto {
  filename: string;
  path: string;
  stats: IndentationFileStatsDto;
}

interface IdentationDto {
  directory: string;
  files: IndentationFileDto[];
}

interface MetricDto {
  recorded_at: string;
  lines: number;
  functions: number;
  classes: number;
  comments: number;
  comment_percentage: string;
  dependencies: DependencyDto;
  indentation: IdentationDto;
}

interface Project {
  id: string;
  name: string;
  description: string;
  repository_url: string;
  is_active: boolean;
  metadata: {
    language: string;
    framework: string;
    team: string;
    tags: string[];
  };
  metrics: MetricDto[];
}

const ProjectMetricsDashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'trends' | 'dependencies' | 'quality'>('overview');

  useEffect(() => {
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'NODE-NEWRELIC',
        description: 'Application Performance Monitoring (APM) agent for Node.js applications',
        repository_url: 'https://github.com/newrelic/node-newrelic',
        is_active: true,
        metadata: {
          language: 'TypeScript',
          framework: 'NestJS',
          team: 'Backend Team',
          tags: ['api', 'metrics', 'monitoring', 'apm']
        },
        metrics: [
          {
            recorded_at: '2024-06-20T10:00:00Z',
            lines: 15420,
            functions: 342,
            classes: 89,
            comments: 2180,
            comment_percentage: '14.1%',
            dependencies: {
              dependencies: ['express', 'lodash', 'axios', 'winston', 'joi'],
              native_modules: ['fs', 'path', 'crypto', 'os'],
              total_dependencies: 9
            },
            indentation: {
              directory: '/src',
              files: [
                {
                  filename: 'index.ts',
                  path: '/src/index.ts',
                  stats: {
                    maxIndentLevel: 6,
                    averageIndentLevel: 2.3,
                    indentDistribution: [
                      { level: 0, count: 45 },
                      { level: 1, count: 32 },
                      { level: 2, count: 28 },
                      { level: 3, count: 15 },
                      { level: 4, count: 8 },
                      { level: 5, count: 3 },
                      { level: 6, count: 1 }
                    ],
                    usesSpaces: true,
                    usesTabs: false,
                    mixedIndentation: false
                  }
                }
              ]
            }
          },
          {
            recorded_at: '2024-06-15T10:00:00Z',
            lines: 14890,
            functions: 328,
            classes: 85,
            comments: 2050,
            comment_percentage: '13.8%',
            dependencies: {
              dependencies: ['express', 'lodash', 'axios', 'winston'],
              native_modules: ['fs', 'path', 'crypto'],
              total_dependencies: 7
            },
            indentation: {
              directory: '/src',
              files: []
            }
          }
        ]
      },
      {
        id: '2',
        name: 'E-COMMERCE-API',
        description: 'RESTful API for e-commerce platform with advanced features',
        repository_url: 'https://github.com/company/ecommerce-api',
        is_active: true,
        metadata: {
          language: 'JavaScript',
          framework: 'Express',
          team: 'Backend Team',
          tags: ['api', 'ecommerce', 'rest', 'database']
        },
        metrics: [
          {
            recorded_at: '2024-06-20T10:00:00Z',
            lines: 8920,
            functions: 198,
            classes: 45,
            comments: 1245,
            comment_percentage: '14.0%',
            dependencies: {
              dependencies: ['express', 'mongoose', 'bcrypt', 'jsonwebtoken', 'cors'],
              native_modules: ['crypto', 'path'],
              total_dependencies: 7
            },
            indentation: {
              directory: '/src',
              files: []
            }
          }
        ]
      }
    ];
    
    setProjects(mockProjects);
    setSelectedProject(mockProjects[0]);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('pt-BR').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getLatestMetric = (project: Project) => {
    return project.metrics[0] || null;
  };

  const getTrendData = (project: Project) => {
    return project.metrics.map(metric => ({
      date: formatDate(metric.recorded_at),
      lines: metric.lines,
      functions: metric.functions,
      classes: metric.classes,
      comments: metric.comments
    })).reverse();
  };

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const MetricCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string; subtitle?: string }> = 
    ({ title, value, icon, color, subtitle }) => (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('-600', '-100')}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard de Métricas</h1>
                <p className="text-sm text-gray-600">Monitoramento de qualidade de código</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedProject?.id || ''}
                onChange={(e) => {
                  const project = projects.find(p => p.id === e.target.value);
                  setSelectedProject(project || null);
                }}
              >
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {selectedProject && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Project Info */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProject.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedProject.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {selectedProject.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.metadata.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <span><strong>Linguagem:</strong> {selectedProject.metadata.language}</span>
                  <span><strong>Framework:</strong> {selectedProject.metadata.framework}</span>
                  <span><strong>Team:</strong> {selectedProject.metadata.team}</span>
                </div>
              </div>
              <a 
                href={selectedProject.repository_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <GitBranch className="h-4 w-4" />
                <span>Ver Repositório</span>
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { key: 'overview', label: 'Visão Geral', icon: <FileText className="h-4 w-4" /> },
                  { key: 'trends', label: 'Tendências', icon: <TrendingUp className="h-4 w-4" /> },
                  { key: 'dependencies', label: 'Dependências', icon: <Package className="h-4 w-4" /> },
                  { key: 'quality', label: 'Qualidade', icon: <Settings className="h-4 w-4" /> }
                ].map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Latest Metrics Cards */}
                  {(() => {
                    const latestMetric = getLatestMetric(selectedProject);
                    if (!latestMetric) return <div>Nenhuma métrica disponível</div>;
                    
                    return (
                      <>
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-gray-900">Métricas Atuais</h3>
                          <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Última atualização: {formatDate(latestMetric.recorded_at)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <MetricCard
                            title="Linhas de Código"
                            value={formatNumber(latestMetric.lines)}
                            icon={<Code2 className="h-6 w-6 text-blue-600" />}
                            color="text-blue-600"
                          />
                          <MetricCard
                            title="Funções"
                            value={formatNumber(latestMetric.functions)}
                            icon={<Layers className="h-6 w-6 text-green-600" />}
                            color="text-green-600"
                          />
                          <MetricCard
                            title="Classes"
                            value={formatNumber(latestMetric.classes)}
                            icon={<Package className="h-6 w-6 text-purple-600" />}
                            color="text-purple-600"
                          />
                          <MetricCard
                            title="Comentários"
                            value={formatNumber(latestMetric.comments)}
                            icon={<MessageCircle className="h-6 w-6 text-orange-600" />}
                            color="text-orange-600"
                            subtitle={latestMetric.comment_percentage}
                          />
                        </div>

                        {/* Code Structure Chart */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-4">Estrutura do Código</h4>
                          <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={[
                              { name: 'Linhas', value: latestMetric.lines, fill: colors[0] },
                              { name: 'Funções', value: latestMetric.functions, fill: colors[1] },
                              { name: 'Classes', value: latestMetric.classes, fill: colors[2] },
                              { name: 'Comentários', value: latestMetric.comments, fill: colors[3] }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
                              <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {activeTab === 'trends' && (
                <div className="space-y-8">
                  <h3 className="text-lg font-semibold text-gray-900">Evolução das Métricas</h3>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={getTrendData(selectedProject)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="lines" 
                          stackId="1" 
                          stroke={colors[0]} 
                          fill={colors[0]} 
                          name="Linhas"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="functions" 
                          stackId="2" 
                          stroke={colors[1]} 
                          fill={colors[1]} 
                          name="Funções"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="classes" 
                          stackId="3" 
                          stroke={colors[2]} 
                          fill={colors[2]} 
                          name="Classes"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {activeTab === 'dependencies' && (
                <div className="space-y-8">
                  {(() => {
                    const latestMetric = getLatestMetric(selectedProject);
                    if (!latestMetric) return <div>Nenhuma métrica disponível</div>;
                    
                    const deps = latestMetric.dependencies;
                    return (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900">Análise de Dependências</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Distribuição de Dependências</h4>
                            <ResponsiveContainer width="100%" height={250}>
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Externas', value: deps.dependencies.length, fill: colors[0] },
                                    { name: 'Nativas', value: deps.native_modules.length, fill: colors[1] }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={100}
                                  dataKey="value"
                                >
                                  {[0, 1].map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="space-y-6">
                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 mb-3">Dependências Externas ({deps.dependencies.length})</h5>
                              <div className="flex flex-wrap gap-2">
                                {deps.dependencies.map((dep, index) => (
                                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {dep}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="bg-white border border-gray-200 rounded-lg p-4">
                              <h5 className="font-semibold text-gray-900 mb-3">Módulos Nativos ({deps.native_modules.length})</h5>
                              <div className="flex flex-wrap gap-2">
                                {deps.native_modules.map((mod, index) => (
                                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                    {mod}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {activeTab === 'quality' && (
                <div className="space-y-8">
                  {(() => {
                    const latestMetric = getLatestMetric(selectedProject);
                    if (!latestMetric) return <div>Nenhuma métrica disponível</div>;
                    
                    const indentStats = latestMetric.indentation.files[0]?.stats;
                    return (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900">Qualidade do Código</h3>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Cobertura de Comentários</h4>
                            <div className="text-center mb-4">
                              <div className="text-4xl font-bold text-blue-600 mb-2">
                                {latestMetric.comment_percentage}
                              </div>
                              <p className="text-gray-600">dos códigos estão comentados</p>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className="bg-blue-500 h-3 rounded-full transition-all duration-500"
                                style={{ width: latestMetric.comment_percentage }}
                              />
                            </div>
                          </div>

                          {indentStats && (
                            <div className="bg-gray-50 rounded-xl p-6">
                              <h4 className="font-semibold text-gray-900 mb-4">Padrões de Indentação</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Nível máximo:</span>
                                  <span className="font-semibold">{indentStats.maxIndentLevel}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Nível médio:</span>
                                  <span className="font-semibold">{indentStats.averageIndentLevel.toFixed(1)}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Usa espaços:</span>
                                  <span className={`font-semibold ${indentStats.usesSpaces ? 'text-green-600' : 'text-red-600'}`}>
                                    {indentStats.usesSpaces ? 'Sim' : 'Não'}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Indentação mista:</span>
                                  <span className={`font-semibold ${indentStats.mixedIndentation ? 'text-red-600' : 'text-green-600'}`}>
                                    {indentStats.mixedIndentation ? 'Sim' : 'Não'}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {indentStats && (
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Distribuição de Indentação</h4>
                            <ResponsiveContainer width="100%" height={300}>
                              <BarChart data={indentStats.indentDistribution}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="level" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill={colors[0]} radius={[4, 4, 0, 0]} />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default ProjectMetricsDashboard;