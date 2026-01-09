# Packages

Internal packages shared across the FIAP Blog monorepo.

## Structure

```
packages/
├── shared/             # Shared types and utilities
├── eslint-config/      # ESLint configurations
└── tsconfig/           # TypeScript configurations
```

## Packages

### [@fiap-blog/shared](./shared)

Shared types, interfaces, and utilities.

**Includes:**
- TypeScript types (`Post`, `ApiResponse`, etc.)
- Date utilities (`formatDate`, `formatRelativeTime`)
- Validation utilities (`isValidEmail`, `sanitizeHtml`)

### [@fiap-blog/eslint-config](./eslint-config)

Shared ESLint configurations for consistent code style.

### [@fiap-blog/tsconfig](./tsconfig)

Shared TypeScript configurations.

**Includes:**
- `base.json` - Base configuration
- `react.json` - React-specific configuration
- `node.json` - Node.js-specific configuration

## Usage

Packages are referenced using pnpm workspaces:

```json
{
  "dependencies": {
    "@fiap-blog/shared": "workspace:*"
  },
  "devDependencies": {
    "@fiap-blog/tsconfig": "workspace:*"
  }
}
```

## Development

All packages are automatically linked when you run:

```bash
pnpm install
```

## Adding a New Package

1. Create a new directory in `packages/`
2. Add `package.json` with `@fiap-blog/` prefix
3. Update `pnpm-workspace.yaml` if needed (already includes `packages/*`)
4. Install dependencies in the root

```bash
pnpm install
```

## Benefits

- **Shared Code**: No duplication between apps
- **Type Safety**: Shared TypeScript types
- **Consistency**: Shared configurations
- **Fast Builds**: Turborepo caches builds
