import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { CHART_COLORS } from '../../../../utils/constants';
import type { Project } from '../../../../types/project.types';

interface QualityTabProps {
    project: Project;
}

const VALIDATION_CHECKS = {
    hasMetrics: (project: Project) => project.metrics && project.metrics.length > 0,
    
    hasIndentationAnalysis: (metric: any) => 
        metric?.indentationAnalysis && 
        Array.isArray(metric.indentationAnalysis) && 
        metric.indentationAnalysis.length > 0,
    
    hasIndentationFiles: (analysis: any) => 
        analysis?.files && 
        Array.isArray(analysis.files) && 
        analysis.files.length > 0,
    
    hasIndentationStats: (file: any) => {

        return file?.max_indent_level !== undefined || file?.average_indent_level !== undefined;
    },
    
    hasCommentPercentage: (metric: any) => 
        metric?.comment_percentage && 
        typeof metric.comment_percentage === 'string',
    
    hasIndentDistribution: (stats: any) => 
        stats?.indentDistribution && 
        Array.isArray(stats.indentDistribution) && 
        stats.indentDistribution.length > 0
};

const DATA_EXTRACTORS = {

    getLatestMetric: (project: Project) => {
        if (!VALIDATION_CHECKS.hasMetrics(project)) return null;
        return project.metrics[0];
    },
    
    getIndentationStats: (metric: any) => {
        try {
            if (!VALIDATION_CHECKS.hasIndentationAnalysis(metric)) return null;
            
            const analysis = metric.indentationAnalysis[0];
            if (!VALIDATION_CHECKS.hasIndentationFiles(analysis)) return null;
            
            const file = analysis.files[0];

            if (file.max_indent_level !== undefined || file.average_indent_level !== undefined) {
                return {
                    maxIndentLevel: file.max_indent_level,
                    averageIndentLevel: file.average_indent_level,
                    usesSpaces: file.uses_spaces,
                    mixedIndentation: file.mixed_indentation,
                    indentDistribution: file.distributions
                };
            }

            return null;
        } catch (error) {
            console.warn('Erro ao extrair dados de indentação:', error);
            return null;
        }
    },
    
    getBasicMetrics: (metric: any) => ({
        lines: metric?.lines || 0,
        functions: metric?.functions || 0,
        classes: metric?.classes || 0,
        comments: metric?.comments || 0,
        averageFunctionSize: metric?.average_function_size ? parseFloat(metric.average_function_size) : 0,
        privateMethods: metric?.private_methods || 0,
        publicMethods: metric?.public_methods || 0,
        totalDependencies: metric?.dependencies[0].total_dependencies || 0
    })
};

const EmptyState: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="text-center py-8">
        <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <p className="font-medium text-gray-900 mb-1">{title}</p>
        <p className="text-gray-500 text-sm">{description}</p>
    </div>
);

