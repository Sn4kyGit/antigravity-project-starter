# Git Workflow Rules
> Saubere Git-History ist Dokumentation. Jeder Commit erklärt Was und Warum.

---

## 1. Conventional Commits (Pflicht)

```
<type>(<scope>): <beschreibung>

[optionaler Body]

[optionaler Footer]
```

### Typen
| Type | Wann | Beispiel |
|---|---|---|
| `feat` | Neue Funktionalität | `feat(rag): add document reranking step` |
| `fix` | Bugfix | `fix(auth): correct JWT expiry calculation` |
| `refactor` | Code-Umbau ohne Funktionsänderung | `refactor(retriever): extract score filtering` |
| `docs` | Dokumentation | `docs(api): add endpoint descriptions` |
| `test` | Tests hinzufügen/ändern | `test(chunker): add edge case for empty text` |
| `chore` | Build, Dependencies, Config | `chore(deps): update pydantic to 2.8.0` |
| `perf` | Performance-Verbesserung | `perf(embedder): add Redis caching layer` |
| `style` | Formatierung (kein Logic-Change) | `style: apply ruff formatting` |
| `ci` | CI/CD Pipeline | `ci: add test coverage check` |
| `revert` | Commit rückgängig | `revert: feat(rag): add reranking step` |

### Scopes (für dieses Projekt)
```
api, auth, rag, retriever, embedder, generator, chunker,
avatar, chat, documents, tasks, db, config, frontend, ui
```

---

## 2. Commit-Message Regeln

```bash
# ✅ Gute Commits
feat(rag): add similarity threshold filtering to retriever
fix(llm): handle OpenRouter rate limit with exponential backoff
refactor(services): extract document validation into separate module
chore(deps): update taskiq to 0.11.0, fix breaking change in broker setup
test(chunker): add tests for edge cases (empty text, single word, unicode)

# ❌ Schlechte Commits
update
fix bug
WIP
asdf
changed stuff
added feature
```

### Commit-Body (wann erforderlich)
```bash
# Body verwenden wenn: Warum nicht offensichtlich, Breaking Change, komplexe Entscheidung

feat(llm): switch primary RAG model to deepseek-v3

DeepSeek V3 shows 40% better factual accuracy on our test queries
compared to llama-4-maverick while remaining in the free tier.

Tested against 50 sample queries from our knowledge base.
See docs/decisions/ADR-003-model-selection.md for full evaluation.
```

---

## 3. Branch-Strategie

```
main                     ← Immer deploybar, protected
  └── develop            ← Integration Branch
        ├── feat/rag-pipeline-v1
        ├── feat/avatar-state-machine
        ├── fix/auth-jwt-expiry
        └── refactor/repository-layer
```

### Branch-Naming
```bash
# Format: <type>/<kurze-beschreibung-in-kebab-case>

feat/rag-document-ingestion
feat/butler-chat-integration
fix/openrouter-fallback-logic
fix/qdrant-connection-pool
refactor/service-layer-cleanup
docs/api-documentation
chore/docker-compose-setup
```

---

## 4. Absolut verbotene Actions

```bash
# ❌ Niemals: Direkt in main oder develop pushen
git push origin main
git push origin develop

# ❌ Niemals: Force-Push auf geteilte Branches
git push --force origin main
git push --force origin develop

# ❌ Niemals: Commits ohne Beschreibung
git commit -m "."
git commit -m "update"
git commit -m "test"

# ❌ Niemals: Secrets committen
git add .env
git commit -m "add config"
```

---

## 5. Pull Request Regeln

### PR-Template
```markdown
## Was ändert sich?
[Kurze Beschreibung der Änderung]

## Warum?
[Begründung / Verlinkter Issue]

## Wie testen?
[Schritte zum Testen]

## Checkliste
- [ ] Tests geschrieben und grün
- [ ] Type Hints vollständig
- [ ] Kein hardgecoded Werte
- [ ] .env.example aktualisiert (falls neue Env-Vars)
- [ ] README aktualisiert (falls neues Feature)
- [ ] Keine sensiblen Daten im Commit
```

### Merge-Voraussetzungen
- Mindestens **1 Approval** (bei Team-Entwicklung)
- Alle **CI-Checks grün** (Tests, Linting, Type-Check)
- **Keine Merge-Konflikte**
- Branch ist **up-to-date** mit develop/main

---

## 6. Git Hooks (automatisch erzwingen)

```bash
# pre-commit Hook installieren
pip install pre-commit
# .pre-commit-config.yaml:
```

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.0
    hooks:
      - id: ruff              # Linting
      - id: ruff-format       # Formatierung

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.10.0
    hooks:
      - id: mypy              # Type-Checking

  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: check-added-large-files      # Keine Dateien > 1MB
      - id: detect-private-key           # Keine SSH-Keys
      - id: check-merge-conflict         # Keine ungelösten Konflikte
      - id: trailing-whitespace
      - id: end-of-file-fixer

  - repo: https://github.com/commitizen-tools/commitizen
    rev: v3.27.0
    hooks:
      - id: commitizen                   # Conventional Commits erzwingen
```

```bash
# Nach Setup ausführen:
pre-commit install
pre-commit install --hook-type commit-msg
```

---

## 7. Tagging & Releases

```bash
# Semantic Versioning: MAJOR.MINOR.PATCH
# v1.0.0 — Erste stabile Version
# v1.1.0 — Neue Feature(s)
# v1.1.1 — Bugfix

git tag -a v1.0.0 -m "Release v1.0.0: Initial RAG pipeline"
git push origin v1.0.0
```

---

## 8. Commit-Häufigkeit

- **Kleine, atomare Commits** — ein Commit = eine logische Änderung
- Kein "alle Änderungen der letzten Woche in einem Commit"
- Kein "ein Commit für 15 verschiedene Dateien"
- Wenn ein Commit-Body mehr als 5 Punkte braucht → aufteilen

```bash
# ✅ Gut: Atomare Commits
git commit -m "feat(chunker): add recursive chunking strategy"
git commit -m "test(chunker): add tests for recursive strategy"
git commit -m "docs(chunker): document chunk_strategy config option"

# ❌ Schlecht: Alles in einem
git commit -m "add chunker with tests and docs and fix old bug and update deps"
```
