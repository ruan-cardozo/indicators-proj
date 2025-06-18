# 📁 Estrutura de Pastas - Servidor de Indicadores de Qualidade

## 🏗️ **Estrutura Completa**

```
indicators-proj/
├── 📚 docs/                          # Documentação do projeto
│   ├── architecture/
│   │   ├── system-overview.md        # Visão geral do sistema
│   │   ├── database-model.md         # Modelo de dados
│   │   └── deduplication-strategy.md # Estratégia de deduplicação
│   ├── api/
│   │   ├── endpoints.md              # Documentação dos endpoints
│   │   └── examples.md               # Exemplos de uso
│   └── deployment/
│       └── setup-guide.md            # Guia de instalação
│
├── 🐳 docker/                        # Configurações Docker
│   ├── Dockerfile                    # Build da aplicação
│   ├── docker-compose.yml           # Orquestração dos serviços
│   └── .env.example                 # Variáveis de ambiente
│
├── 💾 database/                      # Scripts de banco
│   ├── migrations/                   # Migrações TypeORM
│   │   ├── 1698000001-CreateProjects.ts
│   │   ├── 1698000002-CreateMetrics.ts
│   │   └── 1698000003-CreateMetricHashes.ts
│   ├── seeds/                        # Dados iniciais
│   │   └── initial-data.seed.ts
│   └── data-source.ts               # Configuração TypeORM
│
├── 🧪 test/                          # Testes de integração e E2E
│   ├── integration/                  # Testes de integração
│   │   ├── api/
│   │   │   ├── metrics.integration.spec.ts
│   │   │   └── projects.integration.spec.ts
│   │   └── database/
│   │       └── repository.integration.spec.ts
│   ├── e2e/                         # Testes end-to-end
│   │   └── full-flow.e2e.spec.ts
│   └── fixtures/                    # Dados de teste
│       ├── sample-metrics.json
│       └── test-projects.json
│
├── 🌐 web-dashboard/                 # Projeto React separado
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/
│   │   │   ├── ProjectDetail/
│   │   │   ├── MetricsChart/
│   │   │   └── ProjectList/
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── ProjectDetailPage.tsx
│   │   │   └── MetricsHistoryPage.tsx
│   │   ├── services/
│   │   │   ├── api.service.ts
│   │   │   └── metrics.service.ts
│   │   ├── hooks/
│   │   │   └── useMetrics.ts
│   │   ├── types/
│   │   │   ├── metric.types.ts
│   │   │   └── project.types.ts
│   │   ├── utils/
│   │   │   └── chart.utils.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── 🚀 src/                          # Código fonte da API
│   ├── 🔧 config/                   # Configurações
│   │   ├── database.config.ts
│   │   ├── queue.config.ts
│   │   └── app.config.ts
│   │
│   ├── 🧩 common/                   # Código compartilhado
│   │   ├── decorators/
│   │   │   └── api-response.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   └── logging.interceptor.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── utils/
│   │       ├── hash.util.ts
│   │       └── date.util.ts
│   │
│   ├── 🏢 modules/                  # Módulos de domínio
│   │   ├── 📊 metrics/              # Módulo de métricas
│   │   │   ├── controllers/
│   │   │   │   ├── metrics.controller.ts
│   │   │   │   └── metrics.controller.spec.ts
│   │   │   ├── services/
│   │   │   │   ├── metrics.service.ts
│   │   │   │   ├── metrics.service.spec.ts
│   │   │   │   ├── deduplication.service.ts
│   │   │   │   └── deduplication.service.spec.ts
│   │   │   ├── repositories/
│   │   │   │   ├── metrics.repository.ts
│   │   │   │   ├── metrics.repository.spec.ts
│   │   │   │   ├── metric-hash.repository.ts
│   │   │   │   └── metric-hash.repository.spec.ts
│   │   │   ├── dto/
│   │   │   │   ├── submit-metrics.dto.ts
│   │   │   │   ├── query-metrics.dto.ts
│   │   │   │   └── metrics-response.dto.ts
│   │   │   ├── entities/
│   │   │   │   ├── metric.entity.ts
│   │   │   │   ├── metric-hash.entity.ts
│   │   │   │   ├── dependency.entity.ts
│   │   │   │   ├── dependency-item.entity.ts
│   │   │   │   ├── indentation-analysis.entity.ts
│   │   │   │   ├── indentation-file.entity.ts
│   │   │   │   └── indent-distribution.entity.ts
│   │   │   ├── processors/
│   │   │   │   ├── metrics.processor.ts
│   │   │   │   └── metrics.processor.spec.ts
│   │   │   └── metrics.module.ts
│   │   │
│   │   ├── 📁 projects/             # Módulo de projetos
│   │   │   ├── controllers/
│   │   │   │   ├── projects.controller.ts
│   │   │   │   └── projects.controller.spec.ts
│   │   │   ├── services/
│   │   │   │   ├── projects.service.ts
│   │   │   │   └── projects.service.spec.ts
│   │   │   ├── repositories/
│   │   │   │   ├── projects.repository.ts
│   │   │   │   └── projects.repository.spec.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-project.dto.ts
│   │   │   │   └── project-response.dto.ts
│   │   │   ├── entities/
│   │   │   │   └── project.entity.ts
│   │   │   └── projects.module.ts
│   │   │
│   │   ├── 🔄 queue/                # Módulo de filas
│   │   │   ├── services/
│   │   │   │   ├── queue.service.ts
│   │   │   │   ├── queue.service.spec.ts
│   │   │   │   ├── queue-health.service.ts
│   │   │   │   └── queue-health.service.spec.ts
│   │   │   ├── processors/
│   │   │   │   ├── base.processor.ts
│   │   │   │   └── base.processor.spec.ts
│   │   │   └── queue.module.ts
│   │   │
│   │   ├── 🧹 cleanup/              # Módulo de limpeza
│   │   │   ├── services/
│   │   │   │   ├── cleanup.service.ts
│   │   │   │   └── cleanup.service.spec.ts
│   │   │   ├── schedulers/
│   │   │   │   ├── cleanup.scheduler.ts
│   │   │   │   └── cleanup.scheduler.spec.ts
│   │   │   └── cleanup.module.ts
│   │   │
│   │   ├── 📈 dashboard/            # Módulo do dashboard API
│   │   │   ├── controllers/
│   │   │   │   ├── dashboard.controller.ts
│   │   │   │   └── dashboard.controller.spec.ts
│   │   │   ├── services/
│   │   │   │   ├── dashboard.service.ts
│   │   │   │   └── dashboard.service.spec.ts
│   │   │   └── dashboard.module.ts
│   │   │
│   │   └── 🏥 health/               # Módulo de health check
│   │       ├── controllers/
│   │       │   ├── health.controller.ts
│   │       │   └── health.controller.spec.ts
│   │       ├── services/
│   │       │   ├── health.service.ts
│   │       │   └── health.service.spec.ts
│   │       └── health.module.ts
│   │
│   ├── 🏗️ infrastructure/           # Camada de infraestrutura
│   │   ├── database/
│   │   │   ├── database.module.ts
│   │   │   ├── typeorm.config.ts
│   │   │   └── database.service.ts
│   │   ├── queue/
│   │   │   ├── rabbitmq.module.ts
│   │   │   └── rabbitmq.service.ts
│   │   └── logging/
│   │       ├── logger.service.ts
│   │       └── logger.service.spec.ts
│   │
│   ├── 🔗 shared/                   # Interfaces e tipos
│   │   ├── interfaces/
│   │   │   ├── metric-data.interface.ts
│   │   │   ├── project.interface.ts
│   │   │   ├── deduplication.interface.ts
│   │   │   └── queue-job.interface.ts
│   │   ├── types/
│   │   │   ├── metric.types.ts
│   │   │   └── response.types.ts
│   │   └── constants/
│   │       ├── app.constants.ts
│   │       └── queue.constants.ts
│   │
│   ├── app.module.ts                # Módulo raiz
│   └── main.ts                      # Ponto de entrada
│
├── 📜 scripts/                      # Scripts utilitários
│   ├── setup.sh                     # Setup inicial
│   ├── build.sh                     # Build da aplicação
│   ├── start-dev.sh                 # Desenvolvimento
│   └── deploy.sh                    # Deploy
│
├── 📋 Arquivos de configuração
├── .env                             # Variáveis de ambiente (não commitado)
├── .env.example                     # Exemplo de variáveis
├── .gitignore                       # Arquivos ignorados
├── package.json                     # Dependências Node.js
├── tsconfig.json                    # Configuração TypeScript
├── jest.config.js                   # Configuração de testes
├── eslint.config.js                 # Linting
├── prettier.config.js               # Formatação
├── nest-cli.json                    # Configuração NestJS
└── README.md                        # Documentação principal
```

