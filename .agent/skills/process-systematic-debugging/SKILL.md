---
name: process-systematic-debugging
description: "Master rule for debugging and fixing issues. Enforces the 4-phase root cause analysis process, backward tracing, defense-in-depth validation, and condition-based waiting for flaky tests. Prevents guessing and 'quick fixes'."
category: process
risk: safe
tags: "[debugging, bugfix, root cause, testing, process, flaky tests]"
version: "1.0.0"
---

# Process: Systematic Debugging

## The Iron Law
**NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.**
Random fixes waste time and create new bugs. Quick patches mask underlying issues. You must complete the 4 phases below before writing any fix.

## The 4-Phase Debugging Protocol

### Phase 1: Investigation & Evidence (DO THIS FIRST)
1. **Read Errors:** Read the complete stack trace and error message.
2. **Reproduce:** Find exact steps to reproduce consistently.
3. **Trace Backward (Root Cause Tracing):** 
   - Observe the symptom (e.g., `git init failed`).
   - Find the immediate cause in the code.
   - Ask: What called this? Keep tracing up the call stack.
   - Find where the bad data *originated*, not where it merely crashed.
4. **Gather Evidence:** In multi-layered systems, add logging at boundaries to see exactly where data state diverges from expectations.

### Phase 2: Pattern Analysis
- Look for working variants of the failing behavior in the codebase.
- Identify the exact differences between the broken implementation and the reference.

### Phase 3: Hypothesis & Testing
- Form a single, testable hypothesis (`I think X is the root cause because Y`).
- Test minimally. Change one variable at a time.

### Phase 4: Implementation & Defense
1. **Failing Test First:** Write a test that proves the bug exists (and fails).
2. **Implement Fix at Source:** Fix the original trigger identified in Phase 1.
3. **Defense-in-Depth:** A bug fixed in one place can be bypassed. Add structural validation at all layers:
   - *Layer 1:* Entry Point Validation (e.g., Zod schemas)
   - *Layer 2:* Business Logic Validation
   - *Layer 3:* Environment Guards (e.g., refuse destructive actions in test ENVs)
4. **Verify Fix:** Ensure the failing test now passes.

## Red Flags (STOP and return to Phase 1)
- *"Just try changing X and see if it works"*
- *"Add multiple changes, run tests"*
- *"I'll write the test after fixing it"*
- **You have tried 3+ fixes and it still fails.** (This indicates an architectural problem. Stop and discuss with the user).

## Specialized Technique: Condition-Based Waiting (Flaky Tests)
Never use arbitrary timeouts (`setTimeout(r, 1000)`, `sleep()`) to wait for async state, as this causes flaky tests under CI load. 

**Rule:** Polling Condition > Arbitrary Timeout.
```typescript
// ❌ WRONG
await new Promise(r => setTimeout(r, 1000));
expect(system.ready).toBe(true);

// ✅ RIGHT
await waitFor(() => system.ready === true, "System to become ready", 5000);
```
Only use arbitrary timeouts if you are explicitly testing timing behavior (e.g., debouncing), and document the reasoning.
