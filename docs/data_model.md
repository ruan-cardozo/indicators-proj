erDiagram
    PROJECT {
        uuid id PK
        string name
        string description
        timestamp created_at
        timestamp updated_at
        timestamp last_metric_at
        boolean is_active
        string repository_url
        json metadata
    }

    METRIC {
        uuid id PK
        uuid project_id FK
        timestamp recorded_at
        integer lines
        integer functions
        integer classes
        integer comments
        string comment_percentage
        timestamp created_at
    }

    DEPENDENCY {
        uuid id PK
        uuid metric_id FK
        string name
        string type
        integer total_count
        timestamp created_at
    }

    DEPENDENCY_ITEM {
        uuid id PK
        uuid dependency_id FK
        string name
        string category
        timestamp created_at
    }

    INDENTATION_ANALYSIS {
        uuid id PK
        uuid metric_id FK
        string directory
        timestamp created_at
    }

    INDENTATION_FILE {
        uuid id PK
        uuid indentation_analysis_id FK
        string filename
        string file_path
        integer max_indent_level
        float average_indent_level
        boolean uses_spaces
        boolean uses_tabs
        boolean mixed_indentation
        timestamp created_at
    }

    INDENT_DISTRIBUTION {
        uuid id PK
        uuid indentation_file_id FK
        integer level
        integer count
        timestamp created_at
    }

    METRIC_HASH {
        uuid id PK
        uuid project_id FK
        string hash_value
        timestamp created_at
        timestamp expires_at
        string status
    }

    %% Relacionamentos
    PROJECT ||--o{ METRIC : "has many"
    PROJECT ||--o{ METRIC_HASH : "has many"
    
    METRIC ||--|| DEPENDENCY : "has one"
    METRIC ||--|| INDENTATION_ANALYSIS : "has one"
    METRIC ||--|| METRIC_HASH : "generates"
    
    DEPENDENCY ||--o{ DEPENDENCY_ITEM : "has many"
    
    INDENTATION_ANALYSIS ||--o{ INDENTATION_FILE : "has many"
    INDENTATION_FILE ||--o{ INDENT_DISTRIBUTION : "has many"