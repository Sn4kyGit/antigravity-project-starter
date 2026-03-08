# Error Handling Rules
> Kein silent fail. Kein nacktes except. Jeder Fehler wird behandelt, geloggt und kommuniziert.

---

## 1. Eigene Exception-Hierarchie (Pflicht)

```python
# /utils/exceptions.py

class AppException(Exception):
    """Basis-Exception für alle App-spezifischen Fehler."""
    def __init__(self, message: str, error_code: str, status_code: int = 500):
        self.message = message
        self.error_code = error_code
        self.status_code = status_code
        super().__init__(message)

# Domain-Exceptions
class DocumentNotFoundError(AppException):
    def __init__(self, doc_id: str):
        super().__init__(
            message=f"Document '{doc_id}' not found",
            error_code="document_not_found",
            status_code=404,
        )

class DocumentAlreadyIndexedError(AppException):
    def __init__(self, doc_id: str):
        super().__init__(
            message=f"Document '{doc_id}' is already indexed",
            error_code="document_already_indexed",
            status_code=409,
        )

# Infrastructure-Exceptions
class QdrantConnectionError(AppException):
    def __init__(self, detail: str = ""):
        super().__init__(
            message=f"Vector database unavailable: {detail}",
            error_code="vector_db_unavailable",
            status_code=503,
        )

class LLMTimeoutError(AppException):
    def __init__(self, model: str):
        super().__init__(
            message=f"LLM model '{model}' timed out",
            error_code="llm_timeout",
            status_code=503,
        )

class EmbeddingError(AppException):
    def __init__(self, detail: str):
        super().__init__(
            message=f"Embedding generation failed: {detail}",
            error_code="embedding_failed",
            status_code=503,
        )

class RAGRetrievalEmptyError(AppException):
    def __init__(self, query: str):
        super().__init__(
            message="No relevant documents found for the given query",
            error_code="no_relevant_documents",
            status_code=200,  # Kein Serverfehler — valides Ergebnis
        )
```

---

## 2. Zentraler Exception-Handler (FastAPI)

```python
# /api/middleware/exception_handler.py
import uuid
from fastapi import Request
from fastapi.responses import JSONResponse
from utils.exceptions import AppException

def register_exception_handlers(app):

    @app.exception_handler(AppException)
    async def app_exception_handler(request: Request, exc: AppException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.error_code,
                "message": exc.message,
                "request_id": getattr(request.state, "request_id", str(uuid.uuid4())),
            }
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(request: Request, exc: Exception):
        logger.error(
            "unhandled_exception",
            error=str(exc),
            request_id=getattr(request.state, "request_id", "unknown"),
            path=request.url.path,
        )
        return JSONResponse(
            status_code=500,
            content={
                "error": "internal_server_error",
                "message": "An unexpected error occurred",
                "request_id": getattr(request.state, "request_id", "unknown"),
            }
        )
```

---

## 3. Try/Except Patterns

```python
# ✅ Korrekt — Spezifisch, geloggt, re-raised oder behandelt
async def embed_text(text: str) -> list[float]:
    try:
        return await openai_client.embed(text)
    except openai.RateLimitError as e:
        logger.warning("embedding.rate_limit", retry_after=e.retry_after)
        raise EmbeddingError(f"Rate limit exceeded: {e.retry_after}s wait")
    except openai.APITimeoutError:
        logger.error("embedding.timeout", text_length=len(text))
        raise EmbeddingError("OpenAI timeout")
    except openai.APIError as e:
        logger.error("embedding.api_error", status_code=e.status_code, error=str(e))
        raise EmbeddingError(str(e))

# ❌ Verboten — naked except
try:
    result = await embed_text(text)
except:
    pass   # Silent fail — niemals!

# ❌ Verboten — zu breit ohne Logging
try:
    result = await embed_text(text)
except Exception:
    return None   # Fehler verschluckt, kein Log
```

---

## 4. LLM & RAG-spezifisches Error Handling

```python
# /services/search_service.py

async def search_with_fallback(
    query: str,
    primary_model: str,
    fallback_model: str,
) -> str:
    """LLM-Call mit automatischem Fallback auf Paid-Modell."""

    # Versuch 1: Free Model
    try:
        return await llm_client.generate(query, model=primary_model)
    except (LLMTimeoutError, openrouter.RateLimitError) as e:
        logger.warning(
            "llm.fallback_triggered",
            primary_model=primary_model,
            fallback_model=fallback_model,
            reason=str(e),
        )

    # Versuch 2: Paid Fallback
    try:
        result = await llm_client.generate(query, model=fallback_model)
        logger.info("llm.fallback_succeeded", model=fallback_model)
        return result
    except Exception as e:
        logger.error("llm.all_models_failed", error=str(e))
        raise LLMTimeoutError(fallback_model)
```

---

## 5. Frontend Error Handling

```tsx
// /hooks/useRAGSearch.ts

export function useRAGSearch(query: string) {
  const setAvatarState = useAppStore(s => s.setAvatarState)

  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      setAvatarState(AVATAR_STATES.LOADING)
      try {
        const result = await searchService.query({ query })
        setAvatarState(AVATAR_STATES.CHATTING)
        return result
      } catch (error) {
        setAvatarState(AVATAR_STATES.ERROR)
        setTimeout(() => setAvatarState(AVATAR_STATES.IDLE), 2000)
        throw error
      }
    },
    retry: 1,                    // 1 automatischer Retry
    retryDelay: 1000,
    enabled: query.length > 0,
  })
}
```

### Error Boundary für kritische Komponenten
```tsx
// /components/ui/ErrorBoundary.tsx
'use client'
import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: ReactNode
}

export class ErrorBoundary extends Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('ErrorBoundary caught:', error)
    // Hier: Error-Tracking (z.B. Sentry)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
```

---

## 6. Task Error Handling (Taskiq)

```python
# Background Tasks müssen immer Status in DB updaten bei Fehler

@broker.task(retry_on_error=True, max_retries=3)
async def ingest_document(document_id: str, collection: str):
    try:
        ...
    except DocumentNotFoundError:
        # Nicht retrien — User-Fehler
        await doc_repo.update_status(document_id, "failed")
        return  # Kein raise → kein Retry
    except (QdrantConnectionError, EmbeddingError) as e:
        # Retrien — temporärer Infrastruktur-Fehler
        logger.error("task.retriable_error", doc_id=document_id, error=str(e))
        await doc_repo.update_status(document_id, "pending")  # Reset für Retry
        raise  # raise → Taskiq macht Retry
```

---

## 7. Was niemals passieren darf

```python
# ❌ Diese Muster sind verboten:

except:                    # Zu breit, fängt alles ab
    pass                   # Silent fail

except Exception as e:
    return None            # Fehler verschluckt ohne Log

except Exception:
    print(e)               # print statt logger

try:
    ...
except Exception:
    raise Exception("Error")  # Original-Exception verloren (kein chaining)

# ✅ Richtig bei Exception-Chaining:
except openai.APIError as e:
    raise EmbeddingError("OpenAI failed") from e  # from e erhält den Traceback
```
