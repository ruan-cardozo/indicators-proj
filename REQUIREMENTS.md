# 📊 Desafio Técnico – Servidor de Indicadores de Qualidade de Código

## 🎯 Objetivo Geral

Desenvolver um **servidor web leve e eficiente** que receba, armazene e disponibilize **indicadores de qualidade de projetos de software**, com foco em escalabilidade, estabilidade, simplicidade e boas práticas de projeto técnico.

---

## 📌 Descrição do Desafio

Você deve criar uma aplicação que funcione como **central de recebimento e consulta de métricas de projetos**. A aplicação deve permitir:

- **Receber dados de um projeto** contendo métricas de qualidade (ex: LOC, complexidade, comentários, etc.)
- **Evitar medições duplicadas**
- **Processar medições de forma eficiente**, mesmo sob carga
- **Permitir consulta aos indicadores via API RESTful**
- **Exibir os dados via interface web**
- **Remover automaticamente dados de projetos inativos (>7 dias)**

---

## ⚙️ Requisitos Funcionais

1. ✅ **Receber projetos e métricas via API POST**
2. ✅ **Evitar gravações duplicadas (deduplicação)**
3. ✅ **Armazenar o histórico de métricas por projeto**
4. ✅ **Responder métricas atuais e histórico via API GET**
5. ✅ **Exibir visualização dos dados em interface web**
6. ✅ **Remover dados de projetos inativos por mais de 7 dias**
7. ✅ **Funcionar sem autenticação**

---

## 🛠️ Requisitos Técnicos

- A API deve seguir os **princípios RESTful**
- O processamento deve ser feito via **fila**, desacoplando recebimento e gravação
- O armazenamento deve ser eficiente: **evitar duplicações**, comprimir quando possível
- A interface web pode ser simples, com foco em **clareza e funcionalidade**

---

## 📚 Aprendizados Esperados

Durante o projeto, você deverá aplicar conceitos como:

- **Design de APIs REST**
- **Modelagem de dados escalável**
- **Filas de processamento (Redis, RabbitMQ, etc.)**
- **Deduplicação com hash/timestamp**
- **Agendamento de tarefas**
- **Visualização de métricas com gráficos**
- **Projeto técnico com foco em resiliência**

---

## 🧠 Orientações de Projeto

- Comece pelo **design do modelo de dados** e do fluxo de envio/recebimento
- Escolha uma stack tecnológica que você domina, mas pense **em modularidade**
- Planeje como as métricas serão identificadas, salvas e atualizadas
- Documente **decisões técnicas**, justificando escolhas de ferramentas, estrutura e arquitetura

---