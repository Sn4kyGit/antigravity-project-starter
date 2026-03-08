# 🚀 Antigravity Supercharged Project Engine

Welcome to the ultimate starter kit for AI-assisted software development using the **Antigravity** architecture.

This repository bundles a highly customized set of AI Agent Skills and Model Context Protocol (MCP) server configurations designed to drastically improve large-scale project planning, architecture design, and codebase exploration.

## 🌟 What's inside?

1. **Integrated `jCodeMunch` (O(1) Codebase Retrieval)**
   Instead of the AI agents reading thousands of lines of files blindly and chewing through tokens, `jcodemunch` uses tree-sitter AST indexation. The agents query exactly the symbols (functions/classes) they need, cutting token costs by up to 99%.
   
2. **Integrated `NotebookLM` Deep Research**
   Agents can query your private Google NotebookLM notebooks to synthesize vast amounts of architecture documents, PRDs, and domain knowledge before writing a single line of code.

3. **Curated OpenSpec Workflows**
   Included are optimized `openspec-explore` and `openspec-apply-change` skills that natively trigger the `jcodemunch` indexer before proceeding.

4. **Massive Suite of Specialized Agents & Workflows**
   Included in the `.agent` folder are dozens of specialized skills:
   - **Architecture & Design**: `expert-product-manager`, `architecture-c4-model`, `design-system-architect`, Frontend/Backend Architects.
   - **Quality & Testing**: `elite-qa-architect`, `process-systematic-debugging`, `webapp-testing`.
   - **Code Engine**: `openspec` (Explore, Propose, Apply) for spec-driven development.
   - **Research**: `notebooklm-researcher` for massive context integration.
   - *...and many more tailored for complete software lifecycle management.*

## 🛠️ Installation

To turbocharge your next Antigravity project, navigate to your target project directory and simply run:

```bash
npx antigravity-awesome-skills
```

### What does the NPX script do?
1. Checks for and installs `uv` (the lightning-fast Python package installer).
2. Installs the `notebooklm-mcp-cli` globally.
3. Copies the `AGENTS.md` and the entire `.agent/` suite into your current working directory.
4. **Bootstraps `CONTINUITY.md`** so the OpenSpec 5-Gate process begins working out of the box.
5. Safely injects the MCP server definitions (for `notebooklm-mcp` and `jcodemunch`) into your global `~/.gemini/antigravity/mcp_config.json`.

### ⚠️ Post-Installation Setup
After running the script, you **must** authenticate the NotebookLM service:
```bash
nlm login
```
This will open a Chrome browser profile. Log in to your Google account that has access to your NotebookLM instances. Close the browser, restart your Antigravity session, and you are ready to build!

## 🔄 The 5-Gate OpenSpec Workflow

This starter kit enforces a disciplined, 5-Gate Spec-Driven development cycle outlined in your `AGENTS.md`:

1. **GATE 1 — UNDERSTAND (Continuity + Memory + Research)**
   The agent checks `CONTINUITY.md`, boots a session via `antigravity-memory`, and uses `jcodemunch` to index and search your codebase (saving up to 99% tokens).
2. **GATE 2 — ANALYZE (Risks & Impact)**
   The agent structurally evaluates which architectural layers are affected and scores the risk before writing code.
3. **GATE 3 — PLAN (Spec-Driven via OpenSpec)**
   Using `/opsx:propose`, the agent generates rigid change proposals, design docs, and atomic tasks to gain your approval.
4. **GATE 4 — IMPLEMENT (RARV Loop)**
   Using `/opsx:apply`, the agent surgically applies code using `jcodemunch` (O(1) code retrieval) in small, testable chunks.
5. **GATE 5 — VERIFY (Testing & Memory)**
   Tests are run, knowledge is stored permanently in the agent memory (`memory_save_note`), and the cycle completes.

## 🧠 The Skill Creator Workflow

Need a highly specialized agent for a niche framework? Use the built-in **Skill Creator Workflow**:
1. Just ask the agent: *"Turn this workflow into a skill"* or *"Create a new skill for Next.js caching"*.
2. The `elite-skill-architect` is invoked automatically.
3. It drafts a structured `SKILL.md` matching our strict YAML-frontmatter standard.
4. It natively saves the file into your `.agent/skills/` directory and auto-registers the triggers globally inside `AGENTS.md`.

---

## 🙏 Acknowledgments
This starter kit stands on the shoulders of giants. Special thanks to the creators of the core MCP servers that make this workflow possible:
- **`jacob-bd/notebooklm-mcp-cli`**: For reverse-engineering the CDP flow and bringing Google's NotebookLM natively into the Model Context Protocol.
- **`jgravelle/jcodemunch-mcp`**: For creating the ingenious O(1) AST-based codebase indexer that saves millions of tokens.

---

*Build faster. Build smarter. Defy gravity.*
