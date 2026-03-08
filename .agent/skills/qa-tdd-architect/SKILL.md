---
name: qa-tdd-architect
description: "Master of Test-Driven Development (TDD), writing tests, Systematic Debugging, and fixing failing tests. Use this skill when asked to write tests, fix a bug, debug a complex issue, or ensure code quality via automated verification. Relevant keywords: qa, tdd, test-driven, testing, tests, bug, debugging, error, failure, systematic, root cause."
category: process
risk: moderate
tags: "[testing, qa, tdd, debugging, pytest, jest, playwright]"
version: "1.0.0"
---

# QA & TDD Architect (Systematic Debugging)

## Purpose
This skill enforces strict Test-Driven Development (TDD) pipelines and Systematic Debugging. It mandates that no production code is written without a failing test first, and no bug is fixed without establishing the root cause.

## When to Use
- Implementing a new feature (enforce RED-GREEN-REFACTOR).
- Investigating a reported bug or error stack trace.
- Fixing broken unit or integration tests.
- Writing E2E tests for the frontend.

## Key Workflow: Test-Driven Development
- **The Iron Law:** NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST.
- [ ] **RED:** Write a failing test that clearly describes the desired behavior. Do not test implementations, test behavior. Wait and watch it fail to prove the test actually works. **GATE:** Do not proceed until the test fails with the expected error message.
- [ ] **GREEN:** Write the absolute simplest minimal code necessary to make the test pass. Do not add future-proofing ("YAGNI"). If you can fake it to pass the test, fake it. **GATE:** All tests must pass before proceeding.
- [ ] **REFACTOR:** Clean up the working code. Ensure all tests still pass. **Triggers:** Cyclomatic complexity > 10, function length > 20 lines, duplicate code blocks > 3 lines.

### AI-Augmented Multi-Agent TDD
When building large features, you can orchestrate this cycle using subagents:
- **Test Automator:** Writes the failing tests (RED).
- **Backend Architect:** Implements minimal code to pass (GREEN).
- **Code Reviewer:** Optimizes and cleans up the code (REFACTOR).

## Key Workflow: Systematic Debugging
- **The Iron Law:** NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.
- [ ] **Phase 1: Root Cause.** Read the full stack trace. Reproduce consistently. Trace data flow backward from the symptom. Add diagnostic logs across layers if needed.
- [ ] **Phase 2: Hypothesis.** Formulate a clear hypothesis ("I think X failed because Y").
- [ ] **Phase 3: Implementation.** Create a FAILING TEST case that isolates the bug.
- [ ] **Phase 4: Verify.** Apply the fix. Confirm the test passes. If 3 attempts fail, stop and question the architectural pattern.

## Patterns & Examples

### TDD: Red-Green-Refactor Flow
```python
# 1. RED (test_calculator.py)
def test_addition():
    # Write this first. Watch it fail.
    assert add(2, 2) == 4

# 2. GREEN (calculator.py)
def add(a: int, b: int) -> int:
    # Just enough to pass the test
    return a + b
```

### Fixing Failing Test Suites (Smart Error Grouping)
If you are tasked with fixing a broken test suite:
1. Run the test suite and gather all failures.
2. **Smart Error Grouping:** Group similar failures by error type (e.g., `ImportError`, `AssertionError`, `TypeError`) or common impacted files.
3. Fix **Infrastructure First** (missing dependencies, import errors, missing DB tables).
4. Fix **API contract changes** (renamed functions, signature mismatches).
5. Fix **Logic errors** last.
6. Fix one group at a time and verify the subset passes before moving to the next.

### Coverage & Validation Rules
- **Minimum Thresholds:** 80% line coverage, 75% branch coverage, 100% critical path coverage.
- If TDD discipline is broken, STOP immediately, identify which phase was violated, and rollback to the last valid state.

## Error Handling
- Never comment out a failing test to "fix" the build unless explicitly authorized by the user due to deprecation.
- If mocking is required, mock only external boundaries (HTTP calls, DB clients), never internal application logic.
