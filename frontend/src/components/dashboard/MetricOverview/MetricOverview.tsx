import React from 'react';
import { FileText, TrendingUp, Package, Settings, GitBranch } from 'lucide-react';
import { OverviewTab } from './tabs/OverviewTab';
import { TrendsTab } from './tabs/TrendsTab';
import { DependenciesTab } from './tabs/DependenciesTab';
import { QualityTab } from './tabs/QualityTab';
import type { Project } from '../../../types/project.types';

type TabType = 'overview' | 'trends' | 'dependencies' | 'quality';

interface MetricsOverviewProps {
	project: Project;
	activeTab: TabType;
	onTabChange: (tab: TabType) => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
	project,
	activeTab,
	onTabChange,
}) => {
	const tabs = [
		{ key: 'overview' as const, label: 'Visão Geral', icon: <FileText className="h-4 w-4" /> },
		{ key: 'trends' as const, label: 'Tendências', icon: <TrendingUp className="h-4 w-4" /> },
		{ key: 'dependencies' as const, label: 'Dependências', icon: <Package className="h-4 w-4" /> },
		{ key: 'quality' as const, label: 'Qualidade', icon: <Settings className="h-4 w-4" /> }
	];

	const renderTabContent = () => {
		switch (activeTab) {
			case 'overview':
				return <OverviewTab project={project} />;
			case 'trends':
				return <TrendsTab project={project} />;
			case 'dependencies':
				return <DependenciesTab project={project} />;
			case 'quality':
				return <QualityTab project={project} />;
			default:
				return <OverviewTab project={project} />;
		}
	};

	return (
		<>
			{/* Project Info */}
			<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<div className="flex items-center space-x-3 mb-2">
							<h2 className="text-2xl font-bold text-gray-900">{project.name}</h2>
							<span className={`px-3 py-1 rounded-full text-xs font-medium ${project.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
								}`}>
								{project.is_active ? 'Ativo' : 'Inativo'}
							</span>
						</div>
						<p className="text-gray-600 mb-4">{project.description}</p>
						<div className="flex flex-wrap gap-2 mb-4">
							{project.metadata.tags.map((tag, index) => (
								<span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
									#{tag}
								</span>
							))}
						</div>
						<div className="flex items-center space-x-6 text-sm text-gray-600">
							<span><strong>Linguagem:</strong> {project.metadata.language}</span>
							<span><strong>Framework:</strong> {project.metadata.framework}</span>
							<span><strong>Team:</strong> {project.metadata.team}</span>
						</div>
					</div>
					<a
						href={project.repository_url}
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
						{tabs.map(tab => (
							<button
								key={tab.key}
								onClick={() => onTabChange(tab.key)}
								className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.key
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
					{renderTabContent()}
				</div>
			</div>
		</>
	);
};