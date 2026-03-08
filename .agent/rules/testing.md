# Testing Rules
> Kein Code gilt als fertig ohne Tests. "Ich teste das manuell" ist keine Strategie.

---

## 1. Test-Pyramide

```
         [E2E Tests]              ← Wenige, langsam, teuer
        /           \             → Playwright (kritische User-Flows)
     [Integration]               ← Mittel, API + DB zusammen
    /              \             → pytest + httpx (FastAPI TestClient)
  [Unit Tests]                   ← Viele, schnell, isoliert
 /                \              → pytest (Backend), Jest/Vitest (Frontend)
```

**Coverage-Ziele:**
- Service-Layer: **≥ 70%**
- RAG-Pipeline: **≥ 80%**
- API-Routes: **≥ 60%** (via Integration Tests)
- Frontend Hooks: **≥ 60%**
- Frontend Utils: **≥ 80%**

---

## 2. Test-Struktur (AAA-Pattern — Pflicht)

```python
# ✅ Immer: Arrange → Act → Assert
async def test_retriever_returns_top_k_results():
    # Arrange
    mock_qdrant = MockQdrantClient(
        results=[make_chunk(score=0.9), make_chunk(score=0.8), make_chunk(score=0.7)]
    )
    retriever = DocumentRetriever(client=mock_qdrant, top_k=2, threshold=0.75)

    # Act
    results = await retriever.retrieve("Was ist RAG?")

    # Assert
    assert len(results) == 2
    assert results[0].score >= results[1].score
    assert all(r.score >= 0.75 for r in results)
```

---

## 3. Backend Tests (pytest)

### Dateistruktur
```
/backend/tests
  ├── conftest.py            ← Fixtures, DB-Setup, Mocks
  ├── /unit
  │   ├── test_chunker.py
  │   ├── test_embedder.py
  │   ├── test_retriever.py
  │   ├── test_generator.py
  │   └── test_services/
  │       ├── test_document_service.py
  │       └── test_search_service.py
  └── /integration
      ├── test_api_search.py
      ├── test_api_documents.py
      └── test_rag_pipeline.py
```

### Fixtures (conftest.py)
```python
import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from app.main import app

@pytest.fixture
async def async_client():
    async with AsyncClient(
        transport=ASGITransport(app=app),
        base_url="http://test"
    ) as client:
        yield client

@pytest.fixture
def mock_embedder(mocker):
    """Returns consistent 1536-dim vectors for any input."""
    mock = mocker.AsyncMock()
    mock.embed.return_value = [[0.1] * 1536]
    return mock

@pytest.fixture
def mock_llm(mocker):
    """Returns predictable LLM response."""
    mock = mocker.AsyncMock()
    mock.run.return_value = MockResult(data="Test-Antwort vom Mock-LLM")
    return mock

@pytest.fixture
def sample_document():
    return DocumentCreate(
        title="Test-Dokument",
        content="Dies ist ein Test-Dokument für Unit Tests.",
        collection="test_collection"
    )
```

### Kein echter API-Call in Unit-Tests
```python
# ✅ Korrekt — Mocks für externe Services
async def test_search_uses_fallback_on_timeout(mock_llm, mock_embedder):
    mock_llm.run.side_effect = [TimeoutError(), MockResult("Fallback-Antwort")]
    service = SearchService(llm=mock_llm, embedder=mock_embedder)
    result = await service.search("Test-Query")
    assert mock_llm.run.call_count == 2      # Primary + Fallback
    assert result.answer == "Fallback-Antwort"

# ❌ Verboten — echter OpenAI/OpenRouter Call in Test
async def test_search():
    service = SearchService(llm=real_openrouter_client)  # Echter API-Call!
    result = await service.search("Test")
```

---

## 4. Frontend Tests (Vitest + Testing Library)

### Dateistruktur
```
/frontend/tests
  ├── /unit
  │   ├── hooks/
  │   │   └── useRAGSearch.test.ts
  │   └── lib/
  │       └── formatScore.test.ts
  ├── /components
  │   ├── Avatar.test.tsx
  │   └── SearchBox.test.tsx
  └── setup.ts
```

### Component Tests
```tsx
// Avatar.test.tsx
import { render, screen } from '@testing-library/react'
import { Avatar } from '@/components/avatar/Avatar'
import { AVATAR_STATES } from '@/types/avatar'

describe('Avatar', () => {
  it('renders idle state video by default', () => {
    render(<Avatar />)
    const video = screen.getByRole('img', { name: /Butler Avatar: idle/i })
    expect(video).toBeInTheDocument()
  })

  it('switches video source when state changes', () => {
    const { rerender } = render(<Avatar state={AVATAR_STATES.IDLE} />)
    rerender(<Avatar state={AVATAR_STATES.LOADING} />)
    const video = screen.getByRole('img', { name: /Butler Avatar: loading/i })
    expect(video).toBeInTheDocument()
  })
})
```

---

## 5. RAG-Pipeline Integration Tests

```python
# tests/integration/test_rag_pipeline.py
# Läuft gegen echte Test-Datenbank (nicht Produktion)

async def test_full_rag_pipeline(test_db, test_qdrant):
    """
    Tests the full RAG pipeline with a known document and query.
    Expected: Answer must reference content from the seeded document.
    """
    # Arrange: Dokument einbetten
    doc = await document_service.create(DocumentCreate(
        title="FastAPI Tutorial",
        content="FastAPI ist ein modernes Python Web-Framework für APIs.",
        collection="test"
    ))
    await ingest_document(doc.id, "test")  # direkt aufrufen, nicht via Task-Queue

    # Act: Suche
    result = await search_service.search(SearchRequest(
        query="Was ist FastAPI?",
        collection="test"
    ))

    # Assert
    assert result.answer is not None
    assert len(result.sources) > 0
    assert "FastAPI" in result.answer
    assert result.sources[0].score >= 0.75
```

---

## 6. CI-Pipeline (GitHub Actions)

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
      redis:
        image: redis:7-alpine
      qdrant:
        image: qdrant/qdrant
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: |
          pip install -r requirements-dev.txt
          ruff check .
          mypy .
          pytest --cov=app --cov-fail-under=70

  frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run tests
        run: |
          npm ci
          npm run type-check
          npm run test:coverage
```

**Merge-Blockierung bei:**
- Tests fehlgeschlagen
- Coverage unter Minimum
- `ruff` oder `mypy` Fehler
- `npm run type-check` Fehler
