# Environment & Configuration Rules
> Konfiguration ist Code. Alles ist konfigurierbar. Nichts ist hardgecoded.

---

## 1. Die goldene Regel

**Kein Wert der sich zwischen Umgebungen unterscheiden kann, gehört in den Code.**

Dazu gehören: URLs, Ports, API-Keys, Feature-Flags, Modell-Namen, Timeouts, Thresholds, Limits.

---

## 2. Pydantic BaseSettings (zentrales Config-Objekt)

```python
# /config/settings.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # App
    app_name: str = "Butler RAG"
    app_url: str = "http://localhost:3000"
    debug: bool = False
    log_level: str = "INFO"

    # API Keys
    openrouter_api_key: str
    openai_api_key: str

    # Datenbanken
    postgres_url: str
    qdrant_url: str = "http://localhost:6333"
    qdrant_api_key: str = ""
    redis_url: str = "redis://localhost:6379"

    # Auth
    jwt_secret: str
    jwt_expire_minutes: int = 60
    allowed_origins: list[str] = ["http://localhost:3000"]

    # LLM Modelle
    model_butler_chat_primary: str = "meta-llama/llama-4-maverick:free"
    model_butler_chat_fallback: str = "x-ai/grok-fast"
    model_summarization_primary: str = "deepseek/deepseek-chat-v3-0324:free"
    model_summarization_fallback: str = "google/gemini-flash-2.0"
    model_rag_primary: str = "deepseek/deepseek-chat-v3-0324:free"
    model_rag_fallback: str = "x-ai/grok-fast"

    # Embeddings
    embedding_model: str = "text-embedding-3-small"
    embedding_dimensions: int = 1536

    # RAG
    retrieval_top_k: int = 5
    similarity_threshold: float = 0.75
    chunk_size: int = 512
    chunk_overlap: int = 64
    max_context_tokens: int = 3000

    # LLM Limits
    llm_max_tokens: int = 2048
    llm_timeout_seconds: int = 30
    llm_max_retries: int = 2

    # Rate Limiting
    rate_limit_search: str = "30/minute"
    rate_limit_upload: str = "10/minute"
    rate_limit_auth: str = "5/minute"

@lru_cache
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
```

---

## 3. .env.example (immer aktuell — Pflicht)

```env
# ============================================================
# Butler RAG — Environment Configuration
# Kopiere diese Datei zu .env und fülle die Werte aus.
# NIEMALS .env in Git committen!
# ============================================================

# App
APP_NAME=Butler RAG
APP_URL=http://localhost:3000
DEBUG=false
LOG_LEVEL=INFO

# API Keys (Required)
OPENROUTER_API_KEY=sk-or-...       # https://openrouter.ai/keys
OPENAI_API_KEY=sk-...              # Nur für Embeddings: https://platform.openai.com

# Datenbanken (Required)
POSTGRES_URL=postgresql+asyncpg://user:password@localhost:5432/butler_rag
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=                    # Leer lassen für lokale Entwicklung
REDIS_URL=redis://localhost:6379

# Auth (Required)
JWT_SECRET=                        # Mindestens 32 Zeichen zufälliger String
JWT_EXPIRE_MINUTES=60

# CORS
ALLOWED_ORIGINS=["http://localhost:3000"]

# LLM Modelle (Optional — Defaults sind gesetzt)
MODEL_BUTLER_CHAT_PRIMARY=meta-llama/llama-4-maverick:free
MODEL_BUTLER_CHAT_FALLBACK=x-ai/grok-fast
MODEL_SUMMARIZATION_PRIMARY=deepseek/deepseek-chat-v3-0324:free
MODEL_SUMMARIZATION_FALLBACK=google/gemini-flash-2.0
MODEL_RAG_PRIMARY=deepseek/deepseek-chat-v3-0324:free
MODEL_RAG_FALLBACK=x-ai/grok-fast

# RAG Konfiguration (Optional — Defaults sind gesetzt)
RETRIEVAL_TOP_K=5
SIMILARITY_THRESHOLD=0.75
CHUNK_SIZE=512
CHUNK_OVERLAP=64

# LLM Limits (Optional)
LLM_TIMEOUT_SECONDS=30
LLM_MAX_TOKENS=2048
```

---

## 4. .gitignore (Pflichteinträge)

```gitignore
# Secrets — NIEMALS committen
.env
.env.local
.env.production
.env.staging
*.pem
*.key
secrets/

# Dependencies
node_modules/
__pycache__/
*.pyc
.venv/
venv/

# Build-Outputs
.next/
dist/
build/
*.egg-info/

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Test-Outputs
.coverage
htmlcov/
.pytest_cache/
coverage/

# Logs
*.log
logs/
```

---

## 5. Frontend-Umgebungsvariablen (Next.js)

```env
# .env.local (Frontend)
# Nur NEXT_PUBLIC_ Variablen sind im Browser sichtbar!

NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_APP_NAME=Butler RAG

# Diese sind NUR serverseitig verfügbar (kein NEXT_PUBLIC_ Prefix)
# Hier keine Secrets — Frontend-Code ist öffentlich sichtbar!
```

```tsx
// ✅ Korrekt — nur PUBLIC_ Variablen im Client-Code
const apiUrl = process.env.NEXT_PUBLIC_API_URL

// ❌ Verboten — Server-only Variable im Client
const secret = process.env.JWT_SECRET   // undefined im Browser, aber falscher Ansatz
```

---

## 6. Docker-Umgebungen

```yaml
# docker-compose.yml (Development)
services:
  api:
    env_file:
      - .env                    # Lokale .env Datei
    environment:
      - DEBUG=true
      - LOG_LEVEL=DEBUG

# docker-compose.prod.yml (Production)
services:
  api:
    environment:
      # Werte kommen aus Deployment-System (z.B. Railway, Render, K8s Secrets)
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - POSTGRES_URL=${POSTGRES_URL}
      - DEBUG=false
      - LOG_LEVEL=WARNING
```

---

## 7. Startup-Validierung

```python
# main.py — Beim Start alle Required Configs prüfen
from config.settings import settings

def validate_startup_config():
    """Fails fast if critical configuration is missing."""
    required = [
        ("OPENROUTER_API_KEY", settings.openrouter_api_key),
        ("OPENAI_API_KEY", settings.openai_api_key),
        ("POSTGRES_URL", settings.postgres_url),
        ("JWT_SECRET", settings.jwt_secret),
    ]
    missing = [name for name, value in required if not value]
    if missing:
        raise RuntimeError(f"Missing required configuration: {', '.join(missing)}")

    if len(settings.jwt_secret) < 32:
        raise RuntimeError("JWT_SECRET must be at least 32 characters")
```
