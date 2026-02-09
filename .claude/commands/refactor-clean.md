# Refactor Clean

Safely identify and remove dead code with build verification:

1. Scan for dead code:
   - Unused imports
   - Unused components
   - Unused functions/variables
   - Unused CSS classes
   - Orphaned files

2. Categorize findings by severity:
   - SAFE: Unused utilities, dead imports
   - CAUTION: Components, pages
   - DANGER: Config files, entry points

3. Propose safe deletions only

4. Before each deletion:
   - Run `npm run build`
   - Verify build passes
   - Apply change
   - Re-run build
   - Rollback if build fails

5. Show summary of cleaned items

Never delete code without verifying the build first!
