import React from 'react';
import type { Project } from '../../../types/project.types';

interface ProjectSelectorProps {
	projects: Project[];
	selectedProject: Project | null;
	onProjectChange: (project: Project) => void;
	isLoading?: boolean;
}

export const ProjectSelector: React.FC<ProjectSelectorProps> = ({
	projects,
	selectedProject,
	onProjectChange,
	isLoading = false,
}) => {
	if (isLoading) {
		return (
			<div className="bg-gray-200 animate-pulse rounded-lg px-4 py-2 w-48 h-10"></div>
		);
	}

	return (
		<select
			className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
			value={selectedProject?.id || ''}
			onChange={(e) => {
				const project = projects.find(p => p.id === e.target.value);
				if (project) {
					onProjectChange(project);
				}
			}}
		>
			<option value="">Selecione um projeto</option>
			{projects.map(project => (
				<option key={project.id} value={project.id}>
					{project.name}
				</option>
			))}
		</select>
	);
};