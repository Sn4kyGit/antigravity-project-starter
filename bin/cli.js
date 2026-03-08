#!/usr/bin/env node

/**
 * Antigravity Supercharged Project Engine - NPX Installer
 * Installs the custom `.agent` directory, `AGENTS.md`, bootstraps `CONTINUITY.md` 
 * and configures the `mcp_config.json` for NotebookLM and jCodeMunch.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

console.log("🚀 Initializing Antigravity Supercharged Project Engine...");

const TARGET_DIR = process.cwd();
const SOURCE_DIR = path.join(__dirname, '..');

// Helper to copy recursive
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// 1. Copy AGENTS.md
const agentsSource = path.join(SOURCE_DIR, 'AGENTS.md');
const agentsDest = path.join(TARGET_DIR, 'AGENTS.md');
if (fs.existsSync(agentsSource)) {
  if (!fs.existsSync(agentsDest)) {
    fs.copyFileSync(agentsSource, agentsDest);
    console.log("✅ AGENTS.md copied.");
  } else {
    console.log("⚠️ AGENTS.md already exists in the current directory. Skipping.");
  }
}

// 2. Copy .agent/ directory
const agentSourceDir = path.join(SOURCE_DIR, '.agent');
const agentDestDir = path.join(TARGET_DIR, '.agent');
if (fs.existsSync(agentSourceDir)) {
  if (!fs.existsSync(agentDestDir)) {
    copyRecursiveSync(agentSourceDir, agentDestDir);
    console.log("✅ Custom skills and workflows copied to .agent/.");
  } else {
    console.log("⚠️ .agent/ already exists. You might want to merge them manually.");
  }
}

// 3. Bootstrap CONTINUITY.md for the 5-Gate Workflow
const continuityFile = path.join(agentDestDir, 'CONTINUITY.md');
if (!fs.existsSync(continuityFile)) {
  const initialContinuity = `
# 🌀 Continuity Status (5-Gate OpenSpec Workflow)

**Current Task:** Bootstrapping new project
**Current Gate:** GATE 1 — UNDERSTAND
**Status:** Initializing structure, analyzing requirements...

---

## 📅 Action Log
- Installed Antigravity Supercharged Project Engine via NPX.
- Ready to begin project design phase.
`;
  if (!fs.existsSync(agentDestDir)) fs.mkdirSync(agentDestDir, { recursive: true });
  fs.writeFileSync(continuityFile, initialContinuity.trim());
  console.log("✅ Bootstrapped .agent/CONTINUITY.md for the 5-Gate process.");
}

// 4. Check for 'uv' and install notebooklm-mcp-cli
console.log("📦 Checking dependencies...");
try {
  execSync('command -v uv', { stdio: 'ignore' });
} catch (e) {
  console.log("⚠️ 'uv' not found. We recommend installing it: curl -LsSf https://astral.sh/uv/install.sh | sh");
}

try {
  console.log("📥 Installing/updating notebooklm-mcp-cli using uv...");
  execSync('uv tool install notebooklm-mcp-cli', { stdio: 'ignore' });
} catch (e) {
  console.log("⚠️ Could not trigger uv tool install for notebooklm-mcp-cli. Ensure uv is installed and in your PATH.");
}

// 5. Patch MCP Configuration
const mcpConfigPath = path.join(os.homedir(), '.gemini', 'antigravity', 'mcp_config.json');
console.log(`⚙️ Configuring Antigravity MCP servers in ${mcpConfigPath}...`);

try {
  let mcpData = {};
  if (fs.existsSync(mcpConfigPath)) {
    fs.copyFileSync(mcpConfigPath, \`\${mcpConfigPath}.backup\`);
    mcpData = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf8'));
  }
  
  if (!mcpData.mcpServers) mcpData.mcpServers = {};

  mcpData.mcpServers['notebooklm-mcp'] = {
    "command": "uvx",
    "args": ["--from", "notebooklm-mcp-cli", "notebooklm-mcp"]
  };

  mcpData.mcpServers['jcodemunch'] = {
    "command": "npx",
    "args": ["-y", "@jgravelle/jcodemunch-mcp"]
  };

  const configDir = path.dirname(mcpConfigPath);
  if (!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  
  fs.writeFileSync(mcpConfigPath, JSON.stringify(mcpData, null, 2));
  console.log("✅ MCP configuration updated (backup saved).");
} catch (err) {
  console.error("❌ Failed to update MCP configuration: ", err.message);
}

console.log("\\n🎉 Installation Complete!");
console.log("========================================");
console.log("⚠️ IMPORTANT NEXT STEP:");
console.log("Please run: nlm login");
console.log("This will open a Chrome profile where you need to log into your Google Account to enable NotebookLM access.");
console.log("Once logged in, restart your Antigravity session, and you are ready to build the future! 🚀");
console.log("========================================");
