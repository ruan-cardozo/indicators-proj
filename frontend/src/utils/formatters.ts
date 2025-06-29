export const formatNumber = (num: number): string => {
	return new Intl.NumberFormat('pt-BR').format(num);
};

export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	});
};

export const formatDateTime = (dateString: string): string => {
	return new Date(dateString).toLocaleString('pt-BR');
};