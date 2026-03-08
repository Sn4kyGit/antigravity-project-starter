# Memory-System — Automatisches Wissensmanagement

> **Priorität:** 🟠 Hoch
> **MCP Server:** `antigravity-memory` (Tools: `memory_start_session`, `memory_get_context`, `memory_observe`, `memory_save_note`, `memory_end_session`, `memory_list_sessions`)

---

## Wann Memory LESEN (memory_search)

Vor jeder Implementierung prüfe, ob relevantes Wissen existiert:

```
✅ Neues Feature planen     → `memory_get_context` 
✅ Bug debuggen             → `memory_get_context` oder alte Verläufe via `memory_list_sessions` prüfen
✅ Architektur-Frage        → `memory_get_context` einbinden
```

### Rule: Session-Start
Bei Beginn einer neuen Session mit klarem Aufgabenbereich:
1. `memory_start_session`, um die Aufzeichnung zu beginnen.
2. `memory_get_context` mit dem Hauptthema der Anfrage durchführen.
3. Den historischen Kontext in die Planung einbeziehen.
4. Dem User mitteilen wenn relevantes Wissen aus der Vergangenheit geladen wurde.

---

Speichere Wissen nach diesen Events automatisch via `memory_save_note` oder `memory_observe`:

### 🔴 Immer speichern

| Event | Memory Type | Beispiel-Key |
|-------|------------|--------------|
| Architektur-Entscheidung (ADR) | `decision` | `auth-strategy-jwt-v1` |
| Tech-Stack Änderung | `decision` | `switch-to-heroui-v2` |
| Neues Code-Pattern etabliert | `pattern` | `fastapi-dependency-injection` |
| Bug gelöst (nicht-trivial) | `debug` | `fix-qdrant-timeout-issue` |
| Projekt-Konvention definiert | `context` | `naming-convention-components` |

### 🟠 Oft speichern

| Event | Memory Type | Beispiel-Key |
|-------|------------|--------------|
| Lesson learned / Gotcha | `learning` | `gotcha-nextjs-app-router-caching` |
| Architektur-Überblick | `architecture` | `rag-pipeline-architecture-v2` |
| API-Design Entscheidung | `decision` | `api-error-format-rfc7807` |
| Performance-Optimierung | `pattern` | `redis-cache-strategy-sessions` |

### 🟢 Optional speichern

| Event | Memory Type | Beispiel-Key |
|-------|------------|--------------|
| Nützliches Tool/Library entdeckt | `learning` | `tool-taskiq-vs-celery` |
| User-Präferenz erkannt | `context` | `user-prefers-german-comments` |

---

## Format für Memories

Jede Memory muss kontextreich sein — sie wird Wochen später gelesen:

```typescript
memory_save_note({
  sessionId: "<aktuelle-session-id>",
  userPrompt: "Was der User wollte",
  aiResponse: "Was ich implementiert habe (Dateien, Funktionen)",
  annotation: "Entscheidung: X, Warum: Y, Trade-offs: Z, Relevante Dateien: A, B"
})
```

### Key-Konventionen
- Kebab-case: `auth-jwt-strategy`
- Mit Version wenn Updates wahrscheinlich: `rag-pipeline-v2`
- Präfix nach Domäne: `frontend-`, `backend-`, `rag-`, `infra-`

### Tag-Konventionen
- Max 5 Tags pro Memory
- Immer den betroffenen Layer taggen: `backend`, `frontend`, `infra`
- Immer die Technologie taggen: `fastapi`, `react`, `qdrant`
- Deutsche UND englische Begriffe wenn relevant

---

## Anti-Patterns

### ❌ Triviales speichern
Nicht jeder Fix braucht eine Memory. Nur speichern wenn:
- Das Wissen in einer zukünftigen Session nützlich wäre (dann `memory_save_note`)
- Jemand anders (oder du selbst in 2 Wochen) danach suchen würde

### ❌ Duplicate Memories
Vor dem Schreiben immer `memory_search` mit dem Key prüfen. Wenn eine ähnliche Memory existiert → updaten statt neu anlegen.

### ❌ Riesige Content-Blöcke
Memories sind Wissensnuggets, keine Dokumentationen. Max 500 Wörter pro Memory. Für Details auf Dateien/ADRs verweisen.

---

## Memory Lifecycle

- **Archivierung:** `memory_end_session` am Ende JEDER Aufgabe aufrufen. Gemini fasst die Session dann zu einem dauerhaften Memory zusammen.
