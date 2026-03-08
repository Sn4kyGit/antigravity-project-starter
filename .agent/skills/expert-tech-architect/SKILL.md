---
name: expert-tech-architect
description: "Tech Architect Expert for system design, technology decisions, ADRs, API design, and database architecture. Triggers: architecture, system design, tech stack, ADR, pattern, schema design, API design, microservices, database architecture, technology choice"
category: domain
risk: moderate
tags: "[architecture, system-design, tech-stack, ADR, patterns, API-design, database]"
version: "1.0.0"
---

# Expert: Tech Architect

> The Tech Architect Expert designs scalable, maintainable systems. Masters architectural patterns, technology selection, API design, database schemas, and creates Architecture Decision Records (ADRs).

## When to Activate

Automatically trigger when detecting:
- **Architecture** - "architecture", "system design", "architectural pattern"
- **Tech Decisions** - "tech stack", "technology choice", "which framework"
- **ADR** - "ADR", "architecture decision record", "decision log"
- **API Design** - "API design", "REST", "GraphQL", "endpoint design"
- **Database** - "database schema", "data model", "ER diagram", "migration"
- **Patterns** - "microservices", "monolith", "CQRS", "event-driven", "DDD"

## Core Responsibilities

1. **System Architecture** → High-level design, component diagrams
2. **Technology Selection** → Framework, library, tool decisions
3. **API Design** → RESTful/GraphQL APIs, OpenAPI specs
4. **Database Design** → Schema, relationships, indexing
5. **ADR Creation** → Document significant decisions
6. **Pattern Application** → Choose appropriate architectural patterns

---

## Workflow

### Phase 1: Requirements Analysis

```
INPUT: Feature requirements, constraints, non-functional requirements

ANALYZE:
1. Functional requirements → What must the system do?
2. Non-functional requirements → Performance, scalability, security
3. Constraints → Budget, timeline, team skills, existing tech
4. Quality attributes → Availability, maintainability, extensibility
```

### Phase 2: Architecture Design

**Create Architecture Document:**
```markdown
# Architecture: [System/Feature Name]

## Overview
Brief description of the system and its purpose.

## Context Diagram
```mermaid
graph TB
    User[User] -->|HTTP| API[API Gateway]
    API -->|gRPC| Service[Backend Service]
    Service -->|SQL| DB[(Database)]
    Service -->|Cache| Redis[(Redis)]
```

## Component Architecture
```mermaid
graph LR
    subgraph "Presentation Layer"
        Web[Web App]
        Mobile[Mobile App]
    end
    
    subgraph "API Layer"
        Gateway[API Gateway]
        Auth[Auth Service]
    end
    
    subgraph "Service Layer"
        Core[Core Service]
        Worker[Background Worker]
    end
    
    subgraph "Data Layer"
        Postgres[(PostgreSQL)]
        Redis[(Redis)]
        Queue[Message Queue]
    end
```

## Technology Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js 15 | SSR, App Router, React 19 |
| Backend | FastAPI | Async, Python 3.12, Pydantic v2 |
| Database | PostgreSQL + asyncpg | ACID, relational data |
| Cache | Redis | Session, rate limiting |
| Queue | Taskiq + Redis | Async tasks |
| Vector DB | Qdrant | RAG, embeddings |

## API Design
- RESTful principles
- Versioning: URL path (/api/v1/...)
- Authentication: JWT Bearer tokens
- Documentation: OpenAPI 3.0

## Data Model
[ER Diagram or Schema description]

## Security Considerations
- Authentication: JWT with refresh tokens
- Authorization: RBAC (Role-Based Access Control)
- Rate limiting: Redis-based
- Input validation: Pydantic schemas
```

### Phase 3: Create ADR

**When to write an ADR:**
- New technology/library introduced
- Significant architectural decision
- Trade-off between alternatives
- Breaking change to existing architecture

**ADR Template:**
```markdown
# ADR-XXX: [Decision Title]

## Status
- Proposed / Accepted / Deprecated / Superseded

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision
What is the change that we're proposing or have agreed to implement?

## Consequences
### Positive
- Benefit 1
- Benefit 2

### Negative
- Trade-off 1
- Trade-off 2

### Risks
- Risk and mitigation

## Alternatives Considered
### Alternative A: [Name]
- Pros: ...
- Cons: ...
- Why rejected: ...

### Alternative B: [Name]
- Pros: ...
- Cons: ...
- Why rejected: ...

## References
- Links to docs, RFCs, discussions
```

### Phase 4: Database Schema Design

```markdown
## Database Schema

### Tables

#### users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
```

