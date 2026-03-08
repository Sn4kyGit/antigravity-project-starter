---
name: process-project-development
description: "Master methodology for building LLM-integrated projects or complex data pipelines. Focuses on Pipeline Architecture, File System as State Machine, and Architectural Reduction. Use when designing new system workflows."
category: process
risk: safe
tags: "[architecture, methodology, llm routing, state machine, pipeline, process]"
version: "1.0.0"
---

# Process: Project Development Methodology

## Core Philosophy
Building reliable LLM-powered applications or complex data workflows requires structural guardrails against non-determinism and over-engineering.

## 1. Task-Model Fit & The Manual Prototype
Before writing ANY automation that touches an LLM:
- **Validate Fit:** LLMs are for synthesis, judgment, and natural language. They fail at precise computation, sequential hard-logic dependencies, and 100% deterministic requirement matching.
- **Manual Prototype First:** Test the core prompt manually in a chat interface with a representative example. If it fails manually, automation will only scale the failure.

## 2. Pipeline Architecture (Isolate the Non-Deterministic)
Never mix data fetching, LLM processing, and rendering in the same function. Use a staged pipeline where only ONE step is non-deterministic:

```text
Acquire → Prepare → Process (LLM) → Parse → Render
```
- **Acquire/Prepare:** Fetch data, format prompt (Deterministic).
- **Process:** LLM Call (Non-deterministic, Expensive, Slow).
- **Parse/Render:** Extract JSON/Markdown, save to UI (Deterministic).

By isolating the `Process` step, you can rapidly iterate on your Parsers and UIs without constantly re-running expensive LLM calls.

## 3. File System as State Machine
For batch processing, code migrations, or multi-step agent workflows, **do not use complex in-memory state or initial databases if avoidable.**
Use the filesystem to track pipeline state.

```text
data/{work_id}/
├── raw.json         # input acquired
├── prompt.md        # ready for LLM
├── response.md      # LLM processing complete
├── parsed.json      # successfully parsed
```
**Why?**
- Natural idempotency: If `parsed.json` exists, skip the processing step.
- Trivial debugging: You can literally read the state at any point.
- Easy retries: Delete `response.md` to force a re-run of the LLM step.

## 4. Architectural Reduction
Always start with the most minimal architecture possible.
- Avoid multi-agent setups unless **context isolation** is strictly required (e.g., the context window is bursting or roles strictly clash). Multi-agent adds massive communication overhead.
- Give agents standard Unix tools (bash, grep) rather than building 15 highly specialized, fragile custom python tools.
- Complexity should only be added when empirical evidence proves the minimal structure has failed.

## 5. Subagent-Driven Execution Alignment
When a task scales beyond a single context window, defer to `subagent-driven-development.md`. 
To ensure smooth subagent execution, your project design must:
- **Decouple Modules:** Subagents need isolated scopes. Ensure files can be compiled or tested independently (e.g., via modular unit tests).
- **Clear Interfaces:** If Agent A builds the frontend and Agent B builds the backend, pre-define the API contract via OpenAPI schemas or mock JSON responses in `findings.md`.
- **Strict Objectives:** Ensure every subagent receives exact file paths, test commands, and specific acceptance criteria from the `task_plan.md`.

## Operator Checklist
- [ ] Has the LLM task been manually prototyped to prove feasibility?
- [ ] Is the LLM call strictly isolated from the data preparation and rendering phases?
- [ ] Are intermediate results being cached (e.g., to the filesystem) to prevent wasteful re-runs during development?
- [ ] Are module boundaries strictly defined to allow safe parallel execution by subagents?
- [ ] Is this the absolute simplest architecture that could possibly work?
