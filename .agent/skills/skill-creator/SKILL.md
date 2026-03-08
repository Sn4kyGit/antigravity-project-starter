---
name: skill-creator
description: "The definitive meta-skill for creating, testing, optimizing, and managing AI agent skills. Use when the user wants to create a new skill, build a skill, improve an existing skill, debug skill triggers, run skill evaluations, optimize skill descriptions, benchmark skill performance, package skills, or manage skill architecture. Covers the full lifecycle from brainstorming to production-grade deployment."
category: meta
risk: safe
tags: "[skill-creation, meta-skill, architecture, evaluation, optimization, best-practices]"
version: "1.1.0"
---

# Elite Skill Architect

The definitive meta-skill — forged from the best open-source skill-creation frameworks — covering the full lifecycle from intent capture to production-grade deployment.

## Purpose
This skill is a battle-tested, all-in-one guide for creating, testing, optimizing, and managing AI agent skills. It synthesizes best practices from four leading community frameworks into a single, streamlined workflow that produces professional-quality skills on the first pass and correctly integrates them into the workspace's `AGENTS.md`.

## Core Principles
Before diving into the workflow, internalize these principles that separate elite skills from mediocre ones:

1. **Explain the why, not just the what.** LLMs are smart — explain reasoning instead of rigid MUST/ALWAYS directives. Theory-of-mind instructions outperform brute-force constraints.
2. **Keep it lean.** Remove anything that doesn't pull its weight. Read transcripts, not just outputs — if the skill makes the model waste time, cut the offending section.
3. **Generalize from examples.** Skills will be used millions of times across wildly different prompts. Don't overfit to test cases. Prefer flexible patterns over rigid templates.
4. **Progressive disclosure.** For external/public skills, keep `SKILL.md` under 500 lines and offload details to `references/`. For project-internal skills (in `.agent/`), prioritize completeness over brevity — no line limit applies.
5. **No surprise.** Skills must never contain malware, exploit code, or misleading instructions. The skill's behavior should match its description.
6. **Imperative style.** Write instructions in imperative form. Avoid second-person ("you should") — use direct commands ("Check the schema", "Run the tests").

## Skill Anatomy & File Structure

```
skill-name/
├── SKILL.md              ← Main instructions (required, <500 lines)
│   ├── YAML frontmatter  ← name + description (triggers)
│   └── Markdown body     ← Workflow, patterns, examples
├── references/           ← Detailed docs loaded on-demand
│   ├── detailed-guide.md
│   └── patterns.md
├── examples/             ← Working code samples
├── scripts/              ← Executable utilities (can run without loading)
└── assets/               ← Templates, icons, non-code resources
```

**Critical Rules**
- External/public skills: `SKILL.md` < 500 lines — offload details to `references/`
- Project-internal skills (`.agent/`): no line limit — completeness > brevity
- Reference files > 300 lines — add a table of contents at the top
- One level deep — don't nest references within references

## YAML Frontmatter Reference

```yaml
---
name: my-skill-name              # Lowercase, kebab-case
description: "Comprehensive description including ALL trigger keywords.
  Mention specific topics, file types, use cases, and contexts.
  Be 'pushy' — include adjacent triggers the user might not explicitly name.
  Max 1024 chars."
category: domain                 # meta | domain | process | architecture | quality | utility
risk: safe                       # safe | moderate | high
tags: "[tag1, tag2, tag3]"
version: "1.0.0"
---
```
*Pro tip on descriptions: Models often undertrigger skills. Combat this by making descriptions slightly "pushy". Instead of "Format CSV data", write "Format CSV data. Use this skill whenever the user mentions spreadsheets, tabular data, CSV, TSV, data import, data cleaning, or column manipulation, even if they don't explicitly say 'CSV'."*

---

## The Elite Workflow

The workflow has 7 phases. You can enter at any phase depending on where the user is in the process.

### Phase 1: Intent Capture & Research
**Goal:** Deeply understand what the skill should do before writing a single line.

