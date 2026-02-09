# Test and Verify

Run all available checks and tests. If something fails, fix it and re-run until everything passes.

## Step 1: Check What Changed

```bash
git status --short
```

```bash
git diff --name-only HEAD~3
```

## Step 2: Run All Checks

Run these checks in order. If any fail, stop and fix before continuing.

### Build Check

**Production build:**
```bash
npm run build
```

### Dev Server Check (quick smoke test)

**Start dev server briefly to check for runtime errors:**
```bash
npm run dev -- --host 2>&1 &
sleep 5
kill %1
```

## Step 3: Handle Failures

If any check fails:

1. **Read the error carefully** - understand what's wrong
2. **Fix the issue** - make the necessary code changes
3. **Re-run the failed check** - confirm it passes now
4. **Continue to next check** - don't skip ahead

## Step 4: Iterate Until Green

Keep going until ALL checks pass:
- [ ] Production build (`npm run build`)
- [ ] No console errors in dev

## Step 5: Report Results

When everything passes, give a short summary:
- What was tested
- Any issues that were fixed
- Confirm all checks are green

## Important

- **Don't give up after one fix attempt** - try multiple approaches
- **If truly stuck**, explain what's failing and why, then ask for guidance
- **The goal is green checks** - iterate until we get there
