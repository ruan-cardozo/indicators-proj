import React, { useState } from 'react';

interface CreateProjectData {
    name: string;
    description: string;
    repository_url: string;
    is_active?: boolean;
    metadata?: Record<string, any>;
}

export const CreateProjectTab: React.FC = () => {
    const [formData, setFormData] = useState<CreateProjectData>({
        name: '',
        description: '',
        repository_url: '',
        is_active: true,
        metadata: {}
    });
    
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [metadataText, setMetadataText] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
        
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleMetadataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setMetadataText(value);
        
        try {
            const parsed = value ? JSON.parse(value) : {};
            setFormData(prev => ({ ...prev, metadata: parsed }));
            setErrors(prev => ({ ...prev, metadata: '' }));
        } catch (error) {
            setErrors(prev => ({ ...prev, metadata: 'Formato JSON inválido' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Nome do projeto é obrigatório';
        } else if (formData.name.trim().length < 3) {
            newErrors.name = 'Nome do projeto deve ter pelo menos 3 caracteres';
        } else if (formData.name.trim().length > 100) {
            newErrors.name = 'Nome do projeto não pode exceder 100 caracteres';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Descrição do projeto é obrigatória';
        } else if (formData.description.trim().length < 10) {
            newErrors.description = 'Descrição deve ter pelo menos 10 caracteres';
        } else if (formData.description.trim().length > 500) {
            newErrors.description = 'Descrição não pode exceder 500 caracteres';
        }

        if (!formData.repository_url.trim()) {
            newErrors.repository_url = 'URL do repositório é obrigatória';
        } else {
            try {
                new URL(formData.repository_url);
            } catch {
                newErrors.repository_url = 'URL do repositório deve ser válida';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsLoading(true);
        setSuccess(false);
        
        try {
            const response = await fetch('http://localhost:8030/api/v1/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    name: formData.name.trim(),
                    description: formData.description.trim()
                }),
            });

            if (!response.ok) {
                throw new Error('Falha ao criar projeto');
            }

            setSuccess(true);
            setFormData({
                name: '',
                description: '',
                repository_url: '',
                is_active: true,
                metadata: {}
            });
            setMetadataText('');
            
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            
        } catch (error) {
            console.error('Error creating project:', error);
            setErrors({ submit: 'Falha ao criar projeto. Tente novamente.' });
        } finally {
            setIsLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-4xl mx-auto text-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-8">
                    <h3 className="text-2xl font-bold text-green-600 mb-4">
                        ✅ Projeto Criado com Sucesso!
                    </h3>
                    <p className="text-green-700 mb-4">
                        Seu projeto foi criado e processado. A página será recarregada em breve para mostrar o novo projeto.
                    </p>
                    <p className="text-sm text-green-600">
                        <strong>Importante:</strong> Após o recarregamento, você poderá copiar o ID do projeto na seção de informações do projeto.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Criar Novo Projeto</h3>
                <p className="text-gray-600">Preencha as informações abaixo para criar um novo projeto de monitoramento.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Project Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nome do Projeto *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Meu Projeto Incrível"
                            maxLength={100}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        <p className="mt-1 text-xs text-gray-500">3-100 caracteres</p>
                    </div>

                    {/* Repository URL */}
                    <div>
                        <label htmlFor="repository_url" className="block text-sm font-medium text-gray-700 mb-2">
                            URL do Repositório *
                        </label>
                        <input
                            type="url"
                            id="repository_url"
                            name="repository_url"
                            value={formData.repository_url}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                errors.repository_url ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="https://github.com/usuario/projeto"
                        />
                        {errors.repository_url && <p className="mt-1 text-sm text-red-600">{errors.repository_url}</p>}
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                        Descrição *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            errors.description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Um projeto para rastrear métricas e qualidade do código ao longo do tempo"
                        maxLength={500}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                    <p className="mt-1 text-xs text-gray-500">10-500 caracteres</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Is Active */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="is_active"
                            name="is_active"
                            checked={formData.is_active}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                            Projeto está ativo
                        </label>
                    </div>
                </div>

                {/* Metadata */}
                <div>
                    <label htmlFor="metadata" className="block text-sm font-medium text-gray-700 mb-2">
                        Metadados (Opcional)
                    </label>
                    <textarea
                        id="metadata"
                        name="metadata"
                        value={metadataText}
                        onChange={handleMetadataChange}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                            errors.metadata ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder='{"language": "TypeScript", "framework": "NestJS", "team": "Backend Team", "tags": ["api", "metrics"]}'
                    />
                    {errors.metadata && <p className="mt-1 text-sm text-red-600">{errors.metadata}</p>}
                    <p className="mt-1 text-xs text-gray-500">Formato JSON válido para metadados adicionais do projeto</p>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                )}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    } text-white`}
                >
                    {isLoading ? 'Criando Projeto...' : 'Criar Projeto'}
                </button>
            </form>
        </div>
    );
};