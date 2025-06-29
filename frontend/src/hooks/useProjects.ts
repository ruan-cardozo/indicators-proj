import { useQuery } from '@tanstack/react-query';
import { ProjectsService } from '../services/project.service';

export const useProjects = () => {
	return useQuery({
		queryKey: ['project'],
		queryFn: ProjectsService.getAll,
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
	});
};

export const useProject = (projectId: string) => {
	return useQuery({
		queryKey: ['project', projectId],
		queryFn: () => ProjectsService.getById(projectId),
		enabled: !!projectId,
	});
};