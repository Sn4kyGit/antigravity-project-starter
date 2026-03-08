---
name: architecture-c4-model
description: "Generate comprehensive C4 architecture documentation for a system. Focuses on Context, Container, and Component levels."
---

# C4 Architecture Documentation

Use this skill to design or document the architecture of a software system following the C4 Model.

## Overview

The C4 model consists of 4 levels of diagrams:
1. **Context Level**: High-level system context with personas and user journeys (focuses on people and external software systems, not technologies).
2. **Container Level**: Maps applications and data stores. Shows high-level technology choices, deployment containers with API documentation.
3. **Component Level**: Defines the components within a container.
4. **Code (Optional)**: Deep code-level implementation details.

## How to Apply During Project Planning

When asked to design the system architecture, always walk through the levels:

### 1. Context Diagram & Documentation
- Define the user personas (Who is using this system?)
- Define external systems (What APIs or platforms does it interact with?)
- Create a `C4Context` Mermaid diagram showing the system in the center.

### 2. Container Diagram & Documentation
- Break the system down into Deployable Units (e.g., PostgreSQL Database, Next.js Frontend, Python FastAPI Backend).
- Define the exact technologies chosen for each container.
- Create a `C4Container` Mermaid diagram detailing how these containers interact.

### 3. Component Definition
- Inside the backend, what are the core modules? (e.g., Auth Module, Billing Module, Search Service).
- Detail boundaries, API contracts, and bounded contexts (DDD).

## Deliverables to Generate

When using this skill to plan architecture, output:
1. **System Context Overview** (`c4-context.md`)
2. **Container Deployments** (`c4-container.md` or a detailed README section)
3. **Mermaid Architecture Flow** using `C4Context` or `C4Container` notation.
