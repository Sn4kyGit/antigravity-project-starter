---
name: expert-product-owner
description: "Product Owner Expert for user stories, acceptance criteria, backlog prioritization, and stakeholder communication. Triggers: user story, acceptance criteria, prioritize, backlog, feature request, stakeholder, requirement, MoSCoW, sprint planning, product vision"
category: domain
risk: safe
tags: "[product-owner, agile, requirements, user-stories, acceptance-criteria, prioritization]"
version: "1.0.0"
---

# Expert: Product Owner

> The Product Owner Expert transforms vague ideas into actionable, well-defined requirements. Masters user story writing, acceptance criteria (Gherkin), backlog prioritization (MoSCoW), and stakeholder communication.

## When to Activate

Automatically trigger when detecting:
- **User stories** - "write a user story", "story format"
- **Acceptance criteria** - "AC", "acceptance criteria", "Gherkin", "Given/When/Then"
- **Prioritization** - "prioritize", "backlog", "MoSCoW", "importance"
- **Requirements** - "feature request", "requirement", "stakeholder", "business need"
- **Planning** - "sprint planning", "product vision", "roadmap", "epic"

## Core Responsibilities

1. **User Story Creation** → INVEST-compliant stories
2. **Acceptance Criteria** → Gherkin format (Given/When/Then)
3. **Backlog Prioritization** → MoSCoW method
4. **Stakeholder Communication** → Clear, concise updates
5. **Feature Refinement** → From idea to implementable task

---

## Workflow

### Phase 1: Understand the Need

```
INPUT: Vague feature idea or stakeholder request

ASK (if unclear):
1. Who is the user? (Persona)
2. What problem do they solve?
3. Why is this important now?
4. What does success look like?
5. Are there constraints (time, budget, tech)?
```

### Phase 2: Create User Story

**Format (INVEST):**
```markdown
## User Story

**As a** [persona]
**I want** [action/feature]
**So that** [benefit/value]

### Context
[Background information]

### Acceptance Criteria
- [ ] AC1: [Criteria in Gherkin or bullet points]
- [ ] AC2: [Criteria]

### Definition of Done
- [ ] Code implemented
- [ ] Tests passing
- [ ] Documentation updated
- [ ] PO approved

### Priority
MoSCoW: [Must/Should/Could/Won't]

### Estimation
Story Points: [1/2/3/5/8/13]
```

### Phase 3: Write Gherkin Acceptance Criteria

```gherkin
Feature: [Feature Name]

  Scenario: [Scenario Description]
    Given [precondition]
    And [another precondition]
    When [action]
    Then [expected result]
    And [another expected result]

  Scenario: [Alternative Path]
    Given ...
    When ...
    Then ...

  Scenario: [Error Case]
    Given ...
    When [invalid action]
    Then [error message]
```

### Phase 4: Prioritize with MoSCoW

```markdown
## Backlog Prioritization

### Must Have (P0)
- Critical for launch
- No workarounds exist
- Legal/compliance requirements

### Should Have (P1)
- Important but not critical
- Workarounds exist
- Significant value add

### Could Have (P2)
- Nice to have
- Minor improvements
- If time permits

### Won't Have (P3)
- Explicitly excluded
- Future consideration
- Out of scope
```

---

## Output Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| User Story | `docs/features/FEATURE-XXX-story.md` | Markdown |
| Acceptance Criteria | Same file or `docs/features/FEATURE-XXX-ac.md` | Gherkin |
| Backlog | `docs/product/backlog.md` | Markdown table |
| Stakeholder Update | `docs/product/updates/YYYY-MM-DD-update.md` | Markdown |

---

## Collaboration with Other Experts

```
PO Expert → Orchestrator
    ↓
├─→ Tech Architect (for feasibility check)
├─→ QA Engineer (for testability review)
└─→ Dev Expert (for estimation)
```

**When to involve others:**
- Complex features → Tech Architect first
- UI-heavy stories → Frontend Expert
- Integration stories → Backend + DevOps Experts
- Performance-critical → Tech Architect + QA Engineer

---

## Best Practices

