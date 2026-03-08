---
name: code-review-excellence
description: "Master effective code review practices to provide constructive feedback and catch bugs early. Use this skill when reviewing pull requests, auditing code for security, or evaluating architectural choices. Relevant keywords: code review, audit, pr, pull request, evaluate, feedback, architecture review."
category: process
risk: safe
tags: "[code-review, best-practices, mentoring, auditing]"
version: "1.0.0"
---

# Code Review Excellence

## Purpose
This skill transforms code reviews from gatekeeping into collaborative knowledge sharing. It ensures reviews catch critical bugs while remaining constructive and educational. 

## When to Use
- The user asks you to "review this code", "look over my PR", or "audit this file".
- Evaluating newly integrated components against the project's architecture guidelines.
- Performing security or performance audits on existing modules.

## Key Workflow
- [ ] **Phase 1: Context.** Understand the goal. Why was the code written? Read the surrounding files to grasp the context.
- [ ] **Phase 2: High-Level.** Does the design fit the problem? Are there simpler approaches? Is it over-engineered?
- [ ] **Phase 3: Line-by-Line.** Look for logic bugs, off-by-one errors, null pointer risks, race conditions, N+1 queries, SQL injection, and XSS risks.
- [ ] **Phase 4: Feedback Delivery.** Provide specific, actionable, and educational feedback. Differentiate severity using tags (`🔴 [blocking]`, `🟢 [nit]`).

## Patterns & Examples

### Constructive Feedback Formulation
Instead of commanding, propose alternatives with reasons or ask questions to encourage thought.

**Bad:**
"Change this to use async/await, it's blocking."
**Good:**
"🔴 [blocking] I noticed `time.sleep()` blocks the event loop here. Since this is an ASGI FastAPI app, could we use `await asyncio.sleep()` to free up the thread?"

### Reviewing Specific Domains
- **FastAPI/Python:** Look for mutable default arguments, improperly caught broad exceptions (`except Exception:`), or missing Pydantic model validations.
- **Next.js/React:** Look for prop mutation, missing dependency arrays in `useEffect`, hydration mismatches, or unnecessary Client Components (`"use client"`).
- **Postgres:** Look for unparameterized raw SQL, N+1 loop queries, or missing transaction boundaries.

## Rules
- Never nitpick automatic formatting (like indentations or single/double quotes). Assume standard linters/formatters handle that.
- If you find 5+ similar logic errors, don't point out each one individually. Note the pattern and give one good example of how to fix it.
