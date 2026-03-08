---
name: process-verify-completion
description: "Master rule for verification. Prevents claiming a task is complete, a test passes, or a bug is fixed without providing direct, fresh empirical evidence (command output). Triggers before any PR, commit, or completion claim."
category: process
risk: safe
tags: "[verification, QA, testing, completion, evidence, check]"
version: "1.0.0"
---

# Process: Verification Before Completion

## The Absolute Rule
**NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE.**

Claiming work is complete, tests pass, or bugs are fixed without executing the actual verification command and reading its output is dishonest.

## When to Use
ALWAYS before:
- Saying "Great!", "Done!", "Fixed!", or "Ready!"
- Deciding a task in `task.md` is complete (checking a box).
- Creating a Git commit.
- Transitioning from EXECUTION to VERIFICATION mode, or back to the user.

## The Verification Gate
Before making any claim of success, you MUST follow this sequence:

1. **IDENTIFY:** What exact command proves this claim? (e.g., `pytest`, `npm run build`, `npm run lint`).
2. **RUN:** Execute the FULL command. Do not rely on previous runs or assumptions.
3. **READ:** Read the full output. Do not assume `exit 0` means full success if the linter output shows warnings that violate our architecture rules.
4. **VERIFY:** Does the output confirm the claim?
5. **CLAIM:** Only make the claim *after* the evidence is secured.

## Kill These Rationalizations Immediately (Red Flags)
- ❌ *"I just added a simple console.log, it should work."* (RUN THE ENTIRE BUILD/TEST).
- ❌ *"The linter passed, so the code is fine."* (Linter ≠ Compiler ≠ Tests).
- ❌ *"I'll assume the agent did it correctly."* (Verify the agent's work with `git diff` and tests).
- ❌ *"I wrote a regression test."* (Did you see it fail FIRST before the fix? If not, you didn't verify the test works).

## Operator Checklist (PRE-ACT)
- [ ] Is there empirical evidence (terminal output) in this immediate context proving the code works?
- [ ] Was the regression test verified with a Red-Green cycle?
- [ ] Have all related unit/integration tests been run and passed 100%?
