# Operations

Day-2 maintenance guide. Goal: anyone (human or AI agent) can fix any common problem in <10 min.

## Local development

```bash
# canonical install / run / test commands for this project
```

## Environment variables

| Var | Where set | Used by | Where to obtain |
| --- | --- | --- | --- |
| _example_ | _local + CI_ | _module path_ | _URL or process_ |

Never commit secrets. `.env.example` documents the schema (if any).

## Deploy

<step-by-step from commit to live/running>

## End-of-day routine

When you (or your agent) say **"call it a day"**, follow this close-out.

### What the agent does
1. Run `python3 scripts/end-of-day.py --markdown` to snapshot what changed since the last session file.
2. Draft **three** updates from the actual diff:
   - `docs/sessions/<today>.md` — what was done, why, open questions.
   - `docs/DECISIONS.md` — append **only** if a real decision was made.
   - `CHANGELOG.md` — append **only** if something user-visible changed.
3. **Show drafts first. Do not write to disk until the user approves/edits.**
4. On approval: write, commit `docs(session): end-of-day <date>`, push.

### Discipline
- **Show drafts FIRST, write SECOND.** Always.
- No real decision (typos, bumps) → still write a session log, skip `DECISIONS.md`.
- Only internal plumbing → session log, skip `CHANGELOG.md`.
- Backfill comments on code you touched (per `docs/CODE-COMMENTS.md`) while the *why* is fresh.

## Proactive check-in

**Before a non-trivial change** (new feature, refactor, dependency, deleting a doc, changing a
convention), the agent must pause, say what it's about to do and why, and wait for a go-ahead
unless already approved. Do not surprise the user with big changes.

## Secure push with PAT

Never write a PAT into `.git/config` or shell history. Use:
```bash
./scripts/push-with-pat.sh github_pat_xxxx origin main
```
Then remind the user **once** to revoke the PAT at the true end of the session.

## Common gotchas

<list as you hit them>

## Sources / credentials checklist

<third-party services + GitHub roles the owner needs>