1. **Capture Intent**: Check if the current conversation already contains a workflow the user wants to turn into a skill. Extract tools used, sequences of steps, formats.
2. **Interview**: If the intent is unclear, ask about:
   - What should this skill enable the AI to do?
   - When should it trigger? (3-5 phrases)
   - What's the expected output format?
   - What types of edge cases or failures could occur?
3. **Research**: Check existing skills for overlap to prevent duplicated effort.

### Phase 2: Drafting the Skill
**Goal:** Write a high-quality first draft following all best practices.

1. **Create the SKILL.md**: Use the standard anatomy: Purpose, When to Use, Key Workflow, Patterns & Examples, Error Handling.
2. **Writing Style**: 
   - Use imperative form ("Check the schema").
   - Include real code examples, not abstract descriptions.
   - Start with a draft, then review with fresh eyes.
3. **Create Supporting Files**: Generating the directory structure `.agent/skills/<skill-name>/{references,examples,scripts}` if needed. Move heavy content into `references/`.

### Phase 3: Evaluation & Testing
**Goal:** Validate the skill works with real-world prompts before finalizing.

1. **Write Test Cases**: Create 2-5 realistic user prompts with context, casual language, and varied lengths. Save to `evals/evals.json`.
2. **Run Tests**: Execute the skill against the prompts. Capture outputs, timing, and errors. Organize results iteratively (e.g., `iteration-1/`).
3. **Draft Assertions**: Write quantitative assertions ("output_contains_valid_json").
4. **Collect Feedback**: Show the prompt and output to the user. Focus improvements on specific complaints.

### Phase 4: Iteration & Improvement
**Goal:** Refine the skill based on test results and transcript analysis.

1. **Analyze Results**: Look for high-variance or non-discriminating assertions. Ensure the LLM didn't waste tokens.
2. **Improve**: Generalize from feedback; don't overfit to tests. Bundle repeated subagent work into `scripts/`.
3. **Re-run**: After applying changes, rerun tests into `iteration-<N+1>/`. Stop iterating when the user is satisfied.

### Phase 5: Description Optimization
**Goal:** Maximize trigger accuracy so the skill activates precisely when needed.

1. **Eval Queries**: Generate ~20 eval queries (mix of should-trigger and should-not-trigger/near-misses). 
2. **Optimize**: Evaluate the description against the queries. Analyze failures. Adjust the description to be more "pushy" or more restrictive as needed.
3. **Apply**: Update the `SKILL.md` YAML frontmatter with the final optimized description.

### Phase 6: Finalization & Deployment
**Goal:** Package the skill for production.

1. **Validation**: Check YAML frontmatter, line limits, specific trigger keywords, imperative style, and test passes.
2. **Installation**: Place the skill in `.agent/skills/<kill-name>/`.
3. **Summary**: Provide the user with a report detailing lines, files, test passes, and accuracy.

### Phase 7: AGENTS.md Registration
**Goal:** Register the new skill in the workspace's `AGENTS.md` so the Understand Gate automatically loads it.

1. **Locate AGENTS.md**: Open `/Users/sn4ky/Documents/antigravity_home/AGENTS.md`. 
2. **Extract Keywords**: From the optimized YAML description, extract 5-8 highly relevant, lowercase, specific trigger keywords. **Critically check the existing "Trigger-Keywords"** in `AGENTS.md` to ensure your new keywords do not collide with existing skills. The keywords must be highly specific so that Gate 1 (Understand) can precisely load the correct skill.
3. **Determine Category**: Decide which table the skill belongs in (Process, Architecture, Quality, Meta, Expert, Utility, or Domain). Create a new section if none fit.
4. **Register**: Append a new row to the table: 
   `| ./.agent/skills/{{SKILL_NAME}}/SKILL.md | "keyword1", "keyword2", "keyword3" |`
5. **Verify**: Ensure the table formatting holds and inform the user that their skill is automatically integrated via Gate 1.
