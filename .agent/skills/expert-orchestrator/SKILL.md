---
name: expert-orchestrator
description: "Orchestrator Expert for coordinating multi-agent workflows, delegating tasks, integrating results, and managing the swarm. CRITICAL: Swarm costs ~15× more tokens than single agent - use ONLY for complex tasks! Triggers: orchestrate, coordinate, swarm, multi-agent, delegate, assign task, parallel work, integrate results, expert team, collaborate agents"
category: meta
risk: moderate
tags: "[orchestrator, multi-agent, swarm, coordination, delegation, integration, complexity-assessment]"
version: "1.1.0"
---

# Expert: Orchestrator

> The Orchestrator Expert coordinates the multi-agent swarm, delegates tasks to specialized experts, manages parallel workflows, and integrates results into cohesive solutions.
> 
> ⚠️ **CRITICAL:** Swarm mode costs ~15× more tokens than single agent. **Use ONLY for complex tasks!**

## When to Activate

Automatically trigger when detecting:
- **Coordination** - "orchestrate", "coordinate", "manage workflow"
- **Swarm** - "swarm", "multi-agent", "team of agents", "multiple experts"
- **Delegation** - "delegate", "assign task", "distribute work"
- **Parallel** - "parallel", "concurrent", "at the same time"
- **Integration** - "integrate results", "combine work", "synthesize"

## ⚠️ CRITICAL: Complexity Assessment First!

### Token Economics Reality

| Architecture | Token Multiplier | Use For |
|--------------|------------------|---------|
| **Single Agent** | 1× | Simple queries, quick fixes |
| **Single Agent + Tools** | ~4× | Tool-using tasks, medium complexity |
| **Multi-Agent Swarm** | ~15× ⚠️ | Complex, multi-domain tasks ONLY |

> **Rule:** If in doubt, start with single agent. Escalate to swarm only if complexity requires it.

---

## Complexity Decision Matrix

### Step 1: Score the Request

```markdown
## Complexity Scorecard

| Factor | Low (1pt) | Medium (2pt) | High (3pt) |
|--------|-----------|--------------|------------|
| **Files Changed** | 1-3 files | 4-10 files | 10+ files |
| **Layers Involved** | 1 layer | 2 layers | 3+ layers |
| **Tech Domains** | 1 domain | 2 domains | 3+ domains |
| **Integration Points** | None | 1-2 external | 3+ external |
| **Security Impact** | None | Standard | Critical |
| **Timeline** | Flexible | Sprint | Fixed deadline |

**Total Score:**
- 6-9 points: SINGLE AGENT (with tools)
- 10-14 points: SMALL SWARM (2-3 experts)
- 15+ points: FULL SWARM (all experts)
```

### Step 2: Quick Decision Tree

```
Is task a simple fix or question?
├── YES → Single Agent
└── NO → Continue
    
    Spans multiple domains (FE + BE + DB)?
    ├── NO → Single Agent with tools
    └── YES → Continue
        
        Requires architecture decisions?
        ├── YES → SWARM (Tech Architect + Dev)
        └── NO → Continue
            
            Security or performance critical?
            ├── YES → SWARM (add QA Engineer)
            └── NO → SMALL SWARM (Dev + QA Test)
```

### Step 3: Swarm vs Single Agent Guide

| Scenario | Use | Don't Use |
|----------|-----|-----------|
| **Typo fix** | Single Agent | ❌ Swarm |
| **Add field to form** | Single Agent | ❌ Swarm |
| **New API endpoint** | Single Agent + tools | ❌ Swarm |
| **OAuth implementation** | ✅ Swarm | ❌ Single Agent |
| **Database migration** | ✅ Swarm | ❌ Single Agent |
| **Full feature (FE+BE)** | ✅ Swarm | ❌ Single Agent |
| **Architecture change** | ✅ Swarm | ❌ Single Agent |
| **Security audit** | ✅ Swarm | ❌ Single Agent |

---

## Core Responsibilities

1. **Complexity Assessment** → Decide: Single Agent vs Swarm
2. **Context Isolation** → Sub-agents exist to partition context
3. **Expert Selection** → Choose minimum experts needed
4. **Delegation** → Assign with clear deliverables
5. **Coordination** → Manage parallel/sequential execution
6. **Integration** → Combine outputs into cohesive result
7. **Conflict Resolution** → Resolve disagreements between experts

---

## The Swarm Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         ORCHESTRATOR AGENT                           │
│                    (YOU - Context Coordinator)                       │
│                                                                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐ │
│  │   Analyze   │→ │   Decide    │→ │  Delegate   │→ │  Integrate  │ │
│  │ Complexity  │  │ Single/Swarm│  │  to Experts │  │   Results   │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
         │                           │
         ▼                           ▼
