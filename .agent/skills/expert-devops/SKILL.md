---
name: expert-devops
description: "DevOps Expert for CI/CD pipelines, Docker, deployment, infrastructure, monitoring, and cloud operations. Triggers: deploy, CI/CD, pipeline, docker, kubernetes, infrastructure, monitoring, terraform, ansible, github actions, gitlab ci"
category: domain
risk: high
tags: "[devops, cicd, docker, kubernetes, infrastructure, deployment, monitoring]"
version: "1.0.0"
---

# Expert: DevOps

> The DevOps Expert designs CI/CD pipelines, manages Docker containers, deploys to production, sets up monitoring, and automates infrastructure. Masters GitHub Actions, Docker, Kubernetes, Terraform, and cloud platforms.

## When to Activate

Automatically trigger when detecting:
- **CI/CD** - "CI/CD", "pipeline", "github actions", "gitlab ci", "jenkins"
- **Deployment** - "deploy", "release", "production", "staging"
- **Containers** - "docker", "container", "docker-compose", "kubernetes", "k8s"
- **Infrastructure** - "infrastructure", "terraform", "ansible", "cloudformation"
- **Monitoring** - "monitoring", "logging", "observability", "prometheus", "grafana"
- **Cloud** - "AWS", "GCP", "Azure", "cloud", "serverless"

## Core Responsibilities

1. **CI/CD Pipelines** → Build, test, deploy automation
2. **Containerization** → Docker, Docker Compose
3. **Deployment** → Production releases, rollback strategies
4. **Infrastructure** → IaC (Terraform, Ansible)
5. **Monitoring** → Metrics, logs, alerts
6. **Security** → Secrets management, vulnerability scanning

---

## Workflow

### Phase 1: Pipeline Design

```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.12'
          
      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          pip install -r requirements-dev.txt
          
      - name: Run linters
        run: |
          ruff check .
          mypy .
          
      - name: Run tests
        run: pytest --cov=app --cov-report=xml
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.xml

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: |
          docker build -t app:${{ github.sha }} .
          docker tag app:${{ github.sha }} app:latest
          
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_TOKEN }} | docker login -u user --password-stdin
          docker push app:${{ github.sha }}

  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - name: Deploy to staging
        run: |
          kubectl set image deployment/app app=app:${{ github.sha }} -n staging
          kubectl rollout status deployment/app -n staging

  deploy-production:
    needs: deploy-staging
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/app app=app:${{ github.sha }} -n production
          kubectl rollout status deployment/app -n production
```

### Phase 2: Docker Configuration

**Dockerfile:**
```dockerfile
# Dockerfile
FROM python:3.12-slim as builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Production image
FROM python:3.12-slim

WORKDIR /app

# Copy only necessary files
COPY --from=builder /root/.local /root/.local
COPY ./app ./app

# Make sure scripts are executable
ENV PATH=/root/.local/bin:$PATH

# Non-root user for security
RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/app
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    volumes:
      - ./app:/app/app  # Dev hot-reload

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: app
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  worker:
    build: .
    command: taskiq worker app.tasks:broker
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/app
    depends_on:
      - db
      - redis

volumes:
  postgres_data:
```

### Phase 3: Infrastructure as Code

**Terraform:**
```hcl
# terraform/main.tf
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"
  
  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# ECS Service
resource "aws_ecs_service" "app" {
  name            = "${var.project_name}-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"
  
  network_configuration {
    subnets          = var.subnet_ids
    security_groups  = [aws_security_group.app.id]
    assign_public_ip = true
  }
  
  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 8000
  }
}
```

### Phase 4: Monitoring Setup

**Prometheus + Grafana:**
```yaml
# docker-compose.monitoring.yml
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin

  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - ./loki-config.yml:/etc/loki/local-config.yaml

volumes:
  prometheus_data:
  grafana_data:
```

**App Metrics (Python):**
```python
# app/core/metrics.py
from prometheus_client import Counter, Histogram, generate_latest

# Metrics
REQUEST_COUNT = Counter(
    'http_requests_total',
    'Total HTTP requests',
    ['method', 'endpoint', 'status']
)

REQUEST_DURATION = Histogram(
    'http_request_duration_seconds',
    'HTTP request duration',
    ['method', 'endpoint']
)

@app.middleware("http")
async def metrics_middleware(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    duration = time.time() - start
    
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.url.path,
        status=response.status_code
    ).inc()
    
    REQUEST_DURATION.labels(
        method=request.method,
        endpoint=request.url.path
    ).observe(duration)
    
    return response

@app.get("/metrics")
async def metrics():
    return Response(generate_latest(), media_type="text/plain")
```

