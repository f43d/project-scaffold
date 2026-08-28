# Operations

Day-2 maintenance guide. Goal: anyone (human or AI agent) can fix any common problem in &lt;10 minutes.

## Local development

```bash
# fill in the canonical commands for this project
```

## Environment variables

| Var | Where set | Used by | Where to obtain |
| --- | --- | --- | --- |
| _example_ | _local + CI_ | _module path_ | _URL or process_ |

Never commit secrets. The project's `.env.example` documents the schema.

## Deploy

<step-by-step from commit to live URL>

## End-of-day routine

When you (or your AI agent) say **"call it a day"**, follow this disciplined close-out so future-you and future-agents have full context.

### What the AI does

1. Run `npm run end-of-day` to gather git context — it outputs JSON or Markdown summary of what's changed since the last session file.
2. Draft **three** updates based on the actual diff:
   - `docs/sessions/<today>.md` (or append to existing) — log of what was done, why, open questions.
   - `docs/DECISIONS.md` — append-only entry if any non-trivial decision was made.
   - `CHANGELOG.md` — user-facing entry if anything visitors will see changed.
3. Show the drafts to the user. **Do not write them to disk yet.**
4. Wait for the user to approve / edit / drop them.
5. On approval: write the files, commit (`docs(session): end-of-day <date>`), and ask for a token to push.

### Heuristics the script uses

- **Decisions to log** when files in `src/components/`, `.github/workflows/`, or top-level config (language-specific) change.
- **CHANGELOG entry** when files in `src/pages/`, `src/components/`, or `src/styles/` change.
- **Session log**: every working day always gets one — append if same day, new file if later.

### What you (the user) do

1. Read the drafts.
2. Confirm, edit, or drop with specific instructions.
3. Say "yes, push" (or similar). Provide a fresh GitHub PAT when asked.

### Discipline

- If a session has no real decision (e.g. typo fixes, dependency bumps), still write a session log but skip `DECISIONS.md`.
- If a session only touches internal plumbing (CI, types), still write a session log but skip `CHANGELOG.md`.

## Common gotchas

<list them as you encounter them>

---

## Sources / credentials checklist

<list the third-party services + the GitHub roles the owner needs>
