---
name: elite-skill-architect
description: "The definitive meta-skill for creating, testing, optimizing, and managing AI agent skills. Use when the user wants to create a new skill, build a skill, improve an existing skill, debug skill triggers, run skill evaluations, optimize skill descriptions, benchmark skill performance, package skills, or manage skill architecture. Covers the full lifecycle from brainstorming to production-grade deployment."
category: meta
risk: safe
tags: "[skill-creation, meta-skill, architecture, evaluation, optimization, best-practices]"
version: "1.1.0"
---

# Elite Skill Architect

> The definitive meta-skill — forged from the best open-source skill-creation frameworks — covering the **full lifecycle** from intent capture to production-grade deployment.

## Purpose

This skill is a battle-tested, all-in-one guide for creating, testing, optimizing, and managing AI agent skills. It synthesizes best practices from four leading community frameworks into a single, streamlined workflow that produces professional-quality skills on the first pass.

## When to Use This Skill

Automatically activates when you detect any of the following:
- Creating, building, or designing a new skill
- Improving, refactoring, or debugging an existing skill
- Running evaluations, benchmarks, or A/B comparisons on skills
- Optimizing skill descriptions for better trigger accuracy
- Packaging or installing skills locally or globally
- Understanding skill architecture, progressive disclosure, or best practices
- Working with YAML frontmatter, skill rules, or hook systems

---

## Core Principles

Before diving into the workflow, internalize these principles that separate elite skills from mediocre ones:

1. **Explain the why, not just the what.** LLMs are smart — explain reasoning instead of rigid MUST/ALWAYS directives. Theory-of-mind instructions outperform brute-force constraints.
2. **Keep it lean.** Remove anything that doesn't pull its weight. Read transcripts, not just outputs — if the skill makes the model waste time, cut the offending section.
3. **Generalize from examples.** Skills will be used millions of times across wildly different prompts. Don't overfit to test cases. Prefer flexible patterns over rigid templates.
4. **Progressive disclosure.** For external/public skills, keep SKILL.md under 500 lines and offload details to `references/`. For project-internal skills (in `.agent/`), prioritize completeness over brevity — no line limit applies.
5. **No surprise.** Skills must never contain malware, exploit code, or misleading instructions. The skill's behavior should match its description.
6. **Imperative style.** Write instructions in imperative form. Avoid second-person ("you should") — use direct commands ("Check the schema", "Run the tests").

---

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

### Three-Level Loading System

| Level | What | When | Size Target |
|-------|------|------|-------------|
| **Metadata** | `name` + `description` in YAML | Always in context | ~100 words |
| **SKILL.md body** | Full instructions | When skill triggers | <500 lines |
| **Bundled resources** | references/, scripts/, etc. | On-demand only | Unlimited |

### Critical Rules
- **External/public skills: SKILL.md < 500 lines** — offload details to `references/`
- **Project-internal skills (`.agent/`): no line limit** — completeness > brevity
- **Reference files > 300 lines** — add a table of contents at the top
- **One level deep** — don't nest references within references
- **Domain variants** — organize by framework/platform in `references/` (e.g., `aws.md`, `gcp.md`)

---

## YAML Frontmatter Reference

```yaml
---
name: my-skill-name              # Lowercase, kebab-case, gerund preferred
description: "Comprehensive description including ALL trigger keywords.
  Mention specific topics, file types, use cases, and contexts.
  Be 'pushy' — include adjacent triggers the user might not explicitly name.
  Max 1024 chars."
category: domain                 # meta | domain | guardrail
risk: safe                       # safe | moderate | high
tags: "[tag1, tag2, tag3]"
version: "1.0.0"
---
```

> **Pro tip on descriptions:** Claude undertriggers skills. Combat this by making descriptions slightly "pushy". Instead of *"Format CSV data"*, write *"Format CSV data. Use this skill whenever the user mentions spreadsheets, tabular data, CSV, TSV, data import, data cleaning, or column manipulation, even if they don't explicitly say 'CSV'."*

---

## The Elite Workflow

The workflow has **7 phases**. You can enter at any phase depending on where the user is in the process.

### Phase 1: Intent Capture & Research

**Goal:** Deeply understand what the skill should do before writing a single line.

**1.1 — Capture Intent**

Check if the current conversation already contains a workflow the user wants to turn into a skill. If so, extract: tools used, sequence of steps, corrections made, input/output formats observed.

