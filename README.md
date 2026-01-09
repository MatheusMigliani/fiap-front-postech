# FIAP Blog - Monorepo (Apps/Packages Pattern)

Sistema de blogging completo desenvolvido como monorepo profissional usando o padrão **apps/packages** com Turborepo e pnpm workspaces.

## 🏗️ Arquitetura Apps/Packages

```
fiap-blog-monorepo/
├── apps/
│   ├── frontend/              # @fiap-blog/frontend - React + TypeScript
│   │   ├── src/
│   │   ├── public/
│   │   └── package.json
│   │
│   └── backend/               # @fiap-blog/backend - Node.js + Express
│       ├── src/
│       └── package.json
│
├── packages/
│   ├── shared/                # @fiap-blog/shared - Types & Utils
│   │   ├── src/types/
│   │   └── src/utils/
│   │
│   ├── tsconfig/              # @fiap-blog/tsconfig - TS configs
│   │   ├── base.json
│   │   ├── react.json
│   │   └── node.json
│   │
│   └── eslint-config/         # @fiap-blog/eslint-config
│       └── index.js
│
├── pnpm-workspace.yaml        # pnpm workspaces
├── turbo.json                 # Turborepo config
├── Dockerfile                 # Container único
├── docker-compose.yml
└── package.json               # Root scripts
```

## 🚀 Tecnologias

### Stack Principal
- **pnpm** - Package manager com workspaces
- **Turborepo** - Build system para monorepos
- **Docker** - Containerização
- **Nginx** - Proxy reverso

### Frontend (@fiap-blog/frontend)
- React 19 + TypeScript 5.9
- Redux Toolkit - Estado
- React Router v7 - Navegação
- Styled Components - CSS-in-JS
- Vite - Build tool
- Zod + React Hook Form - Validação

### Backend (@fiap-blog/backend)
- Node.js 18 + Express 5
- MongoDB + Mongoose
- Swagger UI - Documentação
- Jest - Testes

### Packages Internos
- **@fiap-blog/shared** - Types e utils compartilhados
- **@fiap-blog/tsconfig** - Configs TypeScript
- **@fiap-blog/eslint-config** - Configs ESLint

## 📦 Instalação

### Pré-requisitos
- Node.js >= 18.0.0
- pnpm >= 9.0.0

```bash
# Instalar pnpm globalmente
npm install -g pnpm@9
```

### Setup Local

```bash
# 1. Instalar todas dependências (apps + packages)
pnpm install

# 2. Iniciar MongoDB
docker run -d -p 27017:27017 --name mongo mongo:7-jammy

# 3. Rodar em modo desenvolvimento
pnpm dev
```

Isso inicia:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Docker (Recomendado)

```bash
# Build e start do container único
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Parar
docker-compose down
```

Acesse: **http://localhost**
- Frontend: `/`
- Backend API: `/api/*`
- Health Check: `/health`

## 🔧 Scripts Turborepo

### Global (root)

```bash
# Desenvolvimento
pnpm dev                  # Roda todos os apps
pnpm dev:frontend         # Apenas frontend
pnpm dev:backend          # Apenas backend

# Build
pnpm build                # Build de tudo
pnpm build:frontend       # Build do frontend
pnpm build:backend        # Build do backend

# Qualidade
pnpm lint                 # Lint em tudo
pnpm type-check           # Type check
pnpm test                 # Testes

# Limpeza
pnpm clean                # Remove builds e node_modules

# Formatação
pnpm format               # Prettier em todo código
```

### Por App

```bash
# Frontend
cd apps/frontend
pnpm dev                  # Vite dev server
pnpm build                # Production build
pnpm lint                 # ESLint
pnpm type-check           # TypeScript check

# Backend
cd apps/backend
pnpm dev                  # Nodemon
pnpm start                # Production
pnpm test                 # Jest
pnpm swagger              # Gerar docs
```

## 📚 Packages Compartilhados

### @fiap-blog/shared

Types e utilities compartilhados entre front e back.

**Usage:**
```typescript
import { Post, formatDate, truncateText } from '@fiap-blog/shared';

const post: Post = {
  title: 'My Post',
  content: 'Long content...',
  author: 'John',
  createdAt: new Date()
};

console.log(formatDate(post.createdAt)); // "08/01/2026 às 23:45"
console.log(truncateText(post.content, 100)); // "Long content... (truncated)..."
```

**Exports:**
- `types` - `Post`, `ApiResponse`, `CreatePostDto`, etc.
- `utils/date` - `formatDate`, `formatRelativeTime`
- `utils/validation` - `isValidEmail`, `sanitizeHtml`, `slugify`

Ver mais: [packages/shared/README.md](packages/shared/README.md)

### @fiap-blog/tsconfig

Configurações TypeScript compartilhadas.

**Usage:**
```json
{
  "extends": "@fiap-blog/tsconfig/react.json"
}
```

### @fiap-blog/eslint-config

Configurações ESLint compartilhadas.

## 🌐 API Endpoints

**Base URL:** `http://localhost/api`

