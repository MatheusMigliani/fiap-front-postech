# FIAP Blog - Monorepo (Apps/Packages Pattern)

Sistema de blogging completo desenvolvido como monorepo profissional usando o padrão **apps/packages** com Turborepo e pnpm workspaces. Este projeto foi desenvolvido como parte do Tech Challenge da Fase 03 da Pós-graduação em Full Stack Development da FIAP.

## 🏗️ Arquitetura

O projeto utiliza uma arquitetura de monorepo com `pnpm workspaces` e `Turborepo` para gerenciar múltiplos pacotes e aplicações de forma eficiente.

```
fiap-blog-monorepo/
├── apps/
│   ├── frontend/              # @fiap-blog/frontend - React + TypeScript
│   └── backend/               # @fiap-blog/backend - Node.js + Express
│
├── packages/
│   ├── shared/                # @fiap-blog/shared - Types & Utils
│   ├── tsconfig/              # @fiap-blog/tsconfig - TS configs
│   └── eslint-config/         # @fiap-blog/eslint-config
│
├── .github/
│   └── workflows/             # CI/CD - GitHub Actions
│
├── Dockerfile                 # Container único para produção
├── docker-compose.yml         # Orquestração local com Docker
└── turbo.json                 # Configuração do Turborepo
```

## 🚀 Tecnologias

### Stack Principal
- **pnpm** com workspaces
- **Turborepo** para build system
- **Docker** & **Docker Compose** para containerização
- **Nginx** como proxy reverso em produção

### Frontend (@fiap-blog/frontend)
- **React 19** & **TypeScript**
- **Vite** como build tool
- **Redux Toolkit** para gerenciamento de estado
- **React Router v7** para navegação
- **Styled Components** para estilização CSS-in-JS
- **Fetch API** para consumo de endpoints REST

### Backend (@fiap-blog/backend)
- **Node.js** & **Express**
- **MongoDB** com **Mongoose**
- **JWT (JSON Web Tokens)** para autenticação
- **Swagger** para documentação da API
- **Jest** para testes

---

## 📦 Instalação e Setup

### Pré-requisitos
- Node.js >= 18.0.0
- pnpm >= 9.0.0
- Docker

```bash
# Instalar pnpm globalmente, caso não tenha
npm install -g pnpm@9
```

### 1. Setup Local (Modo Desenvolvimento)

```bash
# Clone o repositório
git clone https://github.com/MatheusMigliani/fiap-front-postech.git
cd fiap-front-postech

# Instale todas as dependências do workspace
pnpm install

# Inicie o container do MongoDB
docker-compose up -d mongo

# Crie o arquivo .env do backend
# Navegue até a pasta apps/backend, copie .env.example para .env
# e preencha a variável JWT_SECRET com um valor seguro.
# Ex: JWT_SECRET=seu-segredo-super-secreto-de-32-caracteres

# Rode os apps de frontend e backend em modo de desenvolvimento
pnpm dev
```
Após estes passos, a aplicação estará disponível em:
- **Frontend:** `http://localhost:5173`
- **Backend API:** `http://localhost:3000`

### 2. Docker (Modo Produção)
Este é o método recomendado para simular o ambiente de produção.

```bash
# Suba todos os serviços (app + banco de dados)
docker-compose up -d --build

# Ver logs da aplicação
docker-compose logs -f app

# Parar tudo
docker-compose down
```
Acesse a aplicação em **`http://localhost`**.

---

## 🔑 Autenticação

Para acessar as áreas restritas (criação, edição e exclusão de posts), utilize as credenciais do usuário padrão, que é criado automaticamente ao iniciar o backend:

- **Email:** `professor@fiap.com.br`
- **Senha:** `fiap2024`

---

## 🌐 API Endpoints

A documentação completa da API está disponível via Swagger quando o backend está rodando.

**URL Base (Local):** `http://localhost:3000`
**URL Base (Docker):** `/api` (através do proxy Nginx)

**Swagger UI:** `http://localhost:3000/swagger`

### Principais Endpoints
```
# Auth
POST   /api/auth/login      - Realiza login

# Posts
GET    /api/posts           - Lista todos os posts
GET    /api/posts/:id       - Busca um post específico
GET    /api/posts/search    - Busca posts por keyword (?q=termo)
POST   /api/posts           - Cria um novo post (requer auth)
PUT    /api/posts/:id       - Atualiza um post (requer auth)
DELETE /api/posts/:id       - Deleta um post (requer auth)
```

---

## ✅ Desafio Cumprido

O projeto atende a todos os requisitos funcionais, técnicos e entregáveis do Tech Challenge:

- **Funcionais:** Todas as páginas (Home, Leitura, Criação, Edição, Admin) e o fluxo de autenticação estão implementados.
- **Técnicos:** Utiliza React com hooks, Styled Components, Redux Toolkit e consome a API REST.
- **Entregáveis:** O repositório contém `Dockerfile`, `docker-compose.yml` e scripts de CI/CD no diretório `.github/workflows`. A documentação (`README.md`) detalha a arquitetura, setup e fluxos do projeto.

---
**Desenvolvido por:** FIAP Tech Challenge - Fase 3