Ask these questions (adapt to the user's level of technical fluency):

1. **What should this skill enable the AI to do?** (Free-form description)
2. **When should it trigger?** (3-5 trigger phrases)
3. **What's the expected output format?** (Files, console output, structured data?)
4. **What type of skill is this?**
   - General purpose
   - Code generation/modification
   - Documentation creation
   - Analysis/investigation
   - Guardrail (prevents mistakes)
5. **Should we set up test cases?** Suggest based on skill type:
   - ✅ Objectively verifiable outputs → yes
   - ⚠️ Subjective outputs (writing style, design) → optional

**1.2 — Interview & Research**

Proactively ask about:
- Edge cases and failure modes
- Input/output formats and example files
- Success criteria ("what does good look like?")
- Dependencies and compatibility requirements

Research in parallel: check existing skills for overlap, search documentation, look up best practices.

**1.3 — Define Skill Type**

| Type | Enforcement | Priority | Use Case |
|------|------------|----------|----------|
| **Guardrail** | `block` | critical/high | Prevents runtime errors, data integrity issues, security concerns |
| **Domain** | `suggest` | high/medium | Comprehensive guidance, best practices, architectural patterns |
| **Advisory** | `warn` | low | Nice-to-have suggestions, informational reminders |

---

### Phase 2: Drafting the Skill

**Goal:** Write a high-quality first draft following all best practices.

**2.1 — Create the SKILL.md**

```markdown
---
name: {{SKILL_NAME}}
description: "{{DESCRIPTION}}"
---

# {{SKILL_TITLE}}

## Purpose
What this skill helps with — one paragraph.

## When to Use
Specific scenarios and trigger conditions.

## Key Workflow
Step-by-step instructions the AI should follow.

## Patterns & Examples
Real code examples with input → output demonstrations.

## Error Handling
Common failure modes and how to recover.

## References
Pointers to files in references/ for detailed documentation.
```

**2.2 — Writing Style Checklist**

- ✅ Imperative form ("Check the schema", not "You should check the schema")
- ✅ Explain **why** things matter, not just **what** to do
- ✅ Include real code examples (not abstract descriptions)
- ✅ Use theory of mind — write as if explaining to a smart colleague
- ✅ Start with a draft, then review with fresh eyes and improve
- ✅ Avoid heavy-handed MUSTs — reframe as reasoning when possible
- ✅ If you must use output templates, use them like:
  ```markdown
  ## Report Structure
  ALWAYS use this exact template:
  # [Title]
  ## Executive Summary
  ## Key Findings
  ## Recommendations
  ```

**2.3 — Create Supporting Files**

Generate the directory structure:

```bash
SKILL_NAME="my-skill-name"
mkdir -p "skills/$SKILL_NAME"/{references,examples,scripts}
```

Move detailed content (>500 lines) into `references/` with clear pointers from SKILL.md about when to read each file.

---

### Phase 3: Evaluation & Testing

**Goal:** Validate the skill works with real-world prompts before calling it done.

**3.1 — Write Test Cases**

Create 2-5 realistic test prompts — the kind of thing a real user would actually type. Make them specific, with file paths, context, casual language, and varying length.

```json
{
  "skill_name": "my-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "Realistic user prompt with context and details",
      "expected_output": "Description of what good output looks like",
      "files": []
    }
  ]
}
```

Save test cases to `evals/evals.json` in the skill workspace.

**3.2 — Run the Tests**

For each test case, execute the skill against the prompt and capture:
- The output produced
- Timing data (`duration_ms`, `total_tokens`)
- Any errors or unexpected behaviors

Organize results in iteration directories:
```
my-skill-workspace/
├── iteration-1/
│   ├── eval-descriptive-name/
│   │   ├── with_skill/outputs/
│   │   ├── eval_metadata.json
│   │   └── timing.json
│   └── ...
├── iteration-2/
└── ...
```

**3.3 — Draft Assertions**

While tests run, write quantitative assertions for objectively verifiable outputs:

- Good assertions are **objectively verifiable** and have **descriptive names**
- Read clearly in results: "output_contains_valid_json", "chart_has_axis_labels"
- Don't force assertions on subjective quality — use human review for that
- For programmatic checks, write and run a script instead of eyeballing

**3.4 — Collect Feedback**

Present results to the user for qualitative review:
- Show the prompt and the output for each test case
- Ask: "How does this look? Anything you'd change?"

Focus improvements on test cases where the user had specific complaints. Empty feedback = the user thought it was fine.

---

### Phase 4: Iteration & Improvement

**Goal:** Refine the skill based on test results and feedback until it's production-grade.

**4.1 — Analyze Results**

Look for:
- Assertions that always pass (regardless of skill) — these are non-discriminating, not useful
- High-variance results across runs — possibly flaky
- Time/token tradeoffs — is the skill making the model waste effort?
- Repeated work across test cases — if all runs independently write similar helper scripts, **bundle that script** in `scripts/`

**4.2 — Improve the Skill**

Apply these improvement principles:

1. **Generalize from feedback.** Don't overfit to specific test cases. If a change only helps one test case, it's probably too narrow.
2. **Keep the prompt lean.** Read transcripts, not just outputs. Remove instructions that cause unproductive work.
3. **Explain the why.** Instead of "ALWAYS do X", explain why X matters. This produces more robust behavior across diverse prompts.
4. **Bundle repeated work.** If subagents keep writing similar helper scripts, add them to `scripts/`.

**4.3 — Re-run & Re-evaluate**

After each improvement:
1. Apply changes to the skill
2. Rerun all test cases into a new `iteration-<N+1>/` directory
3. Present updated results to the user
4. Read feedback, improve again, repeat

**Stop iterating when:**
- The user says they're happy
- All feedback is empty (everything looks good)
- Improvements are no longer meaningful

---

### Phase 5: Description Optimization

**Goal:** Maximize trigger accuracy so the skill activates when (and only when) it should.

**5.1 — Generate Trigger Eval Queries**

Create 20 eval queries — mix of should-trigger and should-not-trigger:

```json
[
  {"query": "realistic user prompt with context", "should_trigger": true},
  {"query": "near-miss prompt from adjacent domain", "should_trigger": false}
]
```

**Quality guidelines for eval queries:**
- ✅ Realistic, specific, with file paths and personal context
- ✅ Mix of formal and casual language
- ✅ Include typos, abbreviations, varying lengths
- ✅ Should-trigger: different phrasings of the same intent (8-10)
- ✅ Should-not-trigger: near-misses that share keywords but need different tools (8-10)
- ❌ Don't make negatives obviously irrelevant ("write fibonacci" as negative for a PDF skill)

**5.2 — Review with User**

Present the eval set to the user for review. Let them edit, add, remove, and toggle items before running optimization.

**5.3 — Optimize**

Run iterations of description improvement:
1. Evaluate current description against eval queries
2. Analyze failures — what triggered incorrectly? What was missed?
3. Propose an improved description
4. Re-evaluate and compare scores
5. Repeat up to 5 iterations

Select the best description by **test score** (not train score) to avoid overfitting.

**5.4 — Apply the Result**

Update the skill's YAML frontmatter with the optimized description. Show before/after comparison and report the scores.

---

### Phase 6: Finalization & Deployment

**Goal:** Package the skill and make it ready for production use.

**6.1 — Validation Checklist**

Run through this checklist before declaring the skill complete:

- [ ] SKILL.md has proper YAML frontmatter (name + description)
- [ ] SKILL.md is under 500 lines
- [ ] Description includes ALL trigger keywords/phrases
- [ ] Reference files have table of contents (if >300 lines)
- [ ] Real code examples are included
- [ ] Error handling is documented
- [ ] Writing style follows imperative form
- [ ] No second-person language ("you should")
- [ ] Test cases pass with acceptable results
- [ ] No false positives in trigger testing
- [ ] No false negatives in trigger testing

**6.2 — Installation**

Install in the appropriate location:

```bash
SKILL_NAME="my-skill-name"
SKILLS_DIR="skills"  # or .agent/skills, .claude/skills, etc.

# Copy skill to target directory
cp -r "$SKILL_NAME" "$SKILLS_DIR/$SKILL_NAME"

# Verify installation
ls -la "$SKILLS_DIR/$SKILL_NAME/SKILL.md"
```

**6.3 — Completion Summary**

Present a summary to the user:

```
🎉 Skill created successfully!

📦 Skill: {{SKILL_NAME}}
📁 Location: skills/{{SKILL_NAME}}/
📊 Lines: {{LINE_COUNT}} (target: <500)

📋 Files:
   ✅ SKILL.md
   ✅ references/ ({{REF_COUNT}} files)
   ✅ examples/ ({{EXAMPLE_COUNT}} files)
   ✅ scripts/ ({{SCRIPT_COUNT}} files)

🧪 Evaluation:
   ✅ {{PASS_COUNT}}/{{TOTAL_COUNT}} test cases passed
   ✅ Trigger accuracy: {{ACCURACY}}%

📋 AGENTS.md:
   ✅ Registered in skill table with trigger keywords

🚀 Next Steps:
   1. Try trigger phrases in real conversations
   2. Add more examples based on real usage
   3. Commit and share with the team
```

---

### Phase 7: AGENTS.md Registration

**Goal:** Register the new skill in the project's `AGENTS.md` so it is discoverable and triggered automatically in every conversation.

**7.1 — Locate AGENTS.md**

Find the project's `AGENTS.md` file (typically at `.agent/AGENTS.md` or `AGENTS.md` in the project root). This file contains a skill registry table that the AI agent reads on every request.

**7.2 — Extract Trigger Keywords**

From the skill's YAML frontmatter `description` field, extract 5-8 of the most relevant trigger keywords. These should be:
- Short, specific terms the user would naturally use
- A mix of German and English if the project is bilingual
- Lowercase, comma-separated, in quotes

**Example extraction:**
```
Description: "Design system patterns for Tailwind CSS v4 including utility classes, 
responsive design, component patterns, and dark mode."

→ Keywords: "tailwind", "css", "design system", "utility classes", "responsive", "dark mode"
```

**7.3 — Add to Skill Table**

Insert a new row into the `## 🎯 Skills` table in `AGENTS.md`:

```markdown
| `./skills/{{SKILL_NAME}}.md` | "keyword1", "keyword2", "keyword3", "keyword4", "keyword5" |
```

**Rules:**
- File path must be relative to the `.agent/` directory
- Keep alphabetical order in the table if possible
- Verify the file path actually resolves to the skill file
- Don't duplicate keywords already covered by existing skills

**7.4 — Verify Registration**

After adding the entry:
1. Read back the `AGENTS.md` to confirm the new row is in the table
2. Check that the file path is correct
3. Confirm no formatting issues in the markdown table

**7.5 — Inform the User**

```
📋 Skill registered in AGENTS.md:
   File:     ./skills/{{SKILL_NAME}}.md
   Keywords: "keyword1", "keyword2", "keyword3", ...
   
   The skill will now be automatically discovered and triggered
   in every conversation when these keywords are mentioned.
```

---

## Error Handling

### Skill Not Triggering
- Check description includes relevant keywords
- Verify description is under 1024 characters
- Test with realistic, substantive prompts (simple queries may not trigger)
- Make description more "pushy" — include adjacent concepts

### False Positives (Too Many Triggers)
- Narrow keyword scope
- Add should-not-trigger test cases
- Use more specific intent patterns

### Content Too Long
- Move sections to `references/` folder
- Add table of contents to long files
- Use progressive disclosure pattern

### Validation Failures
- Check YAML frontmatter syntax
- Verify description is in third-person format
- Ensure word count is within limits
- Fix writing style (imperative, no second-person)

---

## Quick Reference

| Action | Command |
|--------|---------|
| Create skill directory | `mkdir -p skills/my-skill/{references,examples,scripts}` |
| Validate YAML | `head -20 SKILL.md` (check frontmatter) |
| Count lines | `wc -l SKILL.md` (target: <500) |
| Test triggers | Run 3+ realistic prompts |
| Run evaluation | Save tests to `evals/evals.json`, run, collect feedback |
| Optimize description | Generate 20 trigger queries, iterate up to 5 times |
| Register in AGENTS.md | Add skill to `## 🎯 Skills` table with trigger keywords |

---

## Sources & Credits

This elite skill was synthesized from the best elements of these community frameworks:

- **sickn33/skill-developer** — Hook architecture, skill types, enforcement levels, testing patterns
- **sickn33/skill-creator** — 6-phase workflow, progress tracking, multi-platform support, validation
- **sickn33/skill-seekers** — Auto-conversion patterns for docs/repos/PDFs
- **guanyang/skill-creator** — Interview-driven creation, eval/benchmark system, description optimization, iteration loops with blind comparison, writing philosophy

---

*Elite Skill Architect v1.1.0 — The best from the best.* ✨
