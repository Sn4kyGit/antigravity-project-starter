# Logging Rules
> Strukturiertes Logging von Anfang an. Kein print(). Kein f"Error: {e}".

---

## 1. Logging-Stack

```python
# structlog — strukturiertes, kontextreiches Logging
# Alle Logs im JSON-Format (maschinenlesbar, searchbar)

pip install structlog
```

---

## 2. Setup (einmalig in main.py)

```python
# /config/logging.py
import structlog
import logging

def setup_logging(log_level: str = "INFO"):
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_logger_name,
            structlog.stdlib.add_log_level,
            structlog.stdlib.PositionalArgumentsFormatter(),
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.StackInfoRenderer(),
            structlog.processors.format_exc_info,
            # In Produktion: JSON. In Dev: Farbe für lesbarkeit
            structlog.processors.JSONRenderer()
            if not settings.debug
            else structlog.dev.ConsoleRenderer(colors=True),
        ],
        context_class=dict,
        logger_factory=structlog.stdlib.LoggerFactory(),
        wrapper_class=structlog.stdlib.BoundLogger,
        cache_logger_on_first_use=True,
    )

    logging.basicConfig(
        format="%(message)s",
        stream=sys.stdout,
        level=getattr(logging, log_level.upper()),
    )
```

---

## 3. Logger Instanz

```python
# In jeder Datei die loggt:
import structlog

logger = structlog.get_logger()

# Kein globaler Logger — immer modul-spezifisch
# structlog erkennt den Kontext automatisch
```

---

## 4. Log-Level Regeln

| Level | Wann verwenden | Beispiel |
|---|---|---|
| `DEBUG` | Detaillierte Entwicklungs-Infos | SQL-Queries, Vector-Scores |
| `INFO` | Normaler Business-Flow | "rag.search.completed", "document.indexed" |
| `WARNING` | Erwartbare Probleme, Recovery möglich | "llm.fallback_triggered", "rate_limit.hit" |
| `ERROR` | Fehler der behandelt wurde, Funktion failed | "embedding.failed", "task.failed" |
| `CRITICAL` | System unbrauchbar | DB komplett down, kein Recovery |

---

## 5. Event-Naming Konvention

```python
# Format: "{modul}.{aktion}.{status}"
# Immer snake_case, immer englisch, immer beschreibend

# ✅ Korrekte Event-Namen
logger.info("rag.retrieval.completed", ...)
logger.info("rag.generation.completed", ...)
logger.info("document.ingestion.started", ...)
logger.info("document.ingestion.completed", ...)
logger.warning("llm.fallback.triggered", ...)
logger.error("qdrant.connection.failed", ...)
logger.error("task.ingestion.failed", ...)

# ❌ Verbotene Event-Namen
logger.info("done")
logger.info("search worked")
logger.error("Error!")
logger.info(f"Processing document {doc_id}")  # f-string statt kwargs
```

---

## 6. Strukturierte Felder (keine f-Strings!)

```python
# ✅ Korrekt — strukturierte Felder als Keyword Arguments
logger.info(
    "rag.search.completed",
    query_length=len(query),
    chunks_retrieved=len(chunks),
    top_score=chunks[0].score if chunks else 0,
    model_used=model_name,
    duration_ms=elapsed_ms,
    was_fallback=used_fallback,
)

# ❌ Verboten — String-Interpolation
logger.info(f"Search completed in {elapsed_ms}ms, found {len(chunks)} chunks")
logger.info("Search done: " + str(result))
```

**Warum:** Strukturierte Felder sind searchbar, filterbar und maschinell auswertbar. f-Strings sind es nicht.

---

## 7. Request-ID in allen Logs

```python
# /api/middleware/request_id.py
import uuid
from starlette.middleware.base import BaseHTTPMiddleware

class RequestIDMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
        request.state.request_id = request_id

        # Request-ID in structlog Context binden
        with structlog.contextvars.bound_contextvars(request_id=request_id):
            response = await call_next(request)

        response.headers["X-Request-ID"] = request_id
        return response
```

Damit wird `request_id` **automatisch in alle Logs** innerhalb eines Requests eingebunden.

---

## 8. Was niemals geloggt wird (DSGVO + Security)

```python
# ❌ Niemals loggen:
logger.info("user.login", password=password)          # Passwort
logger.info("auth.token", token=jwt_token)             # JWT
logger.info("api.call", key=api_key)                   # API-Keys
logger.info("user.data", email=user.email)             # PII in Debug-Logs
logger.info("llm.prompt", system_prompt=system_prompt) # System-Prompt
```

---

## 9. Standard-Log-Events (Checkliste)

Folgende Events **müssen** geloggt werden:

```python
# API
logger.info("api.request.received", method=..., path=..., request_id=...)
logger.info("api.response.sent", status_code=..., duration_ms=..., request_id=...)

# Auth
logger.info("auth.login.success", user_id=...)
logger.warning("auth.login.failed", reason=...)
logger.warning("auth.token.invalid", reason=...)

# RAG Pipeline
logger.info("rag.retrieval.completed", chunks_found=..., top_score=..., duration_ms=...)
logger.warning("rag.retrieval.empty", query_length=...)
logger.info("rag.generation.completed", model=..., tokens=..., was_fallback=..., duration_ms=...)
logger.warning("llm.fallback.triggered", primary=..., fallback=..., reason=...)

# Tasks
logger.info("task.started", task_name=..., task_id=..., args=...)
logger.info("task.completed", task_name=..., task_id=..., duration_ms=...)
logger.error("task.failed", task_name=..., task_id=..., error=..., attempt=...)

# Dokumente
logger.info("document.ingestion.started", doc_id=..., collection=...)
logger.info("document.ingestion.completed", doc_id=..., chunks=..., duration_ms=...)
logger.error("document.ingestion.failed", doc_id=..., error=...)
```
