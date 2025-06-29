import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatDate } from '../../../../utils/formatters';
import { CHART_COLORS } from '../../../../utils/constants';
import type { Project } from '../../../../types/project.types';

interface TrendsTabProps {
    project: Project;
}

export const TrendsTab: React.FC<TrendsTabProps> = ({ project }) => {
    const getTrendData = () => {
        return project.metrics.map(metric => ({
            date: formatDate(metric.recorded_at),
            lines: metric.lines,
            functions: metric.functions,
            classes: metric.classes,
            comments: metric.comments
        })).reverse();
    };

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold text-gray-900">Evolução das Métricas</h3>

            <div className="bg-gray-50 rounded-xl p-6">
                <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={getTrendData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="lines"
                            stackId="1"
                            stroke={CHART_COLORS[0]}
                            fill={CHART_COLORS[0]}
                            name="Linhas"
                        />
                        <Area
                            type="monotone"
                            dataKey="functions"
                            stackId="2"
                            stroke={CHART_COLORS[1]}
                            fill={CHART_COLORS[1]}
                            name="Funções"
                        />
                        <Area
                            type="monotone"
                            dataKey="classes"
                            stackId="3"
                            stroke={CHART_COLORS[2]}
                            fill={CHART_COLORS[2]}
                            name="Classes"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};