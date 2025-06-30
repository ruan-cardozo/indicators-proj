import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Code2, Layers, Package, MessageCircle, Calendar } from 'lucide-react';
import { formatNumber, formatDate } from '../../../../utils/formatters';
import { CHART_COLORS } from '../../../../utils/constants';
import type { Project } from '../../../../types/project.types';
import { MetricCard } from '../../../MetricCard/MetricCard';

interface OverviewTabProps {
    project: Project;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ project }) => {
    const getLatestMetric = () => {
        return project.metrics[0] || null;
    };

    const latestMetric = getLatestMetric();

    if (!latestMetric) {
        return <div>Nenhuma métrica disponível</div>;
    }

    const chartData = [
        { name: 'Linhas', value: latestMetric.lines, fill: CHART_COLORS[0] },
        { name: 'Funções', value: latestMetric.functions, fill: CHART_COLORS[1] },
        { name: 'Classes', value: latestMetric.classes, fill: CHART_COLORS[2] },
        { name: 'Comentários', value: latestMetric.comments, fill: CHART_COLORS[3] }
    ];

    return (
        <div className="space-y-8">
            {/* Latest Metrics Cards */}
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
                <MetricCard
                    title="Métodos Públicos"
                    value={formatNumber(Number(latestMetric.public_methods) || 0)}
                    icon={<Layers className="h-6 w-6 text-cyan-600" />}
                    color="text-cyan-600"
                />
                <MetricCard
                    title="Métodos Privados"
                    value={formatNumber(Number(latestMetric.private_methods) || 0)}
                    icon={<Layers className="h-6 w-6 text-rose-600" />}
                    color="text-rose-600"
                />
                <MetricCard
                    title="Tamanho Médio das Funções"
                    value={formatNumber(Number(latestMetric.average_function_size) || 0)}
                    icon={<Code2 className="h-6 w-6 text-yellow-600" />}
                    color="text-yellow-600"
                />
                <MetricCard
                    title="Total de Dependências"
                    value={latestMetric.dependencies[0].total_dependencies}
                    icon={<Package className="h-6 w-6 text-gray-600" />}
                    color="text-gray-600"
                />
            </div>

            {/* Code Structure Chart */}
            <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Estrutura do Código</h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: any) => formatNumber(Number(value))} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};