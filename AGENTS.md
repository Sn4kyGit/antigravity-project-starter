# AGENTS.md — Shared Agent Configuration (Root-Level)

> Diese Datei wird von jedem AI-Agent bei JEDER Anfrage geladen.
> Sie enthält universelle Quality Gates, Skills und Regeln.

---

## 🎯 Zweck

Diese Root-Level Konfiguration bietet:
- **Universelle Quality Gates** — Gültig für alle Projekte im Workspace
- **Shared Skills** — Wiederverwendbare Skills
- **OpenSpec Workflows** — Spec-Driven Development Standard

---

## 📋 Shared Rules (immer aktiv)

*Momentan sind noch keine globalen Shared Rules definiert. Diese können künftig hier ergänzt werden.*

---

## 🧰 Shared Skills

### Architecture Skills
| Datei | Trigger-Keywords |
|---|---|
| `./.agent/skills/architecture-database-design/SKILL.md` | "postgres", "database", "sql", "schema", "migration", "optimization", "indexing" |
| `./.agent/skills/architecture-frontend-design/SKILL.md` | "frontend", "design", "ui", "ux", "aesthetics", "guidelines", "architecture" |
| `./.agent/skills/architecture-python-backend/SKILL.md` | "python", "backend", "architecture", "fastapi", "guidelines", "patterns", "layers" |
| `./.agent/skills/architecture-react-nextjs/SKILL.md` | "react", "nextjs", "frontend", "performance", "architecture", "server components" |
| `./.agent/skills/elite-frontend-architect/SKILL.md` | "react", "nextjs", "ui/ux", "tailwind", "frontend performance", "styling", "ui architecture" |
| `./.agent/skills/elite-python-architect/SKILL.md` | "python", "fastapi", "asyncio", "design patterns", "backend architecture" |
| `./.agent/skills/elite-database-architect/SKILL.md` | "postgresql", "schema design", "migrations", "optimization", "database architecture", "query optimization" |
| `./.agent/skills/elite-devops-architect/SKILL.md` | "docker", "k8s", "ci/cd", "terraform", "infrastructure", "pipelines", "containerization" |
| `./.agent/skills/architecture-c4-model/SKILL.md` | "c4", "architecture", "diagram", "system-design", "context", "container", "component" |
| `./.agent/skills/design-system-architect/SKILL.md` | "design-system", "design", "ui", "styling", "tokens", "DESIGN.md" |


### Quality Skills
| Datei | Trigger-Keywords |
|---|---|
| `./.agent/skills/elite-qa-architect/SKILL.md` | "tdd", "e2e", "playwright", "cypress", "integration testing", "bug hunting" |
| `./.agent/skills/code-review-excellence/SKILL.md` | "code review", "provide feedback", "catch bugs", "evaluate", "pr", "pull request" |
| `./.agent/skills/vibe-code-auditor/SKILL.md` | "audit", "security", "technical-debt", "review", "architecture" |

### Process Skills
| Datei | Trigger-Keywords |
|---|---|
| `./.agent/skills/brainstorming/SKILL.md` | "brainstorm", "design", "plan", "idea", "creative work", "features", "requirements" |
| `./.agent/skills/brainstorming-designs/SKILL.md` | "brainstorming", "design", "planning", "collaboration", "architecture" |
| `./.agent/skills/devops-docker-architect/SKILL.md` | "devops", "docker", "containerization", "ci/cd", "infrastructure" |
| `./.agent/skills/process-project-development/SKILL.md` | "architecture", "methodology", "llm routing", "state machine", "pipeline", "process" |
| `./.agent/skills/process-systematic-debugging/SKILL.md` | "debugging", "bugfix", "root cause", "testing", "process", "flaky tests" |
| `./.agent/skills/process-verify-completion/SKILL.md` | "verification", "QA", "testing", "completion", "evidence", "check" |
| `./.agent/skills/process-writing-plans/SKILL.md` | "planning", "tdd", "implementation", "architecture", "steps", "tasks", "process" |
| `./.agent/skills/qa-tdd-architect/SKILL.md` | "testing", "qa", "tdd", "debugging", "pytest", "jest", "playwright" |

