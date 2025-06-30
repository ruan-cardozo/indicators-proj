import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TrendingUp } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { Project } from '../types/project.types';
import { ProjectSelector } from '../components/dashboard/ProjectSelector/ProjectSelector';
import { MetricsOverview } from '../components/dashboard/MetricOverview/MetricOverview';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            refetchOnWindowFocus: false,
        },
    },
});

const DashboardContent: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState<'project-creation' | 'overview' | 'trends' | 'dependencies' | 'quality'>('overview');

    const { data: projects = [], isLoading, error } = useProjects();

    // Auto-select first project when projects load
    React.useEffect(() => {
        if (projects.length > 0 && !selectedProject) {
            setSelectedProject(projects[0]);
        }
    }, [projects, selectedProject]);

    if (error) {
        return (
            <div className="min-h-screen bg-red-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Erro ao carregar dados</h2>
                    <p className="text-red-600">Verifique se o servidor está funcionando</p>
                </div>
            </div>
        );
    }

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
                            <ProjectSelector
                                projects={projects}
                                selectedProject={selectedProject}
                                onProjectChange={setSelectedProject}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            {selectedProject && (
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <MetricsOverview
                        project={selectedProject}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />
                </main>
            )}
        </div>
    );
};

export const Dashboard: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <DashboardContent />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};