### ✅ DO
- Write stories from user perspective
- Make acceptance criteria testable
- Include edge cases in AC
- Keep stories small (fit in sprint)
- Validate with stakeholders

### ❌ DON'T
- Write technical implementation details
- Create stories without clear value
- Skip acceptance criteria
- Make stories too big (> 8 points)
- Assume context - document it

---

## Examples

### Good User Story
```markdown
**As a** registered user
**I want** to reset my password via email
**So that** I can regain access if I forget it

**Acceptance Criteria:**
1. Given I enter a valid email on "Forgot Password" page
   When I click "Send Reset Link"
   Then I receive an email with a secure token link
   And the link expires after 24 hours

2. Given I click an expired reset link
   When the page loads
   Then I see "Link expired" message
   And I can request a new link
```

### Bad User Story (Fix it)
```markdown
❌ "Implement password reset using JWT tokens with Redis 
     cache for token storage and SendGrid for emails"

✅ Split into:
   - User Story: Password reset flow (PO)
   - Tech Task: Implement JWT token service (Tech Architect)
   - Tech Task: Set up Redis cache (DevOps)
   - Tech Task: Integrate SendGrid (Dev)
```

---

## User Story Templates

### Template 1: Feature Story
```markdown
## User Story: [Feature Name]

**As a** [type of user]
**I want** [action/feature]
**So that** [benefit/value]

### Acceptance Criteria (Gherkin)

**Scenario 1: Happy Path**
```gherkin
Given [precondition]
When [action]
Then [expected result]
And [additional assertion]
```

**Scenario 2: Alternative Path**
```gherkin
Given [precondition]
When [different action]
Then [expected result]
```

**Scenario 3: Error Case**
```gherkin
Given [precondition]
When [invalid action]
Then [error message]
And [system state]
```

### Definition of Done
- [ ] Code implemented
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] E2E tests passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] PO acceptance

### Technical Notes
- API endpoints needed
- Database changes
- Third-party integrations

### UI/UX
- [Link to design]
- [Link to prototype]

### Analytics
- Events to track
- Metrics to monitor
```

### Template 2: Technical Story
```markdown
## Technical Story: [Task Name]

**As a** developer
**I want** [technical capability]
**So that** [business benefit]

### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Performance target: [metric]
- [ ] Quality gate: [requirement]

### Definition of Done
- [ ] Implementation complete
- [ ] Tests passing
- [ ] Documentation updated
- [ ] Monitoring in place
```

### Story Sizing Guide

| Story Points | Complexity | Examples |
|--------------|-----------|----------|
| **1** | Trivial | Typo fix, config change |
| **2** | Simple | Add field to form |
| **3** | Small | New API endpoint (CRUD) |
| **5** | Medium | Feature with logic |
| **8** | Large | Multi-component feature |
| **13** | Epic | Break down further |

### INVEST Checklist

**I**ndependent:
- [ ] Can be developed separately?
- [ ] No hard dependencies on other stories?

**N**egotiable:
- [ ] Details can be discussed?
- [ ] Not overly prescriptive?

**V**aluable:
- [ ] Clear user value?
- [ ] Business outcome defined?

**E**stimable:
- [ ] Team can size it?
- [ ] Clear scope?

**S**mall:
- [ ] Fits in sprint?
- [ ] Can be completed in few days?

**T**estable:
- [ ] Clear acceptance criteria?
- [ ] Can be verified?

### Anti-Patterns to Avoid

❌ **Too Technical:**
"Implement JWT token validation middleware with Redis cache"

✅ **User-Focused:**
"As a user, I want to stay logged in for 30 days so that I don't have to log in daily"

❌ **Too Vague:**
"Improve user experience"

✅ **Specific:**
"As a mobile user, I want one-tap login with Face ID so that I can access the app quickly"

❌ **Multiple Features:**
"Add login, password reset, and two-factor authentication"

✅ **Split:**
- Story 1: "As a user, I want to log in with email/password..."
- Story 2: "As a user, I want to reset my password..."
- Story 3: "As a user, I want two-factor authentication..."
