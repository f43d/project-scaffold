---
name: review-change
description: Review a code change's diff for defects and missing tests, reporting findings without modifying any files.
metadata:
  opencode/autoinvoke: false
---

# review-change

Review a code change for defects and missing tests. **This skill never edits files** — it only
reports.

## Steps

1. Get the diff to review (the working tree vs the recorded baseline, or a specified commit
   range). Use `git diff` (or `git diff <base>...HEAD`).
2. Inspect the changed files for:
   - correctness and type consistency
   - authorization / permission handling on any sensitive path
   - edge cases and error/status handling
   - missing or stale tests
3. Classify findings into **must-fix** and **optional**. For each must-fix, name the root
   cause (diagnose before proposing a fix) and the smallest safe fix.
4. Report as markdown with file references. If clean, say so explicitly.

Do not modify files, stage, or commit anything. Report only.
