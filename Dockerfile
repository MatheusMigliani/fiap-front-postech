# ==================================
# FIAP Blog - Monorepo Dockerfile
# Frontend (React) + Backend (Node.js)
# Otimizado para pnpm workspaces
# ==================================

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy frontend package files
COPY apps/frontend/package.json apps/frontend/pnpm-lock.yaml* ./apps/frontend/

# Install dependencies using pnpm workspaces
RUN pnpm install --frozen-lockfile --filter frontend

# Copy frontend source
COPY apps/frontend ./apps/frontend

# Build frontend
WORKDIR /app/apps/frontend
RUN pnpm run build

# Stage 2: Prepare Backend
FROM node:20-alpine AS backend-builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9

# Copy workspace configuration
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy backend package files
COPY apps/backend/package.json ./apps/backend/

# Install production dependencies only
RUN pnpm install --frozen-lockfile --filter backend --prod

# Copy backend source
COPY apps/backend ./apps/backend

# Stage 3: Production
FROM node:20-alpine

# Install nginx and wget for healthcheck
RUN apk add --no-cache nginx wget

# Create app directory
WORKDIR /app

# Copy backend from builder (with node_modules)
COPY --from=backend-builder /app/apps/backend ./backend

# Copy frontend build from builder
COPY --from=frontend-builder /app/apps/frontend/dist ./frontend/dist

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create nginx directories
RUN mkdir -p /run/nginx /var/log/nginx

# Expose port 80
EXPOSE 80

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'echo "Starting Backend API..."' >> /app/start.sh && \
    echo 'cd /app/backend && NODE_ENV=${NODE_ENV:-production} node src/app.js &' >> /app/start.sh && \
    echo 'echo "Starting Nginx..."' >> /app/start.sh && \
    echo 'nginx -g "daemon off;"' >> /app/start.sh && \
    chmod +x /app/start.sh

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/health || exit 1

# Start both services
CMD ["/app/start.sh"]
