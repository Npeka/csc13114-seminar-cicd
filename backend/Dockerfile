# Multi-stage build for NestJS application
FROM node:18-alpine AS builder

# Enable corepack and activate pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy package files and pnpm lockfile (required for reproducible installs)
COPY package.json pnpm-lock.yaml ./

# Enable corepack and activate pnpm, then install all deps (including dev) using pnpm
# corepack is included in modern Node images; prepare/activate pnpm to ensure it's available

RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && pnpm install --frozen-lockfile

# Copy source code and build config
COPY src/ src/
COPY tsconfig*.json ./
COPY nest-cli.json ./

# Build the application with pnpm
RUN pnpm run build

# Production stage
FROM node:18-alpine AS production

# Create app directory
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Copy package files and pnpm lockfile for production installs
COPY package.json pnpm-lock.yaml ./

# Enable corepack and activate pnpm, then install only production deps
RUN corepack enable \
  && corepack prepare pnpm@latest --activate \
  && pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 8000

# Health check (use JSON form to avoid Dockerfile parsing issues)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD ["node","-e","const http = require('http'); const options = { host: 'localhost', port: 8000, path: '/api/health', timeout: 2000 }; const request = http.request(options, (res) => { if (res.statusCode === 200) process.exit(0); else process.exit(1); }); request.on('error', () => process.exit(1)); request.end();"]

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]