## 🗄️ **Entidades TypeORM Adaptadas**

### **📊 Entidades do Módulo Metrics**
```typescript
// src/modules/metrics/entities/metric.entity.ts
@Entity('metrics')
export class Metric {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project, project => project.metrics)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'recorded_at', type: 'timestamp' })
  recordedAt: Date;

  @Column({ type: 'int' })
  lines: number;

  @Column({ type: 'int' })
  functions: number;

  @Column({ type: 'int' })
  classes: number;

  @Column({ type: 'int' })
  comments: number;

  @Column({ name: 'comment_percentage' })
  commentPercentage: string;

  @OneToOne(() => Dependency, dependency => dependency.metric, { cascade: true })
  dependency: Dependency;

  @OneToOne(() => IndentationAnalysis, analysis => analysis.metric, { cascade: true })
  indentationAnalysis: IndentationAnalysis;

  @OneToOne(() => MetricHash, hash => hash.metric, { cascade: true })
  metricHash: MetricHash;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

// src/modules/metrics/entities/dependency.entity.ts
@Entity('dependencies')
export class Dependency {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Metric, metric => metric.dependency)
  @JoinColumn({ name: 'metric_id' })
  metric: Metric;

  @Column({ name: 'total_count', type: 'int' })
  totalCount: number;

  @OneToMany(() => DependencyItem, item => item.dependency, { cascade: true })
  items: DependencyItem[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

// src/modules/metrics/entities/metric-hash.entity.ts
@Entity('metric_hashes')
export class MetricHash {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ name: 'project_id' })
  projectId: string;

  @Column({ name: 'hash_value', length: 64, unique: true })
  hashValue: string;

  @OneToOne(() => Metric, metric => metric.metricHash)
  @JoinColumn({ name: 'metric_id' })
  metric: Metric;

  @Column({ name: 'metric_id' })
  metricId: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'expires_at', type: 'timestamp', nullable: true })
  expiresAt: Date;

  @Column({ default: 'active' })
  status: string;
}
```

