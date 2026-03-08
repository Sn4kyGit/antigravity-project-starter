# Rule: OpenSpec Archive Required

> **CRITICAL:** All completed OpenSpec changes MUST be archived. Never leave finished changes in `openspec/changes/`.

## The Rule

```
IF change is complete (all tasks ✅)
THEN move to openspec/changes/archive/
ELSE keep in openspec/changes/
```

## Why Archive?

1. **Clean workspace** - Only active changes visible
2. **History preserved** - Past changes referenceable
3. **Clear status** - Easy to see what's in progress
4. **Compliance** - Spec-driven process complete

## Archive Checklist

Before archiving, verify:

```markdown
## Pre-Archive Verification

- [ ] All tasks in tasks.md show ✅
- [ ] Code reviewed and merged
- [ ] Tests passing in CI
- [ ] Deployed to production (if applicable)
- [ ] Documentation updated
- [ ] CONTINUITY.md updated
- [ ] Relevant memories saved
```

## How to Archive

### Step 1: Verify Status
```bash
openspec status --change "change-name"
# OR manually check tasks.md
```

### Step 2: Move to Archive
```bash
# Create archive directory if needed
mkdir -p openspec/changes/archive

# MOVE (not copy) the change
mv openspec/changes/change-name openspec/changes/archive/
```

### Step 3: Verify
```bash
ls openspec/changes/
# Should show: archive/ (and any active changes)

ls openspec/changes/archive/
# Should show: change-name/ (archived changes)
```

## What Gets Archived

```openspec/changes/archive/change-name/
├── proposal.md          # Original proposal (preserved)
├── specs/               # Requirements (preserved)
├── design.md            # Design doc (preserved)
├── tasks.md             # Completed tasks (all ✅)
└── completion-report.md # (Optional) Summary
```

## Never Do This

❌ **Delete** a change directory:
```bash
rm -rf openspec/changes/change-name  # WRONG!
```

❌ **Leave** completed changes:
```bash
# After completion, change still in:
openspec/changes/change-name  # WRONG - should be archived!
```

❌ **Archive incomplete** changes:
```bash
# Tasks not done, but archiving anyway - WRONG!
```

## Always Do This

✅ **Move** to archive:
```bash
mv openspec/changes/change-name openspec/changes/archive/
```

✅ **Verify** archive:
```bash
ls openspec/changes/archive/change-name/  # Should exist
ls openspec/changes/change-name/  # Should NOT exist
```

✅ **Update** CONTINUITY.md:
```markdown
## Completed Changes
| Date | Change | Status |
|------|--------|--------|
| 2026-03-03 | change-name | ✅ Archived |
```

## Automation

### Pre-Commit Hook (Optional)
```bash
#!/bin/bash
# .git/hooks/pre-commit

completed=$(find openspec/changes -maxdepth 1 -type d \
  ! -name "archive" ! -name "changes" \
  -exec test -f {}/tasks.md \; -print 2>/dev/null | wc -l)

if [ $completed -gt 0 ]; then
  echo "⚠️  $completed changes not archived!"
  echo "Run: mv openspec/changes/XXX openspec/changes/archive/"
  exit 1
fi
```

## Enforcement

**Agent MUST:**
1. Check for completed changes before starting new work
2. Archive completed changes immediately
3. Verify archive location
4. Update CONTINUITY.md

**Agent MUST NOT:**
1. Start new change with unarchived completed changes
2. Delete change directories
3. Leave completed changes in active folder

## Examples

### Good Archive Flow
```
1. Implement feature
2. All tasks complete ✅
3. Code merged
4. mv openspec/changes/feature-x openspec/changes/archive/
5. Update CONTINUITY.md
6. Start next change
```

### Bad Flow (Correct It)
```
1. Implement feature
2. All tasks complete ✅
3. Code merged
4. Start next change ← WRONG! Archive first!
   (feature-x still in changes/)
```
