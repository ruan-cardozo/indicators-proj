#!/bin/bash

# Script corrigido para criar issues automaticamente no GitHub
# Uso: ./create-issues-fixed.sh

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Verificações básicas
if ! command -v gh &> /dev/null; then
    log_error "GitHub CLI não instalado. Instale: https://cli.github.com/"
    exit 1
fi

if ! gh auth status &> /dev/null; then
    log_error "Não autenticado. Execute: gh auth login"
    exit 1
fi

REPO=$(gh repo view --json nameWithOwner -q .nameWithOwner 2>/dev/null || echo "")
if [ -z "$REPO" ]; then
    log_error "Execute dentro de um repositório git"
    exit 1
fi

log_info "Repositório: $REPO"

# Função para criar labels usando API do GitHub
create_labels() {
    log_info "Criando/verificando labels..."
    
    # Lista de labels com cores
    declare -A labels=(
        ["architecture"]="0052cc"
        ["api"]="7057ff"
        ["core-feature"]="0e8a16"
        ["database"]="d73a4a"
        ["documentation"]="0075ca"
        ["frontend"]="fbca04"
        ["infrastructure"]="5319e7"
        ["queue"]="f9d0c4"
        ["testing"]="bfd4f2"
        ["cleanup"]="e4e669"
        ["setup"]="c2e0c6"
        ["rabbitmq"]="ff6b6b"
        ["deduplication"]="4ecdc4"
        ["queries"]="45b7d1"
        ["dashboard"]="96ceb4"
        ["scheduler"]="feca57"
        ["quality"]="48dbfb"
        ["deployment"]="ff9ff3"
    )
    
    for label in "${!labels[@]}"; do
        # Verifica se label já existe usando API
        if ! gh api repos/$REPO/labels/$label &> /dev/null; then
            # Cria label usando API
            gh api repos/$REPO/labels \
                --method POST \
                --field name="$label" \
                --field color="${labels[$label]}" \
                --field description="Auto-generated label" \
                &> /dev/null && log_success "Label criada: $label" || log_warning "Erro ao criar label: $label"
        else
            log_info "Label já existe: $label"
        fi
    done
}

# Criar labels primeiro
create_labels

log_info "Criando issues..."

# Issue 1
gh issue create --repo "$REPO" \
--title "📊 Arquitetura e Documentação Técnica" \
--label "architecture,documentation" \
--body "## 🎯 Objetivo
Definir a arquitetura do sistema e criar documentação técnica detalhada.

## 📋 Tarefas
- [ ] Criar diagrama de arquitetura geral do sistema
- [ ] Definir diagrama de fluxo de dados (recebimento → fila → processamento → armazenamento)
- [ ] Modelar estrutura do banco de dados
- [ ] Definir contratos da API REST (OpenAPI/Swagger)
- [ ] Documentar estratégia de deduplicação
- [ ] Definir estrutura de pastas do projeto
- [ ] Criar ADRs (Architecture Decision Records)

## ✅ Critérios de Aceite
- [ ] Diagramas de arquitetura criados
- [ ] Modelo de dados definido
- [ ] Contratos da API especificados
- [ ] Documentação técnica completa

## 🛠️ Ferramentas
- Mermaid.js para diagramas
- OpenAPI Specification

**Estimativa: 2 dias | Prioridade: Alta**"

log_success "Issue #1 criada"

# Issue 2
gh issue create --repo "$REPO" \
--title "🏗️ Setup Inicial do Projeto NestJS" \
--label "setup,infrastructure" \
--body "## 🎯 Objetivo
Configurar ambiente de desenvolvimento com NestJS, Docker e dependências.

## 📋 Tarefas
- [ ] Inicializar projeto NestJS com TypeScript
- [ ] Configurar Docker Compose (NestJS + RabbitMQ + PostgreSQL)
- [ ] Configurar ESLint, Prettier e Husky
- [ ] Estruturar pastas seguindo Clean Architecture
- [ ] Configurar variáveis de ambiente
- [ ] Setup do Jest para testes unitários
- [ ] Configurar pipeline de CI/CD básico

## ✅ Critérios de Aceite
- [ ] Projeto NestJS funcionando
- [ ] Docker Compose operacional
- [ ] Ambiente de testes configurado
- [ ] Estrutura de pastas organizada

**Estimativa: 1 dia | Prioridade: Alta**"

log_success "Issue #2 criada"

# Issue 3
gh issue create --repo "$REPO" \
--title "📡 Implementar Recebimento de Métricas (API POST)" \
--label "api,core-feature" \
--body "## 🎯 Objetivo
Desenvolver endpoint para receber métricas de projetos via API REST.

