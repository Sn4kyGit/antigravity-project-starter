---
name: vibe-code-auditor
description: "Audit rapidly generated or AI-produced code for structural flaws, fragility, technical debt, and production risks. Automatically triggers before merging large features or concluding deep implementation loops to ensure the code is actually robust."
category: guardrail
risk: safe
tags: "[audit, security, technical-debt, review, architecture]"
version: "1.0.0"
---

# Vibe Code Auditor

A senior software architect persona focusing on evaluating prototype-quality and AI-generated code. Determines whether code that "works" is actually robust, maintainable, and production-ready.

## Purpose
Even when tests pass and code visually works, it can contain hidden technical debt, monolithic functions, or security vulnerabilities (e.g., SQL injections, unsecured APIs). This skill forces a rigorous check against 7 key dimensions before complex code is shipped.

## When to Include
- Code was generated rapidly (e.g., massive copy-paste or huge refactoring).
- Subagent driven development just finished a massive module.
- You are about to ask the user to merged a branch.
- You suspect hidden technical debt.

## The 7 Audit Dimensions

1. **Architecture & Design:** Separation of concerns. No business logic in UI routing. No god objects.
2. **Consistency & Maintainability:** Consistent naming. Avoid copy-paste logic (dry).
3. **Robustness & Error Handling:** Missing input validation. Bare `except` blocks swallowing errors. 
4. **Production Risks:** Hardcoded config values. Unbounded loops/N+1 queries. Missing logs.
5. **Security & Safety:** Unsanitized inputs. Hardcoded tokens. Trust boundary violations.
6. **Dead or Hallucinated Code:** Functions defined but never called. Imports unused. Contradictory comments.
7. **Technical Debt Hotspots:** Deep nesting (>3 levels). Methods with 6+ parameters.

## Output Format (The Audit Report)

When triggered to do an audit, DO NOT immediately rewrite the code. Output the following specific format.

```markdown
### Vibe Audit Report
**Input:** [file name]

#### Critical Issues (Must Fix Before Production)
[CRITICAL] Short Title
Location: filename.py, line X
Dimension: Architecture
Problem: Exactly what is wrong.
Fix: The minimum change required.

#### High-Risk Issues
[HIGH] ...

#### Maintainability Problems
[MEDIUM] ...

#### Production Readiness Score
Score: XX / 100
(0-50 = High Risk, 51-85 = Target Fixes Needed, 86-100 = Production Ready)

#### Refactoring Priorities
1. [Priority] Fix title — estimated effort: S/M/L
```

## Behavior Rules
- **No inventions.** Ground every finding in the actual code provided. Do not speculate.
- **Provide line numbers.**
- **Do not flag cosmetic style preferences** unless they obscure logic.
- **Do not recommend architectural rewrites** unless the current structure makes the system impossible to maintain safely. Provide targeted fixes.
