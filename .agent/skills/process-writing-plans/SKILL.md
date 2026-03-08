---
name: process-writing-plans
description: "Master of creating detailed, bite-sized implementation plans. Enforces TDD, specific file paths, and strict task granularity. Use before touching code when solving complex problems or implementing new features."
category: process
risk: safe
tags: "[planning, tdd, implementation, architecture, steps, tasks, process]"
version: "1.0.0"
---

# Process: Writing Plans

## Purpose
This skill governs how implementation plans are constructed. Jumping straight into code for complex features leads to regressions and messy architecture. This skill forces you to break down the goal into incredibly small, actionable, TDD-driven tasks before execution begins.

## When to Use
- **Gate 3 (PLAN):** When writing the `implementation_plan.md` and `task.md`.
- **Anytime** a feature requires touching more than one component or introduces new logic.
- **Complex Orchestrations:** When delegating tasks to subagents or managing multi-step workflows.

## File-Based Planning Integration
In alignment with the `planning-with-files.md` skill, complex problem-solving should utilize persistent planning artifacts in the root directory:
- `task_plan.md`: The single source of truth for ordered sub-tasks.
- `progress.md`: Current execution state and execution logs for the current phase.
- `findings.md`: Persistent knowledge, API schemas, and test discoveries.
Always ensure your implementation plan generates or updates these files before acting.

## The Bite-Sized Doctrine

Assume the executing agent (which could be yourself in the next step) needs absolute clarity. Document EXACTLY which files to touch, which tests to write, and how to verify them.

**Each task must represent 2-5 minutes of work.**

### Strict Task Structure
Every task in your plan MUST follow this rhythm:
1. **RED:** Write the failing test.
2. **VERIFY RED:** Run the test. Watch it fail for the right reason.
3. **GREEN:** Write the minimal implementation code.
4. **VERIFY GREEN:** Run the test. Watch it pass.
5. **COMMIT / CHECKPOINT:** Mark the task as done.

## Plan Document Template
When creating an `implementation_plan.md`, use this structure:

```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach, referencing relevant architecture skills like architecture-python-backend.md or architecture-react-nextjs.md]

---

### Task 1: [Component/Function Name]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

**Step 1: Write failing test**
[Code snippet of the exact test]

**Step 2: Verify RED**
Command: `pytest tests/path/test.py::test_name`
Expected: FAIL ("function not defined")

**Step 3: Implementation**
[Code snippet of minimal implementation]

**Step 4: Verify GREEN**
Command: `pytest tests/path/test.py::test_name`
Expected: PASS
```

## Operator Checklist (PRE-ACT)
- [ ] Is the plan broken down into bite-sized (2-5 min) tasks?
- [ ] Are `task_plan.md`, `progress.md`, and `findings.md` initialized or updated to guide execution?
- [ ] Does every logic task start with a failing test (TDD)?
- [ ] Are exact file paths and test commands provided?
- [ ] Are architecture rules (e.g., DFII, BFRI) respected in the plan?
