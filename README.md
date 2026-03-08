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

To turbocharge your next Antigravity project, simply clone this repository and run the installation script from within your target project directory:

```bash
git clone https://github.com/yourusername/antigravity-project-starter.git
cd antigravity-project-starter
chmod +x install.sh
./install.sh
```

### What does `install.sh` do?
1. Checks for and installs `uv` (the lightning-fast Python package installer).
2. Installs the `notebooklm-mcp-cli` globally.
3. Copies the `AGENTS.md` and `.agent/skills/` into your current working directory.
4. Safely injects the MCP server definitions (for `notebooklm-mcp` and `jcodemunch`) into your global `~/.gemini/antigravity/mcp_config.json`.

### ⚠️ Post-Installation Setup
After running the script, you **must** authenticate the NotebookLM service:
```bash
nlm login
```
This will open a Chrome browser profile. Log in to your Google account that has access to your NotebookLM instances. Close the browser, restart your Antigravity session, and you are ready to build!

## 🔄 Workflow

1. Start with the `notebooklm-researcher` or `expert-product-manager` to scope out your vision.
2. Trigger the `architecture-c4-model` to map out the system boundaries.
3. Use `/opsx:propose` to create specific feature changes.
4. Execute via `/opsx:apply` where `jCodeMunch` will surgically navigate your codebase.

---

## 🙏 Acknowledgments
This starter kit stands on the shoulders of giants. Special thanks to the creators of the core MCP servers that make this workflow possible:
- **`jacob-bd/notebooklm-mcp-cli`**: For reverse-engineering the CDP flow and bringing Google's NotebookLM natively into the Model Context Protocol.
- **`jgravelle/jcodemunch-mcp`**: For creating the ingenious O(1) AST-based codebase indexer that saves millions of tokens.

---

*Build faster. Build smarter. Defy gravity.*
