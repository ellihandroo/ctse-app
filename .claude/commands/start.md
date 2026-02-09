---
description: Start a new task with proper branch setup. Use before making any code changes.
---

# Start Task

Sets up a feature branch before beginning work. **Always use this when starting a new task.**

## Step 1: Check Current State

```bash
git status --short
```

```bash
git branch --show-current
```

If there are uncommitted changes, ask the user what to do:

- Stash them (`git stash`)
- Commit them first
- Discard them

## Step 2: Pull Latest Main

```bash
git checkout main && git pull origin main
```

## Step 3: Create Feature Branch

Based on the task description, create an appropriate branch:

| Task Type   | Branch Pattern         | Example                     |
| ----------- | ---------------------- | --------------------------- |
| New feature | `feature/description`  | `feature/add-earn-page`     |
| Bug fix     | `fix/description`      | `fix/chart-hover-bug`       |
| Refactor    | `refactor/description` | `refactor/asset-components` |

```bash
git checkout -b feature/short-description
```

## Step 4: Confirm Ready

Tell the user:

- What branch was created
- They're ready to start coding
- Remind them to use `/commit-push-pr` when done

## Example Usage

```
User: /start add spend card page
Claude:
  Pulled latest main
  Created branch: feature/spend-card-page
  Ready to code!

When finished, use /commit-push-pr to push and create a PR.
```

## Why This Matters

- Enables multiple Claude instances to work in parallel
- Keeps main clean and deployable
- Makes code review easier via PRs
