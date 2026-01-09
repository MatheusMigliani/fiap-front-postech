# @fiap-blog/shared

Shared types, interfaces, and utilities for FIAP Blog monorepo.

## Features

- **Shared Types**: TypeScript interfaces for Post, API responses, etc.
- **Utilities**: Common functions (date formatting, validation, etc.)
- **Zero Dependencies**: Lightweight package

## Usage

### In Frontend

```typescript
import { Post, formatDate, truncateText } from '@fiap-blog/shared';

const post: Post = {
  title: 'My Post',
  content: 'Content here',
  author: 'John Doe',
  createdAt: new Date()
};

console.log(formatDate(post.createdAt));
console.log(truncateText(post.content, 100));
```

### In Backend

```javascript
const { formatDate, isValidEmail } = require('@fiap-blog/shared/utils');

// Use utilities
if (isValidEmail(email)) {
  // ...
}
```

## Exports

- `types` - TypeScript interfaces
- `utils` - Utility functions

## Development

```bash
pnpm install
pnpm lint
pnpm type-check
```