### Posts
```
GET    /api/posts           - Lista posts
GET    /api/posts/:id       - Post específico
GET    /api/posts/search    - Busca (?q=termo)
POST   /api/posts           - Criar post
PUT    /api/posts/:id       - Atualizar
DELETE /api/posts/:id       - Deletar
```

### Health
```
GET    /api/health          - Status API
GET    /health              - Status container
```

**Swagger:** http://localhost:3000/swagger

## 🐳 Docker

### Container Único

Um único container executa:
1. **Nginx** (port 80) - Serve frontend + proxy backend
2. **Node.js** (port 3000) - Backend API
3. **Frontend build** - Arquivos estáticos

### Roteamento Nginx

```nginx
/              → apps/frontend/dist (React SPA)
/api/*         → localhost:3000 (Node.js API)
/health        → Nginx health check
```

### Build Multi-stage

```dockerfile
Stage 1: Build Frontend
Stage 2: Build Backend
Stage 3: Production (Nginx + Node + Frontend build)
```

## ⚡ Turborepo

Turborepo cacheia builds para velocidade máxima.

### Pipeline

```json
{
  "build": {
    "dependsOn": ["^build"],           // Build dependencies first
    "outputs": ["dist/**"]
  },
  "dev": {
    "cache": false,
    "persistent": true                  // Keep running
  }
}
```

### Benefícios

- ✅ **Cache inteligente** - Não rebuilda o que não mudou
- ✅ **Parallel execution** - Roda tasks em paralelo
- ✅ **Dependency graph** - Entende ordem de builds
- ✅ **Remote caching** - Compartilha cache entre devs

## 🔑 Configuração

### Variáveis de Ambiente

**Backend (.env):**
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/fiap-blog
```

**Frontend (.env.local):**
```env
VITE_API_URL=/api
```

## ✅ Funcionalidades

### Frontend
- [x] Autenticação de professores
- [x] Lista de posts com busca
- [x] CRUD completo de posts
- [x] Painel administrativo
- [x] Design responsivo
- [x] Types compartilhados

### Backend
- [x] API REST completa
- [x] CRUD de posts
- [x] Busca por keywords
- [x] Validação de dados
- [x] Swagger docs
- [x] Health checks
- [x] Types compartilhados

## 🧪 Testes

```bash
# Todos os testes
pnpm test

# Backend tests
cd apps/backend
pnpm test
pnpm test:watch
```

## 📊 Vantagens do Apps/Packages

### Antes (Simples Monorepo)
- ❌ Código duplicado entre apps
- ❌ Types não compartilhados
- ❌ Configs duplicadas
- ❌ Sem cache de builds

### Depois (Apps/Packages)
- ✅ **Zero duplication** - Packages compartilhados
- ✅ **Type safety** - Types compartilhados entre front/back
- ✅ **Consistency** - Configs centralizadas
- ✅ **Fast builds** - Turborepo cache
- ✅ **Scalable** - Fácil adicionar novos apps/packages

## 🚀 Deploy

### Desenvolvimento
```bash
docker-compose up -d
```

### Produção

```bash
# Build imagem
docker build -t fiap-blog:latest .

# Run
docker run -p 80:80 \
  -e MONGODB_URI=mongodb://mongo:27017/fiap-blog \
  fiap-blog:latest
```

### Docker Hub/GHCR
```bash
# Pull
docker pull ghcr.io/<usuario>/fiap-blog:latest

# Run
docker-compose up -d
```

## 🤝 Contribuindo

### Adicionando um App

```bash
cd apps/
mkdir new-app
cd new-app
pnpm init
# Adicione "@new-app" ao name
# Adicione deps: pnpm add @fiap-blog/shared
```

### Adicionando um Package

```bash
cd packages/
mkdir new-package
cd new-package
pnpm init
# Adicione "@fiap-blog/new-package" ao name
```

Turborepo automaticamente detecta novos apps/packages.

## 📈 Performance

### Build Times (com Turborepo cache)

- **Cold build:** ~2-3 min
- **Cached build:** ~5-10s ⚡
- **Incremental:** ~30s

### Docker Image Size

- **Multi-stage:** ~150MB
- **Production only:** Sem dev dependencies

## 🔒 Segurança

- Headers de segurança (Nginx)
- CORS configurado
- Input validation (Express Validator + Zod)
- Dependências auditadas (pnpm audit)
- Types seguros compartilhados

## 📄 Licença

Projeto acadêmico - FIAP 2024

## 🎓 Tech Challenge - Fase 03

Requisitos atendidos:
- ✅ Frontend React responsivo
- ✅ Backend Node.js REST API
- ✅ Integração frontend-backend
- ✅ Docker + Docker Compose
- ✅ CI/CD completo
- ✅ **Arquitetura apps/packages profissional**
- ✅ **Turborepo para builds rápidos**
- ✅ **Packages compartilhados**
- ✅ **Type safety entre apps**

---

**Desenvolvido por:** FIAP Tech Challenge - Fase 3
**Arquitetura:** Apps/Packages Pattern com Turborepo
**Ano:** 2024
