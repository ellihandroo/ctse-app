# Save Session Context

Save current state before leaving or context compression. Uses two files:

- `SESSION.md` - Ephemeral "where we left off" (overwritten each save)
- `PROJECT_STATUS.md` - Permanent milestones & decisions (appended)

## Step 1: Gather Current State

```bash
git status --short
```

```bash
git log --oneline -5
```

Read current project status for context:

```bash
cat PROJECT_STATUS.md
```

## Step 2: Create/Overwrite SESSION.md

Create `SESSION.md` in project root with this structure (overwrites previous):

```markdown
# Session Notes

> Last saved: [DATE AND TIME]
> Branch: [current branch name, e.g., feature/add-site]

## Currently Working On

[What task/feature we're in the middle of]

## Left Off At

[Specific file:line or exact point where work paused]
[Any partially written code or incomplete changes]

## Immediate Next Steps

1. [Very specific next action to take]
2. [Following action]
3. [etc.]

## Open Questions / Blockers

- [Anything unresolved that needs addressing]

## Context for Resumption

[Any important context not captured elsewhere - user preferences, constraints, things tried that didn't work, etc.]
```

## Step 3: Update PROJECT_STATUS.md (permanent changes only)

Only update PROJECT_STATUS.md if there are:

- **Completed milestones** - Move from "Next Steps" to completed sections
- **Key decisions** - Add to "Key Decisions Made" with reasoning
- **New next steps** - Add to "Next Steps" section

Do NOT add session-specific notes here - those go in SESSION.md.

## Step 4: Update CLAUDE.md (if needed)

Only if we discovered new patterns or rules that should persist across all sessions.

## Step 5: Commit

```bash
git add SESSION.md PROJECT_STATUS.md CLAUDE.md
git commit -m "Save session: [brief description]"
```

## Key Principles

- SESSION.md is for "hot" context - assume it's read immediately on resume
- Be specific: "src/pages/Trade.jsx:142" not "the trade page"
- Include the "why" for any non-obvious decisions
- If stuck, document what was tried and why it didn't work
