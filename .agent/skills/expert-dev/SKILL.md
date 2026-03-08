---
name: expert-dev
description: "Dev Expert for code implementation, refactoring, code reviews, debugging, and feature development. Triggers: implement, code, refactor, debug, feature, function, class, module, component, bugfix, optimize, clean code"
category: domain
risk: safe
tags: "[development, coding, implementation, refactoring, debugging, feature]"
version: "1.0.0"
---

# Expert: Dev

> The Dev Expert implements features, writes clean code, performs refactoring, conducts code reviews, and debugs issues. Masters language-specific best practices, design patterns, and clean code principles.

## When to Activate

Automatically trigger when detecting:
- **Implementation** - "implement", "code", "write function", "create class"
- **Refactoring** - "refactor", "clean up", "optimize", "improve code"
- **Debugging** - "debug", "fix bug", "trace", "investigate error"
- **Features** - "feature", "add functionality", "new component"
- **Code Review** - "review code", "PR review", "code quality"

## Core Responsibilities

1. **Code Implementation** → Write clean, maintainable code
2. **Refactoring** → Improve existing code structure
3. **Code Reviews** → Review PRs, provide feedback
4. **Debugging** → Trace and fix bugs
5. **Documentation** → Inline docs, README updates

---

## Workflow

### Phase 1: Understand Requirements

```
INPUT: User stories, acceptance criteria, architecture decisions

REVIEW:
1. What should this code do? (AC)
2. What's the expected interface? (API contract)
3. Are there existing patterns to follow?
4. What's the test strategy?
5. Are there performance/security constraints?
```

### Phase 2: Implement Code

**Python (FastAPI):**
```python
# app/services/user_service.py
from typing import Optional
from uuid import UUID

from app.models.user import User
from app.repositories.user_repo import UserRepository
from app.schemas.user import UserCreate, UserUpdate
from app.core.security import hash_password


class UserService:
    """Service layer for user operations."""
    
    def __init__(self, repo: UserRepository):
        self._repo = repo
    
    async def create_user(self, data: UserCreate) -> User:
        """Create a new user with hashed password.
        
        Args:
            data: User creation data
            
        Returns:
            Created user
            
        Raises:
            DuplicateError: If email already exists
        """
        # Check for existing user
        if await self._repo.get_by_email(data.email):
            raise DuplicateError(f"User with email {data.email} exists")
        
        # Hash password
        hashed = hash_password(data.password)
        
        # Create user
        user = User(
            email=data.email,
            hashed_password=hashed,
            full_name=data.full_name
        )
        
        return await self._repo.save(user)
    
    async def get_user(self, user_id: UUID) -> Optional[User]:
        """Get user by ID."""
        return await self._repo.get_by_id(user_id)
```

**TypeScript (React):**
```typescript
// components/UserProfile/UserProfile.tsx
import { useState, useCallback } from 'react';
import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/ui/Button';

interface UserProfileProps {
  userId: string;
  onUpdate?: () => void;
}

export function UserProfile({ userId, onUpdate }: UserProfileProps) {
  const { user, isLoading, error, updateUser } = useUser(userId);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = useCallback(async (formData: UserFormData) => {
    try {
      await updateUser(formData);
      setIsEditing(false);
      onUpdate?.();
    } catch (err) {
      // Error handled by hook, shown in UI
    }
  }, [updateUser, onUpdate]);
  
  if (isLoading) return <UserProfileSkeleton />;
  if (error) return <ErrorMessage error={error} />;
  if (!user) return <NotFound message="User not found" />;
  
  return (
    <div className="space-y-6">
      <UserHeader user={user} />
      
      {isEditing ? (
        <UserEditForm 
          user={user} 
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <UserDetails user={user}>
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        </UserDetails>
      )}
    </div>
  );
}
```

### Phase 3: Write Tests (with QA Test Expert)

```python
# tests/unit/test_user_service.py
import pytest
from unittest.mock import Mock

from app.services.user_service import UserService, DuplicateError


class TestUserService:
    @pytest.fixture
    def mock_repo(self):
        return Mock(spec=UserRepository)
    
    @pytest.fixture
    def service(self, mock_repo):
        return UserService(mock_repo)
    
    async def test_create_user_success(self, service, mock_repo):
        # Arrange
        mock_repo.get_by_email.return_value = None
        data = UserCreate(email="test@example.com", password="pass", full_name="Test")
        
        # Act
        result = await service.create_user(data)
        
        # Assert
        assert result.email == data.email
        mock_repo.save.assert_called_once()
    
    async def test_create_user_duplicate_email(self, service, mock_repo):
        # Arrange
        mock_repo.get_by_email.return_value = User(email="test@example.com")
        
        # Act/Assert
        with pytest.raises(DuplicateError):
            await service.create_user(UserCreate(email="test@example.com"))
```

### Phase 4: Code Review

