# Development Rules
> Gelten für jede einzelne Änderung. Keine Ausnahmen unter Zeitdruck.

---

## 1. Python Code-Qualität

### Type Hints — Pflicht überall
```python
# ✅ Korrekt
async def get_user(user_id: int, include_history: bool = False) -> UserResponse:
    ...

# ❌ Verboten
async def get_user(user_id, include_history=False):
    ...
```

### Docstrings — Pflicht für alle öffentlichen Funktionen
```python
# ✅ Korrekt
async def retrieve_documents(query: str, top_k: int = 5) -> list[Document]:
    """
    Retrieves the top-k most relevant documents for a given query.

    Args:
        query: The user search query string.
        top_k: Number of documents to return.

    Returns:
        List of Document objects sorted by relevance score descending.

    Raises:
        QdrantConnectionError: If vector DB is unreachable.
    """
    ...
```

### Dateigröße & Komplexität
- Maximale **Dateigröße: 300 Zeilen** — danach zwingend aufteilen
- Maximale **Funktionslänge: 50 Zeilen** — danach in Teilfunktionen zerlegen
- Maximale **Verschachtelungstiefe: 4 Ebenen** — danach Early Return oder Extraktion
- Kein toter Code (auskommentierte Blöcke, ungenutzte Imports) im Commit

### Code Style
- PEP 8 — automatisch geprüft via `ruff`
- Imports sortiert: stdlib → third-party → local (isort / ruff)
- `ruff` und `mypy` müssen fehlerfrei laufen vor jedem Commit

---

## 2. TypeScript / Frontend Code-Qualität

### Kein `any` — niemals
```tsx
// ✅ Korrekt
interface SearchResultProps {
  query: string
  documents: Document[]
  isLoading: boolean
  onSelect: (doc: Document) => void
}

// ❌ Verboten
function SearchResult(props: any) { ... }
function SearchResult({ query, docs, loading }: any) { ... }
```

### Zentrale Typ-Definitionen
- Alle geteilten Typen gehören in `/frontend/types/`
- Keine Typ-Definitionen inline in Komponenten (außer lokale Hilfstypes)
- API-Response-Typen immer explizit modellieren — kein automatisches `any` aus fetch()

```tsx
// /types/api.ts
export interface RAGResponse {
  answer: string
  sources: DocumentSource[]
  model_used: string
  tokens_used: number
}

export interface DocumentSource {
  id: string
  title: string
  score: number
  chunk: string
}
```

### Benennung
- Komponenten: `PascalCase` → `SearchResultCard.tsx`
- Hooks: `use` Prefix → `useRAGSearch.ts`
- Utils/Helpers: `camelCase` → `formatScore.ts`
- Konstanten: `SCREAMING_SNAKE_CASE` → `MAX_RESULTS`
- Types/Interfaces: `PascalCase` → `UserPreferences`

---

## 3. Keine Magic Numbers / Magic Strings

```python
# ❌ Verboten
results = await qdrant.search(query_vector, limit=5, score_threshold=0.75)
model = "meta-llama/llama-4-maverick:free"

# ✅ Korrekt — in config/settings.py
class Settings(BaseSettings):
    retrieval_top_k: int = 5
    similarity_threshold: float = 0.75
    model_butler_chat: str = "meta-llama/llama-4-maverick:free"
```

```tsx
// ❌ Verboten
if (avatarState === "loading") { ... }
setTimeout(fn, 3000)

// ✅ Korrekt
import { AVATAR_STATES, DEBOUNCE_DELAY_MS } from '@/lib/constants'
if (avatarState === AVATAR_STATES.LOADING) { ... }
setTimeout(fn, DEBOUNCE_DELAY_MS)
```

---

## 4. Modularitäts-Zwang

- Kein neuer Code direkt in `main.py`, `app/page.tsx` oder `index.ts`
- Jede neue Funktionalität bekommt eine **eigene Datei** im passenden Modul
- Wird eine Datei zu groß (>300 Zeilen): **sofort** aufteilen, nicht "später"
- Circular Imports sind **verboten** — Abhängigkeitsrichtung immer prüfen

---

## 5. Refactoring-Regel

- Kein neues Feature auf schlecht strukturiertem Code
- Reihenfolge: `refactor:` Commit → dann `feat:` Commit
- "Ich mach das später sauber" ist keine Strategie

---

## 6. Code Review Checkliste (vor jedem Merge)

- [ ] Type Hints vollständig?
- [ ] Docstrings vorhanden?
- [ ] Tests geschrieben und grün?
- [ ] Keine hardgecodeten Werte?
- [ ] Error Handling vollständig?
- [ ] Logging vorhanden wo nötig?
- [ ] `.env.example` aktualisiert wenn neue Env-Var?
- [ ] README aktualisiert wenn neues Feature?
- [ ] Dateilänge unter 300 Zeilen?
