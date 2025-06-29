import React from 'react';

interface MetricCardProps {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	color: string;
	subtitle?: string;
	isLoading?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon,
	color,
	subtitle,
	isLoading = false,
}) => {
	if (isLoading) {
		return (
			<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 animate-pulse">
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
						<div className="h-8 bg-gray-200 rounded w-1/2"></div>
					</div>
					<div className="w-12 h-12 bg-gray-200 rounded-full"></div>
				</div>
			</div>
		);
	}

	return (
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
};