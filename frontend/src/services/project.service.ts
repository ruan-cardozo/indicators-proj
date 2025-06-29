import type { ApiResponse, Project } from '../types/project.types';
import api from './api.service';

const BASE_PATH = 'http://localhost:8030/api/v1/';

export class ProjectsService {


	static async getAll(): Promise<Project[]> {
		try {
			const response = await api.get<ApiResponse<Project[]>>(`${BASE_PATH}project`);
			return response.data.data;
		} catch (error) {
			console.error('Error fetching projects:', error);
			throw new Error('Failed to fetch projects');
		}
	}

	static async getById(id: string): Promise<Project> {
		try {
			const response = await api.get<ApiResponse<Project>>(`${BASE_PATH}project/${id}`);
			return response.data.data;
		} catch (error) {
			console.error(`Error fetching project ${id}:`, error);
			throw new Error(`Failed to fetch project ${id}`);
		}
	}
}