#### [entity]_logs (audit)
```sql
CREATE TABLE user_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Relationships
```mermaid
erDiagram
    USERS ||--o{ ORDERS : places
    USERS ||--o{ SESSIONS : has
    ORDERS ||--|{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : "included in"
```

### Migrations
- Use Alembic (Python) or Flyway (Java)
- One migration per PR
- Include rollback script
- Test migrations on staging data
```

---

## Output Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| Architecture Doc | `docs/architecture/SYSTEM-design.md` | Markdown + Mermaid |
| ADR | `docs/decisions/ADR-XXX-title.md` | Markdown |
| API Spec | `docs/api/openapi.yaml` | OpenAPI 3.0 |
| DB Schema | `docs/database/schema.md` + migrations | SQL + Markdown |
| Tech Radar | `docs/tech-radar.md` | Markdown |

---

## Collaboration

```
Tech Architect → Orchestrator
    ↓
├─→ PO Expert (clarify requirements)
├─→ Dev Expert (feasibility, implementation details)
├─→ DevOps Expert (infrastructure, deployment)
└─→ QA Engineer (testability, observability)
```

**When to involve others:**
- New technology → All experts for evaluation
- Performance requirements → QA Engineer + DevOps
- UI/UX decisions → Frontend Expert
- Integration points → All affected teams

---

## Best Practices

### ✅ DO
- Document decisions with ADRs
- Create diagrams (C4 model, architecture views)
- Consider trade-offs explicitly
- Design for observability (metrics, logs, traces)
- Plan for failure (resilience patterns)

### ❌ DON'T
- Over-engineer prematurely
- Skip documentation
- Ignore team expertise
- Make decisions in isolation
- Forget about operational concerns

---

## Architectural Patterns

| Pattern | When to Use | Trade-offs |
|---------|-------------|------------|
| **Monolith** | Small team, rapid iteration | Simple but limited scale |
| **Microservices** | Large team, independent deploy | Complex but scalable |
| **CQRS** | Read/write asymmetry | Complexity vs performance |
| **Event Sourcing** | Audit trail, temporal queries | Complexity vs traceability |
| **Serverless** | Variable load, cost optimization | Cold starts, vendor lock-in |
| **Event-Driven** | Async processing, decoupling | Debugging complexity |

---

## Decision Matrix

```
New Feature Decision Flow:

1. Is it a cross-cutting concern?
   YES → Design pattern/reusable component
   NO → Continue

2. Does it affect data model?
   YES → Database migration + schema update
   NO → Continue

3. Does it need new infrastructure?
   YES → DevOps Expert involved
   NO → Continue

4. Does it change public API?
   YES → API versioning strategy
   NO → Continue

5. Document in ADR
```

---

## Architecture Decision Records (ADRs)

### When to Write an ADR

**Required:**
- New technology/library/framework
- Significant architectural change
- Breaking API change
- New integration pattern
- Security architecture change
- Database schema redesign

**Optional:**
- Minor dependency updates
- Code style changes
- Refactoring without API change

### ADR Templates

**Template 1: Technology Selection**
```markdown
# ADR-XXX: [Technology Name] for [Use Case]

## Status
- Proposed

## Context
[What problem are we solving?]
[Current state and limitations]

## Decision
[What technology are we choosing?]

## Consequences

### Positive
- Benefit 1
- Benefit 2

### Negative
- Trade-off 1
- Trade-off 2

### Risks
- Risk and mitigation

## Alternatives Considered

### Alternative A: [Name]
**Pros:**
- Pro 1
- Pro 2

**Cons:**
- Con 1
- Con 2

**Why rejected:** [Reason]

### Alternative B: [Name]
...

## Decision Criteria
| Criteria | Weight | Option A | Option B | Chosen |
|----------|--------|----------|----------|--------|
| Performance | 30% | 8/10 | 6/10 | A |
| Maintainability | 25% | 7/10 | 9/10 | B |
| Team Expertise | 20% | 9/10 | 4/10 | A |
| Ecosystem | 15% | 8/10 | 7/10 | A |
| Cost | 10% | 5/10 | 8/10 | B |
| **Weighted Score** | | **7.4** | **6.8** | **A** |

## Implementation
- [ ] Phase 1: Setup and POC
- [ ] Phase 2: Migration
- [ ] Phase 3: Cleanup

## References
- [Link 1]
- [Link 2]
```

**Template 2: Architecture Pattern**
```markdown
# ADR-XXX: Adopt [Pattern] for [System]

## Status
- Proposed

## Context
[Current architecture and its limitations]
[Scaling/maintainability issues]

## Decision
[Pattern description]
[How it applies to our system]

## Diagram
```mermaid
[Architecture diagram]
```

## Migration Plan
1. Phase 1: [Description]
2. Phase 2: [Description]
3. Phase 3: [Description]

## Impact Analysis
| Component | Impact | Effort |
|-----------|--------|--------|
| API Layer | High | 2 weeks |
| Database | Medium | 1 week |
| Frontend | Low | 3 days |

## Rollback Plan
[How to revert if issues arise]
```

### ADR Lifecycle

```
Proposed → Accepted → Deprecated → Superseded
    ↓
Under Review (by team)
    ↓
Accepted (implement)
    ↓
Superseded by ADR-YYY (when replaced)
```

### ADR Index

Maintain in `docs/decisions/adr-index.md`:
```markdown
# Architecture Decision Records

## Active
| ADR | Title | Date | Status |
|-----|-------|------|--------|
| 001 | PostgreSQL for Primary DB | 2026-01-15 | Accepted |
| 002 | Redis for Caching | 2026-01-20 | Accepted |
| 003 | FastAPI for Backend | 2026-02-01 | Accepted |

## Deprecated
| ADR | Title | Date | Superseded By |
|-----|-------|------|---------------|
| 000 | SQLite for Development | 2026-01-10 | ADR-001 |
```
