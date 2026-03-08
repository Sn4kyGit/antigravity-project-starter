---
name: brainstorming-designs
description: "Master of turning ideas into fully formed designs and specs through natural collaborative dialogue. Use this BEFORE any creative work (building features, modifying behavior). Relevant keywords: brainstorm, design, plan, idea, feature planning, outline, dialog."
category: process
risk: safe
tags: "[brainstorming, design, planning, collaboration, architecture]"
version: "1.0.0"
---

# Brainstorming & Feature Designing

## Purpose
This skill ensures that we deeply understand the user's intent *before* writing code. It enforces exploring requirements, defining success criteria, and mapping out the design via a collaborative dialogue in Gate 3 (PLAN).

## When to Use
- The user asks to "brainstorm", "plan out", or "design" a new feature.
- You are about to implement a large architectural change and need to align on the approach.
- The requirements provided by the user are vague or incomplete.

## Key Workflow
- [ ] **Step 1: Context Gathering.** Check the current project state (read `CONTINUITY.md`, check open files).
- [ ] **Step 2: Single Questions.** Ask clarifying questions **one at a time**. Do not overwhelm the user with a list of 5 questions.
- [ ] **Step 3: Provide Options.** Always propose 2-3 different approaches with trade-offs (e.g., "Option A is faster to build but harder to scale, Option B takes longer but supports X").
- [ ] **Step 4: Incremental Validation.** Present the final design in small, digestible chunks (200-300 words). Ask "Does this look right so far?" before moving to the next chunk.
- [ ] **Step 5: Finalize.** Once approved, write the plan to `implementation_plan.md` (or a specific architecture doc) before moving to Gate 4 (IMPLEMENT).

## Patterns & Examples

### Presenting Multiple Choice
**Good:**
"To handle the Game Spawns, we have two good options:
**A) Timer-based (Simpler):** Enemies spawn exactly every 10 seconds.
**B) Event-based (Dynamic):** Enemies spawn when the player clears the current wave.
Which approach feels better for the gameplay flow you have in mind?"

**Bad:**
"How do you want to handle game spawns? What about the timing? Should it be dynamic? Let me know."

## Rules
- **YAGNI ruthlessly:** Remove unnecessary features from all initial designs. Start simple.
- **Use `notify_user`:** You must use the `notify_user` tool to pause your execution and wait for the user's response during each turn of the brainstorming session.
