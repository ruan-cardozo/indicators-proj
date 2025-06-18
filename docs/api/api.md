# Receber métricas
POST /api/projects/{id}/metrics

```json
{
  "timestamp": "2024-06-10T14:30:00Z",
  "metrics": {
    "lines": 1500,
    "functions": 300,
    "classes": 50,
    "comments": 200,
    "comment_percentage": "1.63%",
    "dependencies": {
        "dependencies": [
            "express",
            "cors",
            "cookie-parser",
            "express-fileupload",
            "helmet"
        ],
        "native_modules": [
            "crypto",
            "fs",
            "path"
        ],
        "total_dependencies": 5
    },
    "indentation": {
      "directory": "javascript-tests/",
      "files": [
        {
          "filename": "test.js",
          "path": "javascript-tests/test.js",
          "stats": {
            "maxIndentLevel": 16,
            "averageIndentLevel": 6.405228758169935,
            "indentDistribution": [
              {
                "level": 0,
                "count": 24
              },
              {
                "level": 4,
                "count": 32
              },
              {
                "level": 8,
                "count": 78
              },
              {
                "level": 10,
                "count": 2
              },
              {
                "level": 12,
                "count": 16
              },
              {
                "level": 16,
                "count": 1
              }
            ],
            "usesSpaces": true,
            "usesTabs": true,
            "mixedIndentation": true
          }
        }
      ]
    }
  }
}
```

# Consultar métricas atuais
GET /api/projects/{id}/metrics/current

# Consultar histórico
GET /api/projects/{id}/metrics/history

# Listar projetos
GET /api/projects