## 📋 Tarefas
- [ ] Criar DTOs para recebimento de métricas
- [ ] Implementar validação de entrada (class-validator)
- [ ] Criar controller (\`POST /api/projects/:id/metrics\`)
- [ ] Implementar service para validação e enfileiramento
- [ ] Adicionar tratamento de erros e logs
- [ ] Escrever testes unitários
- [ ] Criar testes de integração

## 📊 Estrutura de Dados
\`\`\`typescript
interface MetricData {
  projectId: string;
  timestamp: Date;
  metrics: {
    linesOfCode: number;
    complexity: number;
    coverage: number;
    maintainabilityIndex: number;
    technicalDebt: number;
  };
  metadata: {
    version: string;
    branch: string;
    commitHash: string;
  };
}
\`\`\`

## ✅ Critérios de Aceite
- [ ] Endpoint POST funcional
- [ ] Validação implementada
- [ ] Métricas enfileiradas
- [ ] Cobertura de testes > 80%

**Estimativa: 2 dias | Prioridade: Alta**"

log_success "Issue #3 criada"

# Issue 4
gh issue create --repo "$REPO" \
--title "🔄 Sistema de Filas com RabbitMQ" \
--label "queue,rabbitmq,core-feature" \
--body "## 🎯 Objetivo
Implementar sistema de filas para processamento assíncrono das métricas.

## 📋 Tarefas
- [ ] Configurar conexão com RabbitMQ
- [ ] Criar publisher para enfileirar métricas
- [ ] Implementar consumer para processar métricas
- [ ] Adicionar retry mechanism
- [ ] Implementar dead letter queue
- [ ] Configurar monitoramento de filas
- [ ] Escrever testes para publisher e consumer
- [ ] Documentar configuração

## ✅ Critérios de Aceite
- [ ] Métricas enfileiradas corretamente
- [ ] Consumer processa sem perda de dados
- [ ] Sistema resiliente a falhas
- [ ] Monitoring implementado

**Estimativa: 2 dias | Prioridade: Alta**"

log_success "Issue #4 criada"

# Issue 5
gh issue create --repo "$REPO" \
--title "🗄️ Camada de Persistência e Deduplicação" \
--label "database,deduplication" \
--body "## 🎯 Objetivo
Implementar armazenamento das métricas com sistema de deduplicação.

## 📋 Tarefas
- [ ] Configurar Prisma ORM com PostgreSQL
- [ ] Criar schema do banco de dados
- [ ] Implementar repository pattern
- [ ] Desenvolver algoritmo de deduplicação (hash-based)
- [ ] Criar índices para otimização
- [ ] Implementar compressão de dados históricos
- [ ] Escrever testes unitários para repositories
- [ ] Criar migrações do banco

## ✅ Critérios de Aceite
- [ ] Dados persistidos corretamente
- [ ] Deduplicação funcionando
- [ ] Performance otimizada
- [ ] Testes de persistência passando

**Estimativa: 2 dias | Prioridade: Alta**"

log_success "Issue #5 criada"

# Issue 6
gh issue create --repo "$REPO" \
--title "📊 API de Consulta de Métricas (GET)" \
--label "api,queries" \
--body "## 🎯 Objetivo
Desenvolver endpoints para consulta de métricas atuais e histórico.

## 📋 Tarefas
- [ ] Endpoint métricas atuais (\`GET /api/projects/:id/metrics/current\`)
- [ ] Endpoint histórico (\`GET /api/projects/:id/metrics/history\`)
- [ ] Filtros por data e tipo de métrica
- [ ] Implementar paginação
- [ ] Endpoint listagem projetos (\`GET /api/projects\`)
- [ ] Otimizar queries para performance
- [ ] Testes unitários e integração
- [ ] Documentar no Swagger

## 🌐 Endpoints
\`\`\`
GET /api/projects
GET /api/projects/:id/metrics/current
GET /api/projects/:id/metrics/history?from=date&to=date&page=1&limit=50
GET /api/projects/:id/metrics/summary
\`\`\`

## ✅ Critérios de Aceite
- [ ] Endpoints funcionais
- [ ] Filtros e paginação implementados
- [ ] Performance otimizada
- [ ] Documentação Swagger atualizada

**Estimativa: 2 dias | Prioridade: Alta**"

log_success "Issue #6 criada"

# Issue 7
gh issue create --repo "$REPO" \
--title "🖥️ Interface Web para Visualização" \
--label "frontend,dashboard" \
--body "## 🎯 Objetivo
Criar interface web simples para visualização das métricas.

## 📋 Tarefas
- [ ] Configurar servidor estático no NestJS
- [ ] Dashboard principal com lista de projetos
- [ ] Visualização de métricas atuais
- [ ] Gráficos para histórico (Chart.js)
- [ ] Página de detalhes por projeto
- [ ] Filtros por data
- [ ] Responsividade básica
- [ ] Testes E2E com Cypress

## 🎨 Funcionalidades
- Dashboard com resumo de projetos
- Página de detalhes por projeto
- Gráficos de evolução temporal
- Filtros e navegação intuitiva

## ✅ Critérios de Aceite
- [ ] Interface funcional
- [ ] Gráficos exibindo dados
- [ ] Responsividade básica
- [ ] Testes E2E principais cenários

**Estimativa: 3 dias | Prioridade: Média**"

log_success "Issue #7 criada"

# Issue 8
gh issue create --repo "$REPO" \
--title "🧹 Limpeza Automática de Dados Inativos" \
--label "cleanup,scheduler" \
--body "## 🎯 Objetivo
Sistema de limpeza automática para projetos inativos > 7 dias.

## 📋 Tarefas
- [ ] Configurar Cron jobs com @nestjs/schedule
- [ ] Implementar service de limpeza
- [ ] Query para identificar projetos inativos
- [ ] Adicionar logs de limpeza
- [ ] Configurar soft delete (opcional)
- [ ] Notificação antes da remoção
- [ ] Testes para scheduler
- [ ] Documentar configuração

## ✅ Critérios de Aceite
- [ ] Limpeza automática funcionando
- [ ] Logs de auditoria
- [ ] Configuração por variável de ambiente
- [ ] Testes unitários

**Estimativa: 1 dia | Prioridade: Média**"

log_success "Issue #8 criada"

# Issue 9
gh issue create --repo "$REPO" \
--title "🧪 Testes Abrangentes e Qualidade" \
--label "testing,quality" \
--body "## 🎯 Objetivo
Garantir cobertura de testes abrangente e qualidade do código.

## 📋 Tarefas
- [ ] Cobertura de testes unitários > 85%
- [ ] Testes de integração para APIs
- [ ] Testes E2E para fluxos principais
- [ ] Configurar relatórios de cobertura
- [ ] Testes de performance básicos
- [ ] Testes de carga com artillery
- [ ] Configurar SonarQube
- [ ] Documentação de testes

## 🧪 Tipos de Testes
- **Unitários:** Services, Repositories, Utilities
- **Integração:** Controllers, Database, RabbitMQ
- **E2E:** Fluxos completos
- **Performance:** Endpoints sob carga

## ✅ Critérios de Aceite
- [ ] Cobertura > 85% unitários
- [ ] Testes integração APIs principais
- [ ] Testes E2E cenários críticos
- [ ] Pipeline CI/CD com testes

**Estimativa: 2 dias | Prioridade: Alta**"

log_success "Issue #9 criada"

# Issue 10
gh issue create --repo "$REPO" \
--title "📚 Documentação Final e Deploy" \
--label "documentation,deployment" \
--body "## 🎯 Objetivo
Finalizar documentação e preparar ambiente de produção.

## 📋 Tarefas
- [ ] Atualizar README completo
- [ ] Guia de instalação e configuração
- [ ] Documentar APIs no Swagger
- [ ] Guia de contribuição
- [ ] Docker para produção
- [ ] Scripts de deploy
- [ ] Documentar monitoramento e logs
- [ ] Checklist de deploy

## 📖 Documentação
- README.md completo
- API Documentation (Swagger)
- Architecture Decision Records
- Deployment Guide
- Troubleshooting Guide

## ✅ Critérios de Aceite
- [ ] Documentação completa
- [ ] Aplicação deployável via Docker
- [ ] Swagger funcional
- [ ] Guias testados

**Estimativa: 1 dia | Prioridade: Média**"

log_success "Issue #10 criada"

echo ""
log_success "✅ Todas as 10 issues foram criadas com sucesso!"
echo ""
log_info "📊 Resumo:"
echo "   • 10 issues criadas"
echo "   • Labels configuradas"
echo "   • Estimativa total: ~16 dias"
echo "   • Meta: 25 de junho"
echo ""
log_info "🔗 Visualize em: https://github.com/$REPO/issues"
echo ""
log_warning "💡 Próximos passos:"
echo "   1. Começar pela Issue #1 (Arquitetura)"
echo "   2. Seguir ordem de prioridade"
echo "   3. Manter foco na qualidade!"