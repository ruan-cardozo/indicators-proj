import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CHART_COLORS } from '../../../../utils/constants';
import type { Project } from '../../../../types/project.types';

interface DependenciesTabProps {
    project: Project;
}

export const DependenciesTab: React.FC<DependenciesTabProps> = ({ project }) => {
    const getLatestMetric = () => {
        console.log({ project });
        return project.metrics[0] || null;
    };

    const latestMetric = getLatestMetric();

    if (!latestMetric) {
        return <div>Nenhuma métrica disponível</div>;
    }

    const deps = latestMetric.dependencies[0];
    console.log({ aaaa: deps });

    const pieData = [
        { name: 'Externas', value: deps.dependencies.length, fill: CHART_COLORS[0] },
        { name: 'Nativas', value: deps.native_modules.length, fill: CHART_COLORS[1] }
    ];

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900">Análise de Dependências</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Distribuição de Dependências</h4>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="space-y-6">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-3">
                            Dependências Externas ({deps.dependencies.length})
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {deps.dependencies.map((dep, index) => (
                                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                    {dep}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <h5 className="font-semibold text-gray-900 mb-3">
                            Módulos Nativos ({deps.native_modules.length})
                        </h5>
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
        </div>
    );
};