---

## Output Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| CI/CD Config | `.github/workflows/` | YAML |
| Docker | `Dockerfile`, `docker-compose.yml` | Docker |
| Infrastructure | `terraform/`, `ansible/` | HCL/YAML |
| Monitoring | `monitoring/` | YAML |
| Scripts | `scripts/` | Shell/Python |

---

## Collaboration

```
DevOps Expert → Orchestrator
    ↓
├─→ Tech Architect (infrastructure requirements)
├─→ Dev Expert (deployment needs, health checks)
├─→ QA Engineer (test environments, gates)
└─→ PO Expert (release planning)
```

---

## Best Practices

### ✅ DO
- Automate everything
- Infrastructure as Code
- Immutable deployments
- Monitor everything
- Security by default
- Document runbooks

### ❌ DON'T
- Manual deployments
- Secrets in code
- Skip staging environment
- Ignore alerts
- Big bang releases

---

## Deployment Strategies

| Strategy | Use Case | Risk |
|----------|----------|------|
| **Rolling** | Standard update | Low |
| **Blue/Green** | Zero downtime | Medium |
| **Canary** | Gradual rollout | Low |
| **Feature Flags** | A/B testing | Low |

---

## Deployment Strategies

### Strategy Comparison

| Strategy | Downtime | Risk | Complexity | Use Case |
|----------|----------|------|------------|----------|
| **Recreate** | High | High | Low | Dev environments |
| **Rolling** | Low | Medium | Low | Standard updates |
| **Blue/Green** | None | Low | Medium | Critical systems |
| **Canary** | None | Very Low | High | Risky changes |
| **Feature Flags** | None | Low | Medium | A/B testing |

### Blue/Green Deployment

```yaml
# Kubernetes Blue/Green
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-blue
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: blue
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: app-green
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
      version: green
---
apiVersion: v1
kind: Service
metadata:
  name: app-service
spec:
  selector:
    app: myapp
    version: blue  # Switch to green after validation
```

**Process:**
1. Deploy green version alongside blue
2. Test green internally
3. Switch service selector to green
4. Monitor for issues
5. Rollback: switch back to blue

### Canary Deployment

```yaml
# Kubernetes Canary with Flagger
apiVersion: flagger.app/v1beta1
kind: Canary
metadata:
  name: myapp
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  service:
    port: 80
  analysis:
    interval: 30s
    threshold: 5
    maxWeight: 50
    stepWeight: 10
    metrics:
    - name: request-success-rate
      thresholdRange:
        min: 99
    - name: request-duration
      thresholdRange:
        max: 500
```

**Process:**
1. Deploy canary (5% traffic)
2. Monitor metrics
3. Gradually increase (5% → 25% → 50% → 100%)
4. Auto-rollback if errors detected

### Feature Flags

```python
# Backend feature flag check
from launchdarkly_client import get_client

ld_client = get_client()

def new_feature_endpoint(user_id: str):
    flag_value = ld_client.variation(
        "new-feature", 
        {"key": user_id}, 
        False
    )
    
    if flag_value:
        return new_implementation()
    else:
        return old_implementation()
```

**Benefits:**
- Deploy without releasing
- Gradual rollout
- Instant rollback
- A/B testing

### Database Migrations

**Zero-Downtime Migration Pattern:**

```
Phase 1: Expand (Deploy)
- Add new column/table
- Dual-write to old and new
- Read from old

Phase 2: Migrate (Background)
- Backfill data
- Verify consistency

Phase 3: Contract (Deploy)
- Switch read to new
- Stop writing to old
- Remove old column (later)
```

**Migration Safety Checklist:**
- [ ] Backward compatible
- [ ] Rollback script tested
- [ ] Run in transaction (if small)
- [ ] Run offline (if large)
- [ ] Data validation
- [ ] Monitor duration

### Rollback Procedures

**Automatic Rollback Triggers:**
- Error rate > 1%
- P95 latency > 2× baseline
- Failed health checks
- Manual trigger

**Rollback Commands:**
```bash
# Kubernetes
kubectl rollout undo deployment/myapp

# Docker Compose
docker-compose up -d --no-deps --build myapp

# AWS ECS
aws ecs update-service --service myapp --task-definition myapp:PREVIOUS
```
