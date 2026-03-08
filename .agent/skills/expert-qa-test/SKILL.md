---
name: expert-qa-test
description: "QA Test Expert for test implementation, automation, Playwright/Cypress, test data, and test execution. Uses Factory Pattern for maintainable tests. Triggers: implement test, test automation, playwright, cypress, test data, e2e test, run tests, test suite, test report, test fixture"
category: domain
risk: safe
tags: "[qa-testing, automation, playwright, cypress, e2e, test-implementation, factory-pattern, tdd]"
version: "1.1.0"
---

# Expert: QA Test

> The QA Test Expert implements automated tests, creates test data using Factory Pattern, runs test suites, and generates reports. Masters Playwright, Cypress, pytest, and test automation best practices.
> 
> **Philosophy:** Test behavior, not implementation. Factory Pattern for maintainable test data.

## When to Activate

Automatically trigger when detecting:
- **Test Implementation** - "implement test", "write test", "test code"
- **Automation** - "test automation", "automated test", "test script"
- **Tools** - "playwright", "cypress", "selenium", "pytest", "jest"
- **Test Data** - "test data", "test fixture", "mock data", "seed data", "factory"
- **Execution** - "run tests", "test suite", "test execution"
- **Reporting** - "test report", "test results", "test output"

---

## Testing Philosophy

### Test-Driven Development (TDD)
```
🔴 RED → Write failing test FIRST
    ↓
🟢 GREEN → Implement minimal code to pass
    ↓
🔵 REFACTOR → Improve code quality
    ↓
   Repeat...
```

**The Three Laws of TDD:**
1. Write production code only to make a failing test pass
2. Write only enough test to demonstrate failure
3. Write only enough code to make the test pass

### Behavior-Driven Testing
- **Test behavior, not implementation**
- Focus on public APIs and business requirements
- Avoid testing implementation details
- Use descriptive test names that describe behavior

### Factory Pattern for Test Data
> Keep tests DRY and maintainable with factory functions

---

## Workflow

### Phase 1: Understand Test Requirements

```markdown
## Test Analysis

**From QA Engineer:**
- Test case: TC-001 User Login
- Priority: High
- Type: E2E
- Preconditions: User exists in database

**Test Data Needs:**
- Valid user credentials
- Invalid credentials
- Locked user account
- Expired password
```

### Phase 2: Create Test Factories

**Factory Pattern (TypeScript):**
```typescript
// tests/factories/userFactory.ts
import { User } from '@/types/user';

export const userFactory = (overrides?: Partial<User>): User => ({
  id: crypto.randomUUID(),
  email: 'test@example.com',
  fullName: 'Test User',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

// Usage in tests
const adminUser = userFactory({ 
  email: 'admin@example.com',
  fullName: 'Admin User' 
});

const inactiveUser = userFactory({ 
  isActive: false 
});
```

**Factory Pattern (Python):**
```python
# tests/factories/user_factory.py
import factory
from app.models import User

class UserFactory(factory.Factory):
    class Meta:
        model = User
    
    email = factory.Sequence(lambda n: f"user{n}@example.com")
    full_name = factory.Faker('name')
    is_active = True
    hashed_password = factory.LazyAttribute(
        lambda _: hash_password("TestPass123!")
    )

# Usage
admin = UserFactory(email="admin@example.com")
inactive = UserFactory(is_active=False)
```

### Phase 3: Implement E2E Test (Playwright)

```typescript
// tests/e2e/auth/login.spec.ts
import { test, expect } from '@playwright/test';
import { userFactory } from '@/tests/factories/userFactory';
import { LoginPage } from '@/tests/pages/LoginPage';

test.describe('User Authentication', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('successful login with valid credentials', async () => {
    // Arrange - Use factory for test data
    const testUser = userFactory({
      email: 'valid@example.com',
      password: 'ValidPass123!'
    });
    
    // Create user in database (API call or seed)
    await seedUser(testUser);
    
    // Act
    await loginPage.login(testUser.email, testUser.password);
    
    // Assert
    await expect(loginPage.page).toHaveURL('/dashboard');
    await expect(loginPage.userMenu).toBeVisible();
  });

  test('shows error for invalid credentials', async () => {
    // Arrange
    const invalidUser = userFactory({
      email: 'invalid@example.com',
      password: 'wrongpassword'
    });
    
    // Act
    await loginPage.login(invalidUser.email, invalidUser.password);
    
    // Assert
    await expect(loginPage.errorMessage)
      .toContainText('Invalid credentials');
    await expect(loginPage.page).toHaveURL('/login');
  });

  test('redirects to original URL after login', async () => {
    // Arrange - Start at protected route
    await loginPage.page.goto('/profile');
    const user = userFactory();
    await seedUser(user);
    
    // Act - Login
    await loginPage.login(user.email, user.password);
    
    // Assert - Redirected to original URL
    await expect(loginPage.page).toHaveURL('/profile');
  });
});
```

### Phase 4: Implement Integration Test

