# ==================== Base ====================
FROM node:22-alpine AS base
ENV TZ=UTC
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# ==================== Dependencies ====================
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ==================== Build ====================
FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# ==================== Production ====================
FROM base AS production
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./

USER node
EXPOSE 3000

CMD ["node", "dist/main.js"]

# ==================== Development ====================
FROM base AS development
ENV NODE_ENV=development

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["pnpm", "start:dev"]
