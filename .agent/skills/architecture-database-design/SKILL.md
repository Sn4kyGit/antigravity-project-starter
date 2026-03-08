---
name: architecture-database-design
description: "Master of PostgreSQL schema design, optimization, and safe migrations. Enforces strict conventions for IDs, indexes, JSONB, and transactional DDL. Use whenever modifying the data layer."
category: architecture
risk: safe
tags: "[postgres, database, sql, schema, migration, optimization, indexing]"
version: "1.0.0"
---

# Architecture: Database Design

## Purpose
This skill establishes strict architectural and optimization guidelines for the PostgreSQL database. It complements the `database-asyncpg-qdrant` skill by enforcing robust schema design, proper indexing, safe migrations, and efficient data access patterns.

## When to Use
- **Gate 3 (PLAN):** When designing table schemas or planning data migrations.
- **Gate 4 (IMPLEMENT):** When writing complex SQL queries, creating indexes, or adding JSONB columns.

## Core Database Doctrine (Non-Negotiable)

### 1. Schema Design Conventions
- **Identifiers:** Use `snake_case` strictly for tables and columns (unquoted).
- **Primary Keys:** For reference tables (users, orders), prefer `BIGINT GENERATED ALWAYS AS IDENTITY`. Use `UUIDv7` ONLY when global uniqueness or opacity is strictly required. No `serial`.
- **Foreign Keys:** PostgreSQL does NOT auto-index FK columns. You MUST add them manually.
- **Nullability:** Add `NOT NULL` everywhere it’s semantically required.
- **Timestamps:** ONLY use `TIMESTAMPTZ`. Never use `TIMESTAMP` without timezone.

### 2. Indexing Strategy
Create indexes for access paths you actually query:
- B-tree: Default for equality/range queries (`=`, `<`, `>`, `ORDER BY`).
- Partial Indexes: Excellent for hot subsets (`WHERE status = 'active'`).
- Expression Indexes: Useful for case-insensitive searches (`LOWER(email)`).
- GIN Indexes: Mandatory for JSONB containment (`@>`), existence (`?`), and Arrays.

### 3. JSONB Best Practices
- Prefer `JSONB` over `JSON`. Focus on optional/variable attributes, keep core relations in regular columns.
- Keep JSONB indexed with GIN: `CREATE INDEX ON tbl USING GIN (jsonb_col)`.
- Use generated columns for frequently accessed JSONB scalar fields:
  `price INT GENERATED ALWAYS AS ((jsonb_col->>'price')::INT) STORED`

### 4. Safe Schema Evolution (Migrations)
- Always write reversible migrations (`up` and `down`).
- Most operations can and should be wrapped in `BEGIN; ... COMMIT;`.
- Avoid adding `NOT NULL` columns with volatile defaults (it rewrites the entire table).
- For large tables, avoid table locks: Use `CREATE INDEX CONCURRENTLY`.

## Operator Checklist (PRE-ACT)
- [ ] Is `snake_case` strictly used?
- [ ] Are Foreign Keys manually indexed?
- [ ] Is `TIMESTAMPTZ` used instead of `TIMESTAMP`?
- [ ] Are JSONB columns supported by a GIN index?
- [ ] Is the migration safely reversible?
