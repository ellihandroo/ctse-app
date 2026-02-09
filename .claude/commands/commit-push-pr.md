# Commit, Push, and Create PR

Get the current state of the repository:

```bash
git status --short
```

```bash
git diff --staged --stat
```

```bash
git log --oneline -3
```

```bash
git branch --show-current
```

## Pre-Commit Documentation Check

Before committing, analyze the changes and determine if PROJECT_STATUS.md should be updated:

**Check for these scenarios:**

1. **New feature completed?** → Add to "Completed" section under current sprint
2. **Bug fixed?** → Add to "Completed" if significant
3. **Major milestone reached?** → Update progress percentages
4. **Architectural changes?** → Note in relevant section

**If documentation update is warranted:**

- Read the current PROJECT_STATUS.md
- Add a brief entry (1-2 lines) describing what was completed
- Stage PROJECT_STATUS.md with the other changes

**Skip documentation update for:**

- Minor refactoring
- Code style/formatting changes
- Test-only changes
- WIP commits

## Commit Workflow

Based on the changes shown above:

1. **Stage all changes** (if there are unstaged files)
2. **Update PROJECT_STATUS.md** if warranted (see above)
3. **Create a commit** with a clear, descriptive message that explains what changed and why
4. **Push** to the remote repository
5. **Create a Pull Request** using `gh pr create` with:
   - A clear title summarizing the changes
   - A body with a brief description of what was done

If there are no changes to commit, let me know instead of creating an empty commit.

## Branch Check (CRITICAL)

If the current branch is `main`:

1. **STOP** - Do not commit directly to main
2. **Create a feature branch first**:
   ```bash
   git checkout -b feature/short-description
   ```
3. Then proceed with the commit

This enables multiple Claude instances to work in parallel without conflicts.
