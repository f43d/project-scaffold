---
description: End-of-day routine — snapshot, draft session/DECISIONS/CHANGELOG, then commit+push
---
Run the end-of-day routine:

1. Run `python3 scripts/end-of-day.py --markdown` to snapshot what changed since the last
   session file.
2. Draft **three** updates (based on the actual diff, not boilerplate):
   - `docs/sessions/<today>.md` — what was done, why, open questions (append if same day).
   - `docs/DECISIONS.md` — append **only** if a real design/strategic decision was made.
   - `CHANGELOG.md` — append **only** if something user-visible changed.
3. **Show all drafts to the user as a preview. Do not write anything to disk yet.**
4. Wait for explicit approval / edits / drops.
5. On approval: write the files, then
   `git add` them and commit as `docs(session): end-of-day YYYY-MM-DD — <summary>`, and push
   (use `scripts/push-with-pat.sh` if a PAT is needed — never put it in `.git/config`).

Remind the user **once** to revoke any GitHub PAT at the true end of the session; do not nag.