## 🔧 **Configuração TypeORM**

### **database/data-source.ts**
```typescript
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'indicators_db',
  entities: ['src/modules/**/entities/*.entity.ts'],
  migrations: ['database/migrations/*.ts'],
  synchronize: false, // Use migrations em produção
  logging: process.env.NODE_ENV === 'development',
});
```

### **src/infrastructure/database/typeorm.config.ts**
```typescript
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getTypeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [__dirname + '/../../modules/**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../../../database/migrations/*{.ts,.js}'],
  synchronize: configService.get('NODE_ENV') === 'development',
  logging: configService.get('NODE_ENV') === 'development',
});
```

## 🧪 **Organização de Testes**

### **📁 Testes Unitários (Por Módulo)**
```
src/modules/metrics/
├── services/
│   ├── metrics.service.ts
│   ├── metrics.service.spec.ts        ← Teste unitário
│   ├── deduplication.service.ts
│   └── deduplication.service.spec.ts  ← Teste unitário
```

### **🔗 Testes de Integração (Pasta test/)**
```
test/integration/
├── api/
│   ├── metrics.integration.spec.ts    ← Testa endpoints
│   └── projects.integration.spec.ts
└── database/
    └── repository.integration.spec.ts ← Testa repositórios
```

## ⚛️ **Projeto React Separado**