### Meta Skills
| Datei | Trigger-Keywords |
|---|---|
| `./.agent/skills/skill-creator/SKILL.md` | "skill erstellen", "create skill", "build skill", "turn this into a skill", "automating a workflow" |
| `./.agent/skills/elite-skill-architect/SKILL.md` | "skill-creation", "meta-skill", "architecture", "evaluation", "optimization", "best-practices" |
| `./.agent/skills/elite-agent-memory-system/SKILL.md` | "agent-memory", "mcp-server", "knowledge-management", "vector-store", "retrieval", "persistence" |
| `./.agent/skills/planning-with-files/SKILL.md` | "planning", "context-management", "manus", "methodology", "tracking" |
| `./.agent/skills/subagent-driven-development/SKILL.md` | "subagent", "parallelization", "workflow", "review", "execution" |
| `./.agent/skills/core-skill-obedience/SKILL.md` | "superpowers", "obedience", "rules", "system", "core" |

### Expert Skills (Multi-Agent Swarm)
| Datei | Trigger-Keywords |
|---|---|
| `./.agent/skills/expert-dev/SKILL.md` | "development", "coding", "implementation", "refactoring", "debugging", "feature" |
| `./.agent/skills/expert-devops/SKILL.md` | "devops", "cicd", "docker", "kubernetes", "infrastructure", "deployment", "monitoring" |
| `./.agent/skills/expert-product-manager/SKILL.md` | "product-manager", "pm", "vision", "strategy", "saas-metrics", "prd" |
| `./.agent/skills/expert-orchestrator/SKILL.md` | "orchestrator", "multi-agent", "swarm", "coordination", "delegation", "integration", "complexity-assessment" |
| `./.agent/skills/expert-product-owner/SKILL.md` | "product-owner", "agile", "requirements", "user-stories", "acceptance-criteria", "prioritization" |
| `./.agent/skills/expert-qa-engineer/SKILL.md` | "qa", "testing", "strategy", "coverage", "quality-gates", "test-pyramid", "metrics" |
| `./.agent/skills/expert-qa-test/SKILL.md` | "qa-testing", "automation", "playwright", "cypress", "e2e", "test-implementation", "factory-pattern", "tdd" |
| `./.agent/skills/expert-tech-architect/SKILL.md` | "architecture", "system-design", "tech-stack", "ADR", "patterns", "API-design", "database" |

### Utility Skills
| Datei | Trigger-Keywords |
|---|---|
| `./.agent/skills/advanced-evaluation/SKILL.md` | "evaluation", "llm-as-judge", "quality", "testing", "rubrics" |
| `./.agent/skills/openapi-spec-generation/SKILL.md` | "openapi", "swagger", "api documentation", "generate spec", "api contract" |
| `./.agent/skills/rag-implementation/SKILL.md` | "rag", "retrieval-augmented generation", "vector db", "semantic search", "knowledge-grounded" |
| `./.agent/skills/using-git-worktrees/SKILL.md` | "git", "workflow", "isolation", "safety", "worktree", "experimental" |
| `./.agent/skills/vercel-composition-patterns/SKILL.md` | "react", "nextjs", "frontend", "architecture", "patterns", "composition" |
| `./.agent/skills/web-interface-guidelines/SKILL.md` | "frontend", "design", "ui", "ux", "guidelines", "aesthetics", "vercel", "a11y", "styling" |
| `./.agent/skills/webapp-testing/SKILL.md` | "testing", "playwright", "e2e", "browser", "automation", "frontend" |
| `./.agent/skills/writing-clearly-and-concisely/SKILL.md` | "write", "prose", "documentation", "commit message", "ui copy", "clarity" |
| `./.agent/skills/attune-task-bridge/SKILL.md` | "attune", "bridge", "task definition", "agent context" |
| `./.agent/skills/mcp-builder/SKILL.md` | "mcp-server", "model context protocol", "mcp integration", "fastmcp", "mcp sdk" |
| `./.agent/skills/notebooklm-researcher/SKILL.md` | "notebooklm", "research", "mcp-server", "deep-research", "synthesis" |

---

## 🔄 OpenSpec Workflows

Spec-Driven Development Workflows (im `.agent/skills/` Ordner hinterlegt):

| Workflow | Datei | Zweck |
|---|---|---|
| OPSX-PROPOSE | `./.agent/skills/openspec-propose/SKILL.md` | Neuen Change vorschlagen |
| OPSX-APPLY | `./.agent/skills/openspec-apply-change/SKILL.md` | Change implementieren |
| OPSX-ARCHIVE | `./.agent/skills/openspec-archive-change/SKILL.md` | Change abschließen/archivieren |
| OPSX-EXPLORE | `./.agent/skills/openspec-explore/SKILL.md` | Ideen explorieren |