```python
# tests/integration/test_user_service.py
import pytest
from httpx import AsyncClient

from tests.factories.user_factory import UserFactory
from app.main import app


class TestUserService:
    @pytest.fixture
    async def client(self):
        async with AsyncClient(app=app, base_url="http://test") as client:
            yield client
    
    async def test_create_user_success(self, client):
        """Should create user and return 201."""
        # Arrange - Factory creates valid data
        user_data = {
            "email": "new@example.com",
            "password": "TestPass123!",
            "full_name": "New User"
        }
        
        # Act
        response = await client.post("/api/v1/users", json=user_data)
        
        # Assert
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == user_data["email"]
        assert data["full_name"] == user_data["full_name"]
        assert "id" in data
        assert "password" not in data  # Never return password
    
    async def test_create_user_duplicate_email(self, client, db):
        """Should return 409 for duplicate email."""
        # Arrange - Create existing user with factory
        existing = UserFactory()
        db.add(existing)
        db.commit()
        
        # Act - Try to create same email
        response = await client.post("/api/v1/users", json={
            "email": existing.email,
            "password": "AnotherPass123!",
            "full_name": "Another User"
        })
        
        # Assert
        assert response.status_code == 409
        assert "already exists" in response.json()["detail"].lower()
```

### Phase 5: Create Custom Render/Setup

**Custom Render with Providers:**
```typescript
// tests/utils/customRender.tsx
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/ThemeProvider';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = createTestQueryClient();
  
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// Usage
import { renderWithProviders } from '@/tests/utils/customRender';
import { screen } from '@testing-library/react';

it('renders with providers', () => {
  renderWithProviders(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

### Phase 6: Run Tests & Report

```bash
# Run all tests
pytest

# Run specific test file
pytest tests/e2e/auth/login.spec.ts -v

# Run with coverage
pytest --cov=app --cov-report=html --cov-report=term

# Run Playwright tests
npx playwright test

# Run in headed mode (debugging)
npx playwright test --headed

# Run specific test pattern
npx playwright test --grep "successful login"

# Run with UI mode
npx playwright test --ui
```

**Test Report:**
```markdown
# Test Execution Report

**Date**: 2026-03-03
**Environment**: Staging
**Commit**: abc123

## Summary
| Metric | Value |
|--------|-------|
| Total Tests | 150 |
| Passed | 148 (98.7%) |
| Failed | 2 |
| Skipped | 0 |
| Duration | 4m 32s |

## Coverage
| Module | Coverage |
|--------|----------|
| auth | 95% ✅ |
| users | 87% ✅ |
| payments | 78% ⚠️ |

## Failed Tests
1. `test_payment_processing.py::test_refund`
   - Error: 502 Bad Gateway
   - Action: Added retry logic

## Recommendations
- Increase payment module coverage to 80%
- Add retry for flaky external API test
```

---

## Page Object Pattern

```typescript
// tests/pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly userMenu: Locator;
  
  constructor(public readonly page: Page) {
    this.emailInput = page.locator('[data-testid="email-input"]');
    this.passwordInput = page.locator('[data-testid="password-input"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.errorMessage = page.locator('[data-testid="error-message"]');
    this.userMenu = page.locator('[data-testid="user-menu"]');
  }
  
  async goto() {
    await this.page.goto('/login');
    await expect(this.emailInput).toBeVisible();
  }
  
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  
  async expectError(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
  
  async expectSuccessfulLogin() {
    await expect(this.userMenu).toBeVisible();
  }
}
```

---

## Best Practices

### ✅ DO
- Use Factory Pattern for test data
- Test behavior, not implementation
- Use `data-testid` attributes (not CSS classes)
- Keep tests independent
- One assertion concept per test
- Use descriptive test names
- Clean up test data after tests

### ❌ DON'T
- Use CSS classes as selectors (brittle)
- Sleep/wait without conditions
- Depend on test order
- Test third-party services directly
- Use production data in tests
- Skip error case testing

---

## Output Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| Test Code | `tests/e2e/`, `tests/integration/` | TypeScript/Python |
| Factories | `tests/factories/` | TypeScript/Python |
| Fixtures | `tests/conftest.py`, `tests/fixtures/` | Python/JSON |
| Test Data | `tests/data/` | SQL/JSON/CSV |
| Page Objects | `tests/pages/` | TypeScript |
| Reports | `tests/reports/` | HTML/Markdown |

---

## Collaboration

```
QA Test Expert → Orchestrator
    ↓
├─→ QA Engineer (test strategy, coverage goals)
├─→ Dev Expert (implementation details, code review)
└─→ Tech Architect (test architecture, patterns)
```

---

## TDD Integration

When working with Dev Expert on TDD:

1. **Red Phase** (QA Test Expert)
   - Write failing test first
   - Define expected behavior
   - Use factories for test data

2. **Green Phase** (Dev Expert)
   - Implement minimal code to pass
   - Focus on functionality, not perfection

3. **Refactor Phase** (Both)
   - Improve code quality
   - Keep tests passing
   - Optimize factory usage