┌─────────────────────┐    ┌──────────────────────────────────────────┐
│   SINGLE AGENT      │    │           MULTI-AGENT SWARM              │
│   (1× tokens)       │    │           (~15× tokens)                  │
│                     │    │                                          │
│ Direct execution    │    │  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ with tools          │    │  │    PO    │ │   TECH   │ │    QA    │ │
│                     │    │  │  EXPERT  │ │ ARCHITECT│ │ ENGINEER │ │
│ Use for:            │    │  └──────────┘ └──────────┘ └──────────┘ │
│ - Simple tasks      │    │  ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ - Quick fixes       │    │  │   QA     │ │   DEV    │ │  DEVOPS  │ │
│ - One domain        │    │  │  TEST    │ │  EXPERT  │ │  EXPERT  │ │
└─────────────────────┘    │  └──────────┘ └──────────┘ └──────────┘ │
                           └──────────────────────────────────────────┘
```

---

## Workflow

### Phase 1: Assess Complexity

```markdown
## Step 1: Complexity Assessment

**User Input:** "Implementiere OAuth"

### Quick Check
- [ ] More than 5 files? YES → Consider Swarm
- [ ] Multiple layers (FE + BE)? YES → Consider Swarm  
- [ ] External integrations? YES → Consider Swarm
- [ ] Security critical? YES → Swarm recommended
- [ ] Tight deadline? YES → Parallel experts help

### Detailed Score
| Factor | Score |
|--------|-------|
| Files (FE+BE+Tests) | 3/3 |
| Layers (3: FE, API, DB) | 3/3 |
| Domains (Auth, UI, Security) | 3/3 |
| Integrations (Google, GitHub) | 2/3 |
| Security | 3/3 |
| **TOTAL** | **14/18** |

### Decision
**MODE:** ✅ MULTI-AGENT SWARM (Score > 14)
**REASON:** Multi-layer, security-critical, external integrations
**ESTIMATED COST:** ~15× tokens (justified by complexity)
```

### Phase 2: Plan Workflow (if Swarm selected)

```markdown
## Swarm Plan: OAuth Implementation

### Architecture: Supervisor/Orchestrator Pattern
Context isolation per expert, centralized coordination.

### Phase 1: Design (Parallel) - Context Partition A
├─[PO Expert]─────────────┐
│  Context: Requirements  │
│  Output: User Stories   │
│  Duration: ~30min       │
│  Depends: None          │
└─────────────────────────┤
                          ├─→ Gate: Design Review
├─[Tech Architect]────────┤
│  Context: System Design │
│  Output: ADR + Design   │
│  Duration: ~45min       │
│  Depends: None          │
└─────────────────────────┘

### Phase 2: Planning (Sequential)
[QA Engineer]
  Context: Test Strategy
  Input: User Stories + Design
  Output: Test Strategy
  Duration: ~30min

### Phase 3: Implementation (Parallel) - Context Partition B
├─[Dev Expert]────────────┐
│  Context: Code          │
│  Output: Implementation │
│  Duration: ~2h          │
│  Depends: Phase 1,2     │
└─────────────────────────┤
                          ├─→ Gate: Code Review
├─[DevOps Expert]─────────┤
│  Context: Infrastructure│
│  Output: CI/CD Pipeline │
│  Duration: ~1h          │
│  Depends: Phase 1       │
└─────────────────────────┘

### Phase 4: Testing (Sequential)
[QA Test Expert]
  Context: Test Execution
  Input: Implemented Code
  Output: E2E Tests
  Duration: ~1h

### Phase 5: Integration (Orchestrator)
[Orchestrator]
  Aggregate all contexts
  Resolve conflicts
  Deliver final result
```

### Phase 3: Delegate Tasks

**Delegation Format:**
```markdown
## Delegate to: [Expert Name]

**Context Window:** [What this expert needs to know]
- Relevant background
- Input from other experts (if sequential)
- Constraints and requirements

**Task:** [Clear, actionable task]

**Deliverable:**
- File path
- Format
- Acceptance criteria

**Dependencies:**
- Waits for: [expert or none]
- Blocks: [expert or none]

**Constraints:**
- Time estimate
- Tech stack
- Quality gates
```

### Phase 4: Manage Execution

```markdown
## Execution Dashboard

| Expert | Task | Status | Output | Tokens Used |
|--------|------|--------|--------|-------------|
| PO Expert | User Stories | ✅ Complete | AUTH-story.md | 2.5k |
| Tech Architect | System Design | ✅ Complete | ADR-001.md | 3.2k |
| QA Engineer | Test Strategy | 🔄 In Progress | - | 1.8k |
| Dev Expert | Implementation | ⏳ Waiting | - | - |
| DevOps Expert | CI/CD | ⏳ Waiting | - | - |
| QA Test Expert | E2E Tests | ⏳ Waiting | - | - |

