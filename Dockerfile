# ==================================
# FIAP Blog - Monorepo Dockerfile
# Frontend (React) + Backend (Node.js)
# ==================================

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend

# Copy frontend dependencies
COPY apps/frontend/package*.json ./
COPY apps/frontend/pnpm-lock.yaml* ./

# Install dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile || npm ci

# Copy frontend source
COPY apps/frontend/ ./

# Build frontend
RUN npm run build

# Stage 2: Prepare Backend
FROM node:18-alpine AS backend-builder

WORKDIR /app/backend

# Copy backend dependencies
COPY apps/backend/package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy backend source
COPY apps/backend/ ./

# Stage 3: Production
FROM node:18-alpine

# Install nginx for serving frontend and proxying backend
RUN apk add --no-cache nginx

# Create app directory
WORKDIR /app

# Copy backend from builder
COPY --from=backend-builder /app/backend ./backend

# Copy frontend build from builder
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Copy nginx configuration
COPY nginx.conf /etc/nginx/http.d/default.conf

# Create nginx directories
RUN mkdir -p /run/nginx /var/log/nginx

# Expose port 80
EXPOSE 80

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'cd /app/backend && node src/app.js &' >> /app/start.sh && \
    echo 'nginx -g "daemon off;"' >> /app/start.sh && \
    chmod +x /app/start.sh

# Healthcheck
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Start both services
CMD ["/app/start.sh"]