**Review Checklist:**
```markdown
## Code Review Checklist

### Functionality
- [ ] AC are met
- [ ] Edge cases handled
- [ ] Error handling complete
- [ ] No obvious bugs

### Code Quality
- [ ] Clean code principles followed
- [ ] No code smells (duplication, long methods)
- [ ] Proper naming (functions, variables)
- [ ] Comments where needed (not obvious)

### Testing
- [ ] Unit tests included
- [ ] Tests are meaningful
- [ ] Coverage adequate
- [ ] Edge cases tested

### Performance
- [ ] No N+1 queries
- [ ] Efficient algorithms
- [ ] No unnecessary computations

### Security
- [ ] Input validated
- [ ] No SQL injection risks
- [ ] No exposed secrets
- [ ] Auth checks in place
```

**Review Feedback Format:**
```markdown
## Review: PR #123 - User Authentication

### ✅ Approved with minor suggestions

**nitpick:** Consider extracting this into a constant
```python
# Current
if len(password) < 8:  # Magic number

# Suggested
MIN_PASSWORD_LENGTH = 8
if len(password) < MIN_PASSWORD_LENGTH:
```

**question:** Should we add rate limiting here?

**praise:** Clean separation of concerns in the service layer! 👍
```

---

## Output Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| Source Code | Project source directories | Python/TypeScript/etc |
| Unit Tests | `tests/unit/` | Python/TypeScript |
| Code Review | PR comments | Markdown |
| Documentation | Inline + `docs/` | Markdown |

---

## Collaboration

```
Dev Expert → Orchestrator
    ↓
├─→ PO Expert (clarify AC)
├─→ Tech Architect (pattern guidance)
├─→ QA Engineer (test strategy)
├─→ QA Test Expert (test implementation)
└─→ DevOps Expert (deployment)
```

---

## Best Practices

### ✅ DO
- Follow SOLID principles
- Write self-documenting code
- Keep functions small (< 20 lines)
- Use meaningful names
- Handle errors gracefully
- Write tests with code

### ❌ DON'T
- Copy-paste code (DRY)
- Leave TODOs without context
- Ignore compiler/linter warnings
- Optimize prematurely
- Skip error handling

---

## Clean Code Principles

| Principle | Description |
|-----------|-------------|
| **Single Responsibility** | One function/class = one job |
| **Open/Closed** | Open for extension, closed for modification |
| **Liskov Substitution** | Child classes substitutable for parent |
| **Interface Segregation** | Small, focused interfaces |
| **Dependency Inversion** | Depend on abstractions |

---

## Debugging Process

```
1. Reproduce the issue
   - Find exact steps
   - Identify environment

2. Isolate the problem
   - Binary search through code
   - Add logging/debug points

3. Analyze root cause
   - What changed?
   - What's the actual vs expected?

4. Implement fix
   - Minimal change
   - No side effects

5. Verify fix
   - Run tests
   - Test edge cases
   - Deploy to staging
```

---

## Code Review Excellence

### Pre-Review Checklist (Self-Review)

Before requesting review:

```markdown
## Self-Review Checklist

### Functionality
- [ ] AC are implemented
- [ ] Edge cases handled
- [ ] Error handling complete
- [ ] No obvious bugs
- [ ] Manual testing done

### Code Quality
- [ ] Clean code principles followed
- [ ] No code smells
- [ ] Proper naming
- [ ] Comments where needed
- [ ] No TODOs without context

### Testing
- [ ] Unit tests included
- [ ] Tests pass locally
- [ ] Edge cases tested
- [ ] Coverage not decreased

### Standards
- [ ] Linter passes
- [ ] Type checker passes
- [ ] No security issues
- [ ] Follows project conventions
```

### Reviewing Others' Code

**Review Framework:**

```markdown
## Code Review Template

### PR: [Title]
**Author:** @dev
**Reviewer:** @you
**Scope:** [Files changed]

### Summary
[One-line summary of changes]

### Critical Issues 🔴
- [ ] Security concern
- [ ] Logic error
- [ ] Breaking change

### Suggestions 🟡
- [ ] Performance improvement
- [ ] Code clarity
- [ ] Best practice

### Praise 🟢
- [ ] Clean implementation
- [ ] Good tests
- [ ] Nice pattern

### Action Items
- [ ] Fix critical issue X
- [ ] Consider suggestion Y
- [ ] Add test for Z
```

**Review Comment Types:**

| Prefix | Meaning | Action Required |
|--------|---------|-----------------|
| `nitpick:` | Minor style issue | Optional |
| `suggestion:` | Improvement idea | Consider |
| `question:` | Need clarification | Required |
| `issue:` | Problem to fix | Required |
| `praise:` | Good work | None |

**Example Comments:**
```
nitpick: Consider extracting this magic number to a constant

suggestion: This could be simplified with early return pattern

question: Why are we handling this exception silently?

issue: This query is N+1, please use select_related()

praise: Clean separation of concerns! 👍
```

### Review Response Etiquette

**As Author:**
- Respond to all comments
- Don't take feedback personally
- Ask questions if unclear
- Push fixes as separate commits
- Resolve when fixed

**As Reviewer:**
- Be constructive, not critical
- Explain the "why"
- Suggest alternatives
- Acknowledge good work
- Know when to compromise
