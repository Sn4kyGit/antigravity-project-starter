# Performance Rules
> Performance ist eine Feature-Anforderung, kein Nachgedanke.

---

## 1. Backend-Performance-Ziele

| Endpunkt | Target P95 | Maximum |
|---|---|---|
| Health Check | < 10ms | 50ms |
| Auth / Login | < 100ms | 300ms |
| RAG Search | < 3000ms | 8000ms |
| Document Upload (Dispatch) | < 200ms | 500ms |
| Chat Message | < 5000ms | 15000ms |
| Document Status | < 50ms | 200ms |

---

## 2. Async — Konsequent Pflicht

```python
# ✅ Korrekt — alles async
async def search(query: str) -> SearchResult:
    embedding = await embedder.embed(query)          # async
    chunks = await qdrant_repo.search(embedding)     # async
    answer = await generator.generate(chunks, query) # async
    return SearchResult(answer=answer, sources=chunks)

# ❌ Verboten — blocking I/O im async Context
async def search(query: str) -> SearchResult:
    import requests
    response = requests.get(url)  # BLOCKING — blockiert den Event Loop!
```

---

## 3. Embedding-Caching (Redis)

```python
# Embeddings für gleiche Texte werden gecached
# Spart OpenAI-Kosten UND reduziert Latenz drastisch

import hashlib

class CachedEmbedder:
    def __init__(self, embedder: Embedder, cache: RedisCache):
        self.embedder = embedder
        self.cache = cache

    async def embed(self, text: str) -> list[float]:
        text_hash = hashlib.sha256(text.encode()).hexdigest()

        # Cache-Check
        cached = await self.cache.get_embedding(text_hash)
        if cached:
            return cached

        # Embedding generieren
        embedding = await self.embedder.embed([text])
        result = embedding[0]

        # In Cache speichern (24h TTL)
        await self.cache.set_embedding(text_hash, result, ttl=86400)
        return result
```

---

## 4. Datenbank-Performance

### Connection Pool richtig dimensionieren
```python
engine = create_async_engine(
    settings.postgres_url,
    pool_size=10,          # Basis-Verbindungen (immer offen)
    max_overflow=20,       # Zusätzliche bei Peak-Load
    pool_timeout=30,       # Warten auf freie Connection
    pool_pre_ping=True,    # Dead-Connections erkennen
)
```

### Notwendige Indizes
```sql
-- Pflicht-Indizes (in Alembic Migrations definieren)
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_collection ON documents(collection);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);
CREATE INDEX idx_documents_user_id ON documents(user_id);

-- Composite Index für häufige Filter-Kombinationen
CREATE INDEX idx_documents_user_collection ON documents(user_id, collection);
```

### Pagination — immer
```python
# ❌ Verboten — unbegrenzte Abfragen
async def get_all_documents() -> list[Document]:
    return await session.execute(select(DocumentModel)).scalars().all()

# ✅ Korrekt — immer paginiert
async def get_documents(
    page: int = 1,
    page_size: int = 20,
    collection: str | None = None,
) -> PaginatedResult[Document]:
    offset = (page - 1) * page_size
    query = select(DocumentModel).limit(page_size).offset(offset)
    if collection:
        query = query.where(DocumentModel.collection == collection)
    ...
```

---

## 5. Frontend-Performance

### Next.js Server Components First
```tsx
// Server Components für statische/daten-intensive Inhalte
// → kein JavaScript Bundle für diese Komponenten

// ✅ Server Component — kein Client-Bundle
async function DocumentList({ collection }: { collection: string }) {
  const docs = await api.documents.list(collection)
  return (
    <ul>
      {docs.map(doc => <DocumentCard key={doc.id} doc={doc} />)}
    </ul>
  )
}
```

### Lazy Loading für schwere Komponenten
```tsx
import dynamic from 'next/dynamic'

// Avatar nur laden wenn nötig
const Avatar = dynamic(() => import('@/components/avatar/Avatar'), {
  loading: () => <AvatarSkeleton />,
  ssr: false,   // Client-only
})
```

### Image & Video Optimierung
```tsx
// Videos vorladen für schnellen State-Switch
useEffect(() => {
  const preload = (src: string) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'video'
    link.href = src
    document.head.appendChild(link)
  }

  // Alle Avatar-Videos vorladen beim Mount
  Object.values(AVATAR_SOURCES).forEach(({ webm }) => preload(webm))
}, [])
```

---

## 6. Qdrant Performance

```python
# Batch-Operationen bevorzugen
# ✅ Korrekt — Batch-Upsert
await qdrant_client.upsert(
    collection_name=collection,
    points=all_points,   # Alle Chunks in einem Call
    wait=True,
)

# ❌ Verboten — Loop über einzelne Punkte
for chunk in chunks:
    await qdrant_client.upsert(collection, points=[chunk])

# Search mit explizitem Score-Filter (verhindert unnötige Kandidaten)
search_result = await qdrant_client.search(
    collection_name=collection,
    query_vector=query_embedding,
    limit=top_k,
    score_threshold=settings.similarity_threshold,  # Früh filtern!
    with_payload=True,
    with_vectors=False,   # Vectors im Result nicht nötig → spart Transfer
)
```

---

## 7. Monitoring & Performance-Alerts

```python
# Slow-Query-Logging: Alles > 500ms wird geloggt
import time

async def timed_operation(name: str, coro):
    start = time.perf_counter()
    try:
        result = await coro
        duration_ms = (time.perf_counter() - start) * 1000
        if duration_ms > 500:
            logger.warning("slow_operation", name=name, duration_ms=duration_ms)
        else:
            logger.debug("operation_completed", name=name, duration_ms=duration_ms)
        return result
    except Exception as e:
        duration_ms = (time.perf_counter() - start) * 1000
        logger.error("operation_failed", name=name, duration_ms=duration_ms, error=str(e))
        raise
```
