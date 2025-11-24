# ---- Base image với pnpm qua corepack ----
FROM node:20-alpine AS base

# Bật corepack và kích hoạt pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Builder stage: build NestJS app ----
FROM base AS builder

WORKDIR /app

# Copy file lock + package để install nhanh và cache tốt
COPY package.json pnpm-lock.yaml ./

# Cài toàn bộ dependency (dev + prod)
RUN pnpm install --frozen-lockfile

# Copy source & config cần thiết
COPY tsconfig*.json ./
COPY nest-cli.json ./
COPY src ./src

# Build Nest
RUN pnpm run build

# ---- Production stage ----
FROM base AS production

WORKDIR /app
ENV NODE_ENV=production

# Cài dumb-init để xử lý signal (cho đẹp)
RUN apk add --no-cache dumb-init

# Tạo user non-root
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nestjs -u 1001

# Copy package + lockfile để install prod deps
COPY package.json pnpm-lock.yaml ./

# Cài chỉ production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy build output từ builder
COPY --from=builder --chown=nestjs:nodejs /app/dist ./dist

USER nestjs

EXPOSE 8000

# Healthcheck đơn giản
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const http=require('http');const opt={host:'localhost',port:8000,path:'/',timeout:2000};const r=http.request(opt,res=>{process.exit(res.statusCode===200?0:1)});r.on('error',()=>process.exit(1));r.end();"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/main.js"]