const QualityIndicator: React.FC<{ label: string; isGood: boolean; hasData: boolean }> = ({ 
    label, 
    isGood, 
    hasData 
}) => {
    const getIcon = () => {
        if (!hasData) return <XCircle className="h-5 w-5 text-gray-400" />;
        return isGood ? <CheckCircle className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />;
    };
    
    const getTextColor = () => {
        if (!hasData) return 'text-gray-400';
        return isGood ? 'text-green-600' : 'text-red-600';
    };

    return (
        <div className={`flex items-center space-x-2 ${getTextColor()}`}>
            {getIcon()}
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
};

export const QualityTab: React.FC<QualityTabProps> = ({ project }) => {

    const latestMetric = DATA_EXTRACTORS.getLatestMetric(project);
    const indentStats = latestMetric ? DATA_EXTRACTORS.getIndentationStats(latestMetric) : null;
    const basicMetrics = latestMetric ? DATA_EXTRACTORS.getBasicMetrics(latestMetric) : null;
    
    const hasCommentData = latestMetric ? VALIDATION_CHECKS.hasCommentPercentage(latestMetric) : false;
    const hasIndentData = Boolean(indentStats);
    const hasDistributionData = indentStats ? VALIDATION_CHECKS.hasIndentDistribution(indentStats) : false;

    if (!latestMetric) {
        return (
            <div className="flex items-center justify-center h-64">
                <EmptyState 
                    title="Nenhuma métrica disponível" 
                    description="Não há dados de qualidade para este projeto." 
                />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900">Qualidade do Código</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cobertura de Comentários */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Cobertura de Comentários</h4>
                    {hasCommentData ? (
                        <>
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
                        </>
                    ) : (
                        <EmptyState 
                            title="Dados não disponíveis" 
                            description="Informações de comentários não encontradas" 
                        />
                    )}
                </div>

                {/* Padrões de Indentação */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Padrões de Indentação</h4>
                    {hasIndentData ? (
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nível máximo:</span>
                                <span className="font-semibold">{indentStats?.maxIndentLevel ?? 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Nível médio:</span>
                                <span className="font-semibold">
                                    {indentStats && indentStats.averageIndentLevel ? indentStats.averageIndentLevel.toFixed(1) : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Usa espaços:</span>
                                <div className="flex items-center space-x-1">
                                    {indentStats && indentStats.usesSpaces ? (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                    )}
                                    <span className={`font-semibold ${indentStats?.usesSpaces ? 'text-green-600' : 'text-red-600'}`}>
                                        {indentStats?.usesSpaces ? 'Sim' : 'Não'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Indentação mista:</span>
                                <div className="flex items-center space-x-1">
                                    {indentStats?.mixedIndentation ? (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                    ) : (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                    <span className={`font-semibold ${indentStats?.mixedIndentation ? 'text-red-600' : 'text-green-600'}`}>
                                        {indentStats?.mixedIndentation ? 'Sim' : 'Não'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <EmptyState 
                            title="Dados não disponíveis" 
                            description="Informações de indentação não encontradas" 
                        />
                    )}
                </div>
            </div>

            {/* Métricas Básicas */}
            <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Métricas Básicas</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{basicMetrics?.lines}</div>
                        <p className="text-sm text-gray-600">Linhas de Código</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{basicMetrics?.functions}</div>
                        <p className="text-sm text-gray-600">Funções</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{basicMetrics?.classes}</div>
                        <p className="text-sm text-gray-600">Classes</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">{basicMetrics?.comments}</div>
                        <p className="text-sm text-gray-600">Comentários</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-pink-600">{basicMetrics?.publicMethods ?? 0}</div>
                        <p className="text-sm text-gray-600">Métodos Públicos</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{basicMetrics?.privateMethods ?? 0}</div>
                        <p className="text-sm text-gray-600">Métodos Privados</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-600">
                            {basicMetrics?.averageFunctionSize ? basicMetrics.averageFunctionSize.toFixed(1) : 0}
                        </div>
                        <p className="text-sm text-gray-600">Tamanho Médio Função</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{basicMetrics?.totalDependencies ?? 0}</div>
                        <p className="text-sm text-gray-600">Total de Dependências</p>
                    </div>
                </div>
            </div>

            {/* Distribuição de Indentação */}
            {hasDistributionData && (
                <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Distribuição de Indentação</h4>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={indentStats?.indentDistribution}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="level" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill={CHART_COLORS[0]} radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Resumo da Qualidade */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Resumo da Qualidade</h4>
                <div className="flex items-center justify-between">
                    <div className="flex space-x-6">
                        <QualityIndicator 
                            label="Comentários" 
                            isGood={hasCommentData} 
                            hasData={hasCommentData} 
                        />
                        <QualityIndicator 
                            label="Indentação" 
                            isGood={hasIndentData} 
                            hasData={hasIndentData} 
                        />
                        <QualityIndicator 
                            label="Consistência" 
                            isGood={hasIndentData && !indentStats?.mixedIndentation} 
                            hasData={hasIndentData} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};