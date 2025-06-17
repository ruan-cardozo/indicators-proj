graph TB
    CLIENT[Cliente/CI] --> API[NestJS API]
    API --> QUEUE[RabbitMQ]
    API --> DB[(PostgreSQL)]
    QUEUE --> WORKER[Worker/Processor]
    WORKER --> DB
    
    subgraph "Funcionalidades"
        API --> RECV[Receber Métricas]
        API --> QUERY[Consultar Métricas]
        WORKER --> DEDUP[Deduplicação]
        WORKER --> CLEAN[Limpeza Auto]
    end