**Total Tokens So Far:** 7.5k
**Estimated Total:** ~45k (15× baseline)
```

### Phase 5: Integrate Results

```markdown
## Integration Checklist

### Context Aggregation
- [ ] Collect all expert outputs
- [ ] Verify cross-references (AC ↔ Code ↔ Tests)
- [ ] Check for conflicts between experts
- [ ] Validate consistency

### Quality Gates
- [ ] All AC implemented?
- [ ] Tests cover requirements?
- [ ] Documentation complete?
- [ ] Security reviewed?
- [ ] Performance validated?

### Conflict Resolution
If experts disagree:
1. Gather requirements context
2. Evaluate trade-offs objectively
3. Make decision with rationale
4. Document decision for future reference
```

---

## Orchestration Patterns

### Pattern 1: Supervisor/Orchestrator (Default)
```
Orchestrator coordinates all experts
├── Centralized control
├── Sequential + parallel phases
└── Best for: Complex workflows with dependencies
```

### Pattern 2: Parallel Map (Independent Tasks)
```
Same task across multiple items
├── Fan-out: Create task per item
├── Parallel execution
└── Fan-in: Aggregate results
```

### Pattern 3: Sequential Chain (Dependencies)
```
Output of A → Input of B → Input of C
├── Strict ordering
├── Context passes through chain
└── Best for: Multi-step processing
```

### Pattern 4: Peer-to-Peer (Expert Consensus)
```
Experts collaborate directly
├── Shared context
├── Consensus building
└── Best for: Architecture decisions
```

---

## Expert Trigger Keywords

| Expert | Trigger When | Avoid When |
|--------|-------------|------------|
| **PO Expert** | Requirements unclear, need AC | Simple bug fix |
| **Tech Architect** | New architecture, tech choice | Adding field |
| **QA Engineer** | Test strategy, coverage goals | Typo fix |
| **QA Test Expert** | Implement tests, automation | Documentation |
| **Dev Expert** | Code implementation | Architecture decision |
| **DevOps Expert** | CI/CD, deployment | Code change |

---

## Cost Optimization

### Minimize Token Usage
1. **Start small** - Begin with single agent
2. **Escalate gradually** - Add experts only when needed
3. **Parallel when possible** - Reduces wall-clock time
4. **Clear deliverables** - Avoid rework
5. **Context isolation** - Don't duplicate context

### When to AVOID Swarm
- Simple fixes (< 30 min work)
- Single file changes
- Documentation updates
- Questions/Clarifications
- Refactoring < 5 files

---

## Conflict Resolution

```markdown
## Example: Architecture Disagreement

**Conflict:**
- Tech Architect: "Use Redis for sessions"
- DevOps Expert: "Use PostgreSQL (simpler ops)"

**Resolution Process:**
1. **Quantify Requirements**
   - Scale: 10k concurrent users
   - Latency: < 10ms
   - Budget: Limited ops time

2. **Evaluate Options**
   | Criteria | Redis | PostgreSQL |
   |----------|-------|------------|
   | Performance | ⭐⭐⭐ | ⭐⭐ |
   | Ops Effort | ⭐⭐ | ⭐⭐⭐ |
   | Scale Headroom | ⭐⭐⭐ | ⭐⭐ |

3. **Decision with Rationale**
   - **Decision:** PostgreSQL (for now)
   - **Rationale:** Team expertise, sufficient for current scale
   - **Upgrade Path:** Document Redis migration at 50k users
```

---

## Output Artifacts

| Artifact | Location | Format |
|----------|----------|--------|
| Complexity Assessment | `.agent/swarm/complexity-XXX.md` | Markdown |
| Workflow Plan | `.agent/swarm/workflow-XXX.md` | Markdown |
| Delegation Log | `.agent/swarm/delegation-log.md` | Markdown |
| Integration Report | `.agent/swarm/integration-XXX.md` | Markdown |
| Token Usage | `.agent/swarm/token-report.md` | Markdown |
| Swarm State | `.agent/swarm-state.yml` | YAML |

---

## Best Practices

### ✅ DO
- Assess complexity FIRST
- Use minimum experts needed
- Isolate context per expert
- Document decisions
- Track token usage
- Start simple, escalate gradually

### ❌ DON'T
- Use swarm for simple tasks
- Duplicate context across experts
- Skip conflict resolution
- Ignore token costs
- Over-engineer orchestration
- Create unnecessary dependencies

---

## Quick Command Reference

| Command | Action |
|---------|--------|
| "Start swarm for [feature]" | Initialize multi-agent (after complexity check) |
| "Assess complexity" | Run complexity scorecard |
| "Ask [expert] to [task]" | Delegate to specific expert |
| "Check swarm status" | View progress and token usage |
| "Integrate results" | Combine expert outputs |
| "Resolve conflict" | Mediate between experts |
| "Compare single vs swarm" | Show token cost comparison |
