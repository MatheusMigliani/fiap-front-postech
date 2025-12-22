# FIAP Blog - Tech Challenge Fase 03

Sistema de blogging desenvolvido com React + TypeScript + Redux Toolkit.

## 🚀 Tecnologias

- React 19 + TypeScript 5.9
- Redux Toolkit - Gerenciamento de estado
- React Router v7 - Navegação
- Styled Components - Estilização
- Axios - Cliente HTTP
- React Hook Form + Zod - Validação
- React Toastify - Notificações

## 📦 Instalação

```bash
# Instalar dependências
pnpm install

# Configurar variáveis de ambiente (já criado)
# .env.local está configurado com API em http://localhost:3000

# Executar servidor de desenvolvimento
pnpm dev
```

## 🔑 Credenciais de Teste

- **Email:** professor@fiap.com.br
- **Senha:** fiap2024

## ✅ Funcionalidades Implementadas

### Fundação Completa
- [x] Sistema de design (theme, breakpoints, global styles)
- [x] Redux Toolkit (auth, posts, ui slices)
- [x] API Layer com Axios
- [x] Sistema de tipos TypeScript
- [x] Custom hooks (useAuth, useDebounce)
- [x] Roteamento com proteção
- [x] Validação de formulários (Zod)

### Páginas Básicas
- [x] Home - Lista de posts
- [x] Login - Autenticação
- [x] Layout com navegação
- [x] Proteção de rotas

### 🚧 Próximos Passos
- [ ] Componentes de posts (PostCard, PostList, PostForm, SearchBar)
- [ ] Páginas completas (PostDetail, CreatePost, EditPost, AdminPanel)
- [ ] Componentes comuns estilizados (Button, Input, Card, Loading)

## 🔧 Scripts

```bash
pnpm dev      # Servidor de desenvolvimento
pnpm build    # Build de produção
pnpm lint     # Verificar código
pnpm preview  # Preview do build
```

## 🌐 API

**Base URL:** http://localhost:3000

**Endpoints:**
- GET /posts - Lista posts
- GET /posts/:id - Post específico
- POST /posts - Criar
- PUT /posts/:id - Atualizar
- DELETE /posts/:id - Deletar
- GET /posts/search?q=termo - Buscar

**Swagger:** http://localhost:3000/swagger

## 🔐 Autenticação Mock

Sistema com localStorage para desenvolvimento.
**⚠️ Em produção, substituir por autenticação real.**

## 📚 Documentação

- [Plano Completo](./.claude/plans/prancy-brewing-knuth.md)
- [Requisitos](./projeto.md)

## 📄 Licença

Projeto acadêmico - FIAP 2024
