---
name: planning-with-files
description: "Implements Manus-style file-based planning to organize and track progress on complex tasks. Creates and manages task_plan.md, findings.md, and progress.md. Use when asked to plan out, break down, or organize a multi-step project, research task, or any work requiring more than 5 tool calls. Supports automatic session recovery."
category: meta
risk: safe
tags: "[planning, context-management, manus, methodology, tracking]"
version: "1.0.0"
---

# Planning with Files

Work like Manus: Use persistent markdown files in the project root as your "working memory on disk." The context window is volatile RAM; the filesystem is persistent Disk. Anything important gets written to disk.

## Purpose
This skill ensures you don't lose context during long tasks (like complex refactorings or multi-step epics). By maintaining files that track what needs to be done, what has been discovered, and what has been completed, you can systematically solve huge problems without getting confused or trapped in loops.

## When to Use Include
- Multi-step tasks (3+ steps)
- Deep research tasks
- Building/creating large projects
- Tasks spanning many tool calls
- Epics requiring systematic organization

**Skip for:** Simple questions, single-file edits, quick lookups.

## Key Workflow

### 1. Initialize Planning Files FIRST
Before starting work on a complex task, ALWAYS create these three files in the project root:

1. **`task_plan.md`**: Phase tracking, progress, next actions, and encountered errors.
2. **`findings.md`**: Research storage and discoveries (e.g. "How the auth flow works").
3. **`progress.md`**: Session logging and test results.

### 2. The 2-Action Rule
After every 2 view/search/grep operations, IMMEDIATELY save key findings to `findings.md`. This prevents information from falling out of the context window.

### 3. Read Before Decide
Before major decisions or when shifting to the next phase, read `task_plan.md` using the *view_file* tool. This re-orients your attention window to the high-level goal.

### 4. Update After Act
After completing any phase:
- Mark phase status in `task_plan.md` as `complete`.
- Log the steps taken in `progress.md`.
- Log ANY errors encountered in `task_plan.md`.

## The 3-Strike Error Protocol & Logging

Never repeat failures. If an action fails, mutate your approach. Track what you tried.

**ATTEMPT 1:** Diagnose & Fix -> Read error, identify root cause, apply targeted fix.
**ATTEMPT 2:** Alternative Approach -> Try a different method, different library. NEVER repeat exact same failing action.
**ATTEMPT 3:** Broader Rethink -> Question assumptions, search for completely different solutions. Update `task_plan.md`.
**AFTER 3 FAILURES:** Escalate to User -> Stop execution, notify the user with the specific error and what you tried, and ask for guidance.

### Error Logging Format (`task_plan.md`)
```markdown
## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| FileNotFoundError | 1 | Created default config |
| API timeout | 2 | Added retry logic |
```

## Anti-Patterns
- ❌ Stating goals once and forgetting them -> ✅ Re-read `task_plan.md` before decisions.
- ❌ Hiding errors and retrying silently -> ✅ Log errors explicitly to the plan file.
- ❌ Stuffing everything in context -> ✅ Store large discoveries in `findings.md`.
- ❌ Starting execution immediately -> ✅ Create plan files FIRST.
- ❌ Repeating failed actions -> ✅ Track attempts, explicitly mutate approach.
