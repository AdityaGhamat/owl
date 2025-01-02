# Base image
FROM node:slim AS base

# Builder stage
FROM base AS builder

# Install dependencies (use libc6 instead of libc6-compat)
RUN apt-get update && apt-get install -y libc6

WORKDIR /app/auth

COPY ../apps/auth ./

RUN npm install

RUN npm run build

# Installation stage
FROM base as installer

RUN apt-get update && apt-get install -y libc6

WORKDIR /app/auth


COPY --from=builder /app/auth .


RUN npm install --production

# Runner stage
FROM base AS runner

WORKDIR /app/auth


RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs


COPY --from=installer --chown=expressjs:nodejs /app/auth /app/auth

EXPOSE 3003

CMD ["node", "index.js"]
