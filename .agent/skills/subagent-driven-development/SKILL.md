---
name: subagent-driven-development
description: "Use when executing implementation plans with massive, independent tasks in the current session. Dispatches background actions or subagents to parallelize work and implements a two-stage spec & quality review process."
category: meta
risk: moderate
tags: "[subagent, parallelization, workflow, review, execution]"
version: "1.0.0"
---

# Subagent-Driven Development

Executes broad plans by dispatching specialized subagent loops per task. Ensures ultra-fast iteration by parallelizing the implementation and review loops.

## Purpose
For huge epics with well-defined `task_plan.md` tasks (e.g. "Build the entire frontend UI based on the backend schema"). Instead of the primary agent writing 20 files sequentially, tasks are logically grouped and reviewed via strict spec compliance.

## When to Include
- When you have a solid implementation plan and the tasks are mostly independent.
- When you can use `run_command` in the background (via scripts) or call the browser subagent (`browser_subagent`) to fetch visual data while you write code.

## The Process: Two-Stage Review

The core philosophy of subagent-driven development is that writing the code is only step 1. You MUST self-review it against the original plan before moving on.

1. **Implement:** Write the code, run standard tests.
2. **Stage 1 (Spec Compliance):** Re-read the `task_plan.md`. Did the implementation actually fulfill every bullet point? Did it build extra stuff not requested? Fix any gaps.
3. **Stage 2 (Code Quality):** Use `vibe-code-auditor` principles. Is the code maintainable, secure, and performant? Fix any debt.
4. **Mark Complete:** Only after both reviews pass should you mark the task complete.

## Red Flags

**Never:**
- Start massive implementation on the `main` branch without explicitly isolating the workspace (e.g., using `using-git-worktrees`).
- Skip the two-stage review (spec compliance OR code quality).
- Accept "close enough" on spec compliance. 
- Move to the next task while either review has open issues.

## Integration
- **`planning-with-files.md`:** Always use this to define the strict tasks that need subagent-level execution.
- **`using-git-worktrees.md`:** Ensure the development is isolated from the main branch.
- **`vibe-code-auditor.md`:** Use for the Stage 2 (Code Quality) check.