---

## ⚙️ Workflow — Quality Gates (bei jeder Anfrage)

> **Grundregel:** Kein Gate überspringen. Bei einfachen Fragen (Erklärungen, Quick-Fixes) können Gates verkürzt durchlaufen werden.
> **Sichtbarkeit:** Der Agent MUSS bei jedem Start eines neuen Gates ein Status-Update an den User senden (z.B. durch Task-Boundaries oder UI-Updates: "Beginne Gate 1: Understand", "Wechsle zu Gate 2: Analyze", etc.), damit der Prozess transparent bleibt.

### 🔍 GATE 1 — UNDERSTAND (Continuity + Memory + Research)

```
CONTINUITY (allererster Schritt):
├── PROJEKT/.agent/CONTINUITY.md lesen → "Wo war ich? Was war der Stand?"
├── Wenn veraltet/anderer Task → Felder zurücksetzen, neuen Task eintragen
└── Aktuellen Task + Status + Gate in CONTINUITY.md setzen

MEMORY:
├── memory_start_session für dieses Projekt aufrufen (falls neue Aufgabe begonnen)
├── memory_get_context aufrufen, um historischen System-Zustand zu laden
└── Relevantes Wissen einbeziehen und ggf. in CONTINUITY.md eintragen

RESEARCH:
├── JCODEMUNCH: Bei neuen Projekten sofort `mcp_jcodemunch_index_folder` (bzw. `_repo`) ausführen!
├── Betroffene Files/Module via jCodeMunch identifizieren (`get_repo_outline`, `search_symbols`)
├── Aktuellen Code verstehen (nicht raten, O(1) Fetching via `get_symbol` nutzen)
└── Passenden Skill laden (Root + Projekt)
```

### 🧠 GATE 2 — ANALYZE (Risiken + Auswirkungen)

```
IMPACT-ANALYSE:
├── Welche Schichten sind betroffen?
├── Breaking Changes?
└── Dependencies checken

RISIKO-BEWERTUNG:
├── 🟢 Niedrig: Isolierte Änderung
├── 🟡 Mittel: Mehrere Schichten betroffen
├── 🟠 Hoch: Breaking Change, Migration
└── 🔴 Kritisch: Architektur-Änderung → ADR erforderlich

TECH-STACK RESEARCH (nach Architektur-Entscheidungen):
├── Gewählte Frameworks/Libraries auf Aktualität prüfen
├── Breaking Changes in neuen Versionen identifizieren
├── Bei Bedarf jCodeMunch + Web Search für Validierung nutzen
└── Ergebnisse in design.md / research.md dokumentieren
```

### 📋 GATE 3 — PLAN (Spec-Driven via OpenSpec)

```
SPECS ERSTELLEN (wenn nicht trivial):
├── /opsx-propose nutzen
├── Artefakte generieren: proposal.md, specs/, design.md, tasks.md
└── User-Approval einholen

PLAN-DETAILS:
├── Dependencies first (innerste Schicht zuerst)
└── Kleine, testbare Schritte
```

### 🔨 GATE 4 — IMPLEMENT (RARV Loop)

```
PRO SCHRITT:
├── PRE-ACT: Ziel checken (Drift vermeiden)
├── ACT: Code schreiben (mit Rules/Skills)
├── VERIFY: Kompiliert? Tests grün?
└── REFLECT: CONTINUITY.md updaten & memory_observe bei signifikanten Zwischenschritten
```

### 🧪 GATE 5 — VERIFY (Testen + Memory + Commit)

```
TESTEN:
├── Linter/Type-Check sauber?
├── Tests grün?
└── Edge Cases berücksichtigt?

MEMORY:
├── Erkenntnisse sichern? → memory_save_note detailliert aufrufen (für Entscheidungen, Patterns, Learnings)
└── ABSCHLUSS: Nach Beenden der gesamten Aufgabe zwingend memory_end_session aufrufen

CONTINUITY:
├── Fortschritt dokumentieren
├── Nächste Schritte notieren
└── Status updaten
```

---

## 🚫 Universelle Verbote

Der Agent darf NIEMALS:
- Secrets oder API-Keys in Code schreiben
- Ohne Rückfrage bestehende, gut getestete Architektur-Muster über den Haufen werfen

---

## 🔄 Wenn Anforderungen unklar sind

1. **Kurze Rückfrage** stellen bevor Code generiert wird
2. **Architektur-Entscheidungen** → ADR / Propose vorschlagen
