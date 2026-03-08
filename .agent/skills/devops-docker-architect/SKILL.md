---
name: devops-docker-architect
description: "Implementation of DevOps tasks, Docker containerization, CI/CD pipelines, and infrastructure management. Use this skill when writing Dockerfiles, docker-compose.yml files, configuring deployment pipelines, or debugging container networking/resource issues. Relevant keywords: devops, docker, compose, container, kubernetes, ci/cd, pipeline, deployment, infrastructure."
category: process
risk: moderate
tags: "[devops, docker, containerization, ci/cd, infrastructure]"
version: "1.0.0"
---

# DevOps & Docker Architect

## Purpose
This skill provides expertise in containerizing the project using Docker and Docker Compose, optimizing multi-stage builds, hardening container security, and designing continuous deployment pipelines. It strictly applies to the project's requirement of using Docker + Docker Compose.

## When to Use
- Writing or analyzing `Dockerfile`s for the Next.js frontend or FastAPI backend.
- Managing multi-container orchestration via `docker-compose.yml`.
- Troubleshooting container networking, volume mounts, or port bindings.
- Designing CI/CD pipelines (e.g., GitHub Actions or GitLab CI) for automated testing and deployment.
- Optimizing image sizes using multi-stage builds.

## Key Workflow
- [ ] Ensure all Dockerfiles use an optimal base image (e.g., `python:3.12-slim` for backend, `node:18-alpine` for frontend).
- [ ] Implement multi-stage builds strictly to separate `deps` (dependencies), `build` (compilation), and `runtime` stages.
- [ ] Harden security: ALWAYS create and use a non-root user (e.g., `appuser`) inside the container.
- [ ] Setup `HEALTHCHECK` instructions in `Dockerfile`s or Compose files to track service readiness.
- [ ] Keep `.dockerignore` files aggressively pruned to prevent sending unnecessary build context to the daemon.

## Patterns & Examples

### Optimized Next.js Multi-Stage Dockerfile
```dockerfile
# 1. Deps stage
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3. Runtime stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Security: Non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=build /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

### Docker Compose Pattern (Backend + Database)
```yaml
services:
  api:
    build: 
      context: ./backend
      target: runner
    ports:
      - "8000:8000"
    depends_on:
      db:
        condition: service_healthy
    networks:
      - pulse-net

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: game_pulse
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - pulse-net

networks:
  pulse-net:
    driver: bridge

volumes:
  pgdata:
```

## Error Handling
- If a container exits instantly, check the logs via `docker logs <container_id>`. It's often a missing environment variable or a startup command failure.
- Ensure that services communicating locally via Compose use the service name (e.g., `http://db:5432`) rather than `localhost`, as `localhost` inside a container resolves to the container itself.
