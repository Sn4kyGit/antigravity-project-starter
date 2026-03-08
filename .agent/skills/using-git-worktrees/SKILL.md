---
name: using-git-worktrees
description: "Use when starting feature work that needs isolation from the current workspace, or before executing major implementation plans. Creates isolated git worktrees with smart directory selection, ensuring you don't pollute the main checkout or break the baseline state."
category: guardrail
risk: moderate
tags: "[git, workflow, isolation, safety, worktree, experimental]"
version: "1.0.0"
---

# Using Git Worktrees

Git worktrees create isolated workspaces sharing the same repository. This allows work on multiple branches simultaneously without switching branches or stashing changes in the primary directory.

**Core Principle:** Systematic directory isolation + safety verification = risk-free experimental development.

## Purpose
Prevents catastrophic mistakes on the `main` branch. When executing a massive refactoring or risky implementation, you should use an isolated worktree. If the code completely breaks in the worktree, the original directory remains unharmed.

## When to Use Include
- When running `subagent-driven-development` or dispatching background tasks.
- When creating massive, potentially breaking feature changes.
- When you need to test something out without messing up the current `git status`.

## Directory Selection & Safety Workflow

### 1. Check & Use Existing `.worktrees` Directory
Check if `.worktrees` or `worktrees` exists in the local project root.

```bash
ls -d .worktrees 2>/dev/null
```

**CRITICAL SAFETY VERIFICATION:** Before creating a worktree inside the project folder, it MUST be ignored by git.
```bash
git check-ignore -q .worktrees 2>/dev/null
```
If it is NOT ignored, YOU MUST ADD IT to `.gitignore` and commit that change first!
```bash
echo ".worktrees/" >> .gitignore
git add .gitignore
git commit -m "chore: ignore .worktrees directory for isolated agent development"
```

### 2. Creation Steps

**Detect Project Name:**
```bash
project=$(basename "$(git rev-parse --show-toplevel)")
```

**Add the Worktree:**
Target an isolated path (e.g. `.worktrees/feature-name`).
```bash
# Create worktree with a new branch
git worktree add ".worktrees/<branch-name>" -b "<branch-name>"
cd ".worktrees/<branch-name>"
```

### 3. Setup & Baseline Verification

Once inside the worktree, act exactly like a fresh clone:
1. **Dependencies:** Auto-detect and run setup (e.g., `npm install`, `poetry install`).
2. **Verify Clean Baseline:** Run the test suite (`pytest`, `npm run test`).
3. **Report:** If baseline fails, do NOT proceed without notifying the user.

## Example Workflow Output
If you use this skill, output to the user via notification or task boundary:

*Worktree created at `.worktrees/feature-auth` on branch `feature-auth`.*
*Dependencies installed.*
*Baseline tests pass. Proceeding with implementation in isolation.*

## Cleanup (When done)
When the feature is completed, tested, and either merged or abandoned, clean up the worktree:
```bash
# From main repository
git worktree remove .worktrees/<branch-name>
# optionally delete branch
git branch -d <branch-name>
```

## Anti-Patterns
- ❌ Creating a worktree inside the repo WITHOUT adding logic to `.gitignore`. This will pollute the git index massively.
- ❌ Executing destructive tests on the `main` branch directly.
- ❌ Switching branches (`git checkout`) in the main working directory while uncommitted changes exist. Use a worktree instead.
