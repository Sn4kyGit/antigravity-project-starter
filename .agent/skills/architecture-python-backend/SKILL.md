---
name: architecture-python-backend
description: "Master of Python backend architecture. Enforces layered architecture, BFRI risk assessment, and strict error boundaries. Use when designing or reviewing core Python backend services."
category: architecture
risk: safe
tags: "[python, backend, architecture, fastapi, guidelines, patterns, layers]"
version: "1.0.0"
---

# Architecture: Python Backend

## Purpose
This skill establishes strict architectural guidelines for the Python/FastAPI backend, complementing the technology-specific `fastapi-backend-patterns` skill. It enforces layered design, explicit error boundaries, and feasibility checks before implementation.

## When to Use
- **Gate 3 (PLAN):** When designing a new backend feature or microservice.
- **Gate 4 (IMPLEMENT):** When structuring routes, services, and repositories.
- **Gate 5 (VERIFY):** When reviewing code for architectural violations (layer skipping).

## Core Architecture Doctrine (Non-Negotiable)

### 1. Backend Feasibility & Risk Index (BFRI)
Before implementing complex backend logic, evaluate BFRI (Score from -10 to +10):
- **+ (Positive):** Architectural fit, testability.
- **- (Negative):** Business logic complexity, data risk, operational risk.
**Rule:** If BFRI < 3, require explicit design validation and extra testing (TDD).

### 2. Strict Layered Architecture
```text
Routes -> Controllers (Optional in FastAPI but logical) -> Services -> Repositories -> Database
```
- **Routes Only Route:** Routes contain ZERO business logic. They call services.
- **Services Decide:** Services contain all business rules. They are framework-agnostic and unit-testable.
- **Repositories Access Data:** Repositories encapsulate raw database queries (asyncpg/Qdrant) and transactions.

### 3. Error Boundaries
- Never swallow errors silently.
- Validate all external input strictly using Pydantic v2.
- Unhandled exceptions must be caught by a global exception handler (e.g., yielding 500s and logging to standard output/error tracking).

## Integration with Stack
Use this architectural mindset while applying specific coding patterns from `fastapi-backend-patterns.md`.

## Operator Checklist (PRE-ACT)
- [ ] Does the route avoid business logic?
- [ ] Is input fully validated via Pydantic?
- [ ] Are we using dependency injection for services/repositories?
- [ ] Is error handling centralized?