### **🌐 web-dashboard/ Structure**
```typescript
// web-dashboard/src/services/api.service.ts
export class ApiService {
  private baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${this.baseUrl}/api/projects`);
    return response.json();
  }

  async getMetrics(projectId: string): Promise<MetricsResponse> {
    const response = await fetch(`${this.baseUrl}/api/projects/${projectId}/metrics/current`);
    return response.json();
  }

  async submitMetrics(projectId: string, metrics: MetricData): Promise<void> {
    await fetch(`${this.baseUrl}/api/projects/${projectId}/metrics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(metrics),
    });
  }
}
```

## 🚀 **Commands para Setup**

### **1. Criar estrutura TypeORM:**
```bash
# Estrutura base
mkdir -p src/modules/{metrics,projects,queue,cleanup,dashboard,health}
mkdir -p database/{migrations,seeds}
mkdir -p test/{integration,e2e,fixtures}

# Cada módulo com suas pastas
mkdir -p src/modules/metrics/{controllers,services,repositories,dto,entities,processors}

# TypeORM
npm install @nestjs/typeorm typeorm pg
npm install -D @types/pg
```

### **2. Setup React Dashboard:**
```bash
# Criar projeto React separado
cd web-dashboard
npm create react-app . --template typescript
npm install axios recharts @types/recharts
```

### **3. Gerar migrações:**
```bash
npm run typeorm migration:generate database/migrations/CreateProjects
npm run typeorm migration:generate database/migrations/CreateMetrics
npm run typeorm migration:run
```

## 🎯 **Vantagens desta Estrutura**

### **✅ Testes por Módulo:**
- **Proximidade:** Testes junto ao código que testam
- **Organização:** Fácil encontrar teste de qualquer arquivo
- **Manutenção:** Mudança no código = fácil achar teste relacionado

### **✅ TypeORM Benefits:**
- **Decorators:** Syntax mais limpa que Prisma
- **Migrations:** Controle total do schema
- **Relations:** Eager/lazy loading automático
- **Repository Pattern:** Mais adequado para Clean Architecture

### **✅ React Separado:**
- **Independência:** Frontend pode ser deployado separadamente
- **Tecnologia:** Stack moderna (React + TypeScript + Vite)
- **API First:** Força bom design da API

**Esta estrutura está perfeita para impressionar na apresentação acadêmica!** 🎯

## 🎯 **Separação de Responsabilidades**

### **📊 Camada de Apresentação (Controllers)**
```typescript
// Responsabilidade: Receber requisições HTTP, validar entrada, retornar resposta
src/modules/metrics/controllers/metrics.controller.ts
src/modules/projects/controllers/projects.controller.ts
src/modules/dashboard/controllers/dashboard.controller.ts
```

### **🧠 Camada de Negócio (Services)**
```typescript
// Responsabilidade: Lógica de negócio, regras de domínio
src/modules/metrics/services/metrics.service.ts
src/modules/metrics/services/deduplication.service.ts
src/modules/projects/services/projects.service.ts
```

### **💾 Camada de Dados (Repositories)**
```typescript
// Responsabilidade: Acesso ao banco de dados, queries
src/modules/metrics/repositories/metrics.repository.ts
src/modules/projects/repositories/projects.repository.ts
```

### **🏗️ Camada de Infraestrutura**
```typescript
// Responsabilidade: Configurações externas, banco, fila, logs
src/infrastructure/database/prisma.service.ts
src/infrastructure/queue/rabbitmq.module.ts
src/infrastructure/logging/logger.service.ts
```

## 🧩 **Módulos Principais**

### **1. 📊 Metrics Module**
**Responsabilidades:**
- Receber métricas via POST
- Processar deduplicação
- Enfileirar para processamento
- Consultar métricas históricas

**Arquivos principais:**
- `metrics.controller.ts` - Endpoints HTTP
- `metrics.service.ts` - Lógica de negócio
- `deduplication.service.ts` - Algoritmo de hash
- `metrics.processor.ts` - Processamento assíncrono

### **2. 📁 Projects Module**
**Responsabilidades:**
- Gerenciar projetos
- Listar projetos ativos
- Estatísticas por projeto

### **3. 🔄 Queue Module**
**Responsabilidades:**
- Configurar RabbitMQ
- Gerenciar filas
- Health check das filas

### **4. 🧹 Cleanup Module**
**Responsabilidades:**
- Identificar projetos inativos
- Remover dados antigos
- Agendar limpeza automática

### **5. 📈 Dashboard Module**
**Responsabilidades:**
- Servir interface web
- Endpoints para dashboard
- Dados agregados

## 📦 **DTOs (Data Transfer Objects)**

```typescript
// Entrada de dados
src/modules/metrics/dto/submit-metrics.dto.ts
src/modules/projects/dto/create-project.dto.ts

// Saída de dados
src/modules/metrics/dto/metrics-response.dto.ts
src/modules/projects/dto/project-response.dto.ts

// Queries/Filtros
src/modules/metrics/dto/query-metrics.dto.ts
```

## 🗄️ **Entities (Modelo de Dados)**

```typescript
// Entidades do banco
src/modules/metrics/entities/metric.entity.ts
src/modules/metrics/entities/metric-hash.entity.ts
src/modules/projects/entities/project.entity.ts
```

## 🔗 **Interfaces Compartilhadas**

```typescript
// Contratos entre módulos
src/shared/interfaces/metric-data.interface.ts
src/shared/interfaces/deduplication.interface.ts
src/shared/interfaces/queue-job.interface.ts
```

## 🎓 **Benefícios desta Estrutura**

### **✅ Para o Trabalho Acadêmico:**
1. **Modularidade:** Cada funcionalidade isolada
2. **Testabilidade:** Testes organizados por módulo
3. **Manutenibilidade:** Fácil localizar e modificar código
4. **Escalabilidade:** Adicionar novos módulos facilmente
5. **Clean Architecture:** Separação clara de responsabilidades

### **✅ Para Desenvolvimento:**
1. **Padrões NestJS:** Segue convenções do framework
2. **Dependency Injection:** Facilita testes e manutenção
3. **Documentação:** Estrutura autodocumentada
4. **Reusabilidade:** Código compartilhado bem organizado

### **✅ Para Apresentação:**
1. **Demonstra conhecimento** de arquitetura
2. **Fácil explicar** a organização
3. **Mostra boas práticas** de engenharia
4. **Impressiona** pela organização

## 🚀 **Como Implementar**

### **1. Criar estrutura básica:**
```bash
mkdir -p src/{modules/{metrics,projects,queue,cleanup,dashboard,health},infrastructure,shared,common,config}
mkdir -p docs/{architecture,api,deployment}
mkdir -p test/{unit,integration,e2e,fixtures}
mkdir -p web/{public/{css,js},templates}
```

### **2. Inicializar módulos NestJS:**
```bash
nest g module modules/metrics
nest g module modules/projects
nest g module modules/queue
nest g module modules/cleanup
nest g module modules/dashboard
```

### **3. Gerar controllers e services:**
```bash
nest g controller modules/metrics/controllers/metrics --flat
nest g service modules/metrics/services/metrics --flat
nest g service modules/metrics/services/deduplication --flat
```