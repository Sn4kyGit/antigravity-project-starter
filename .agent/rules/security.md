# Security Rules
> Security ist kein Feature — es ist eine Grundanforderung. Kein Code ohne Security-Review.

---

## 1. Secrets & Credentials

```bash
# ✅ Immer: .env Datei, nie ins Git
OPENROUTER_API_KEY=sk-or-...
OPENAI_API_KEY=sk-...
POSTGRES_URL=postgresql+asyncpg://user:pass@localhost/db
QDRANT_API_KEY=...
JWT_SECRET=...

# .gitignore — diese Einträge sind Pflicht:
.env
.env.local
.env.production
*.pem
*.key
secrets/
```

**Regel:** Wenn ein Secret in Git landet → sofort rotieren, kein "ich lösch den Commit".

---

## 2. Authentication & Authorization

```python
# JWT-basierte Auth — Pflicht für alle nicht-öffentlichen Endpoints
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
import jwt

security = HTTPBearer()

async def get_current_user(token: str = Depends(security)) -> User:
    try:
        payload = jwt.decode(token.credentials, settings.jwt_secret, algorithms=["HS256"])
        user = await user_repo.get_by_id(payload["sub"])
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# Alle geschützten Routes:
@router.get("/documents", dependencies=[Depends(get_current_user)])
async def get_documents(): ...
```

---

## 3. Input-Validierung & Sanitization

```python
# ALLE User-Inputs werden validiert bevor sie weiterverarbeitet werden
# Pydantic v2 übernimmt die Validierung — aber zusätzlich:

from pydantic import BaseModel, Field, field_validator
import bleach

class SearchRequest(BaseModel):
    query: str = Field(min_length=1, max_length=1000)

    @field_validator("query")
    @classmethod
    def sanitize_query(cls, v: str) -> str:
        # HTML-Tags entfernen (verhindert XSS in gespeicherten Daten)
        cleaned = bleach.clean(v, tags=[], strip=True)
        # Führende/Trailing Whitespace entfernen
        return cleaned.strip()
```

### Prompt Injection Prevention
```python
def sanitize_for_prompt(user_input: str) -> str:
    """
    Sanitizes user input before including in LLM prompts.
    Prevents prompt injection attacks.
    """
    # Instruction-ähnliche Patterns neutralisieren
    dangerous_patterns = [
        "ignore previous instructions",
        "disregard your instructions",
        "system prompt",
        "you are now",
    ]
    lower = user_input.lower()
    for pattern in dangerous_patterns:
        if pattern in lower:
            # Loggen aber nicht blockieren — nur entschärfen
            logger.warning("prompt_injection.attempt", input_preview=user_input[:100])

    # User-Input immer in XML-Tags einschließen um Trennung zu erzwingen
    return f"<user_input>{user_input}</user_input>"
```

---

## 4. CORS-Konfiguration

```python
# ✅ Korrekt — explizite Origins
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,    # ["https://yourdomain.com"]
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)

# ❌ Verboten in Produktion
allow_origins=["*"]
```

---

## 5. Rate Limiting

```python
# Rate Limiting auf allen öffentlichen und Auth-Endpunkten
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# Pro Endpunkt konfigurierbar:
@router.post("/search")
@limiter.limit("30/minute")    # Suche: 30 pro Minute
async def search(...): ...

@router.post("/auth/login")
@limiter.limit("5/minute")     # Login: 5 pro Minute (Brute-Force-Schutz)
async def login(...): ...

@router.post("/documents")
@limiter.limit("10/minute")    # Upload: 10 pro Minute
async def upload_document(...): ...
```

---

## 6. SQL Injection Prevention

```python
# ✅ Immer: SQLAlchemy ORM oder parametrisierte Queries
result = await session.execute(
    select(DocumentModel).where(DocumentModel.id == doc_id)
)

# ✅ Auch OK: Explizit parametrisiert
result = await session.execute(
    text("SELECT * FROM documents WHERE id = :id"),
    {"id": doc_id}
)

# ❌ Verboten: String-Interpolation in Queries
result = await session.execute(
    text(f"SELECT * FROM documents WHERE id = '{doc_id}'")  # SQL-Injection!
)
```

---

## 7. Sensitive Data Handling

```python
# Passwörter immer gehashed — niemals im Klartext
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)
```

### Was niemals geloggt werden darf:
- Passwörter (auch gehashed)
- JWT-Tokens
- API-Keys (auch partial)
- System-Prompts
- Persönliche Daten (E-Mail, Name in Klartext in Debug-Logs)

---

## 8. Security Headers (Middleware)

```python
# /api/middleware/security_headers.py
from starlette.middleware.base import BaseHTTPMiddleware

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request, call_next):
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Permissions-Policy"] = "geolocation=(), microphone=()"
        return response
```

---

## 9. Dependency Security

```bash
# Regelmäßig auf bekannte Schwachstellen prüfen
pip audit                          # Python Dependencies
npm audit                          # Node Dependencies

# In CI/CD Pipeline pflichtmäßig:
# - pip audit (blockiert bei HIGH/CRITICAL)
# - npm audit --audit-level=high
```
