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
3. Show the drafts to the user as readable preview. **Do not write them to disk yet.**
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

- **Show drafts FIRST, write SECOND.** The agent must not write any file to disk until the owner has seen and approved the drafts. The owner may want to edit before commit.
- **The PAT is used at most once per session, then revoked.** See "PAT reminder policy" below.
- If a session has no real decision (e.g. typo fixes, dependency bumps), still write a session log but skip `DECISIONS.md`.
- If a session only touches internal plumbing (CI, types), still write a session log but skip `CHANGELOG.md`.
- **Backfill comments on the code you touched.** Scan the diff before closing out: any file that gained logic or lost a comment during the session should be commented per `docs/CODE-COMMENTS.md`. The end-of-day is the natural moment to do it, while the why is still fresh in context.

## PAT reminder policy

The agent needs the GitHub PAT to push commits throughout the session. Reminding mid-session prompts the owner to revoke mid-session, breaking the workflow.

- **Remind the owner to revoke the PAT once**, at the actual end of the session.
- Trigger phrases: "call it a day", "we're done for now", "stop for the night", or equivalent.
- **Do not** remind after every commit.
- **Do not** remind if the session has already ended once in the same calendar day.
- See also `AGENTS.md` §"Token / security reminder policy".

## Secure push with PAT

A PAT pasted in chat must never be written to `.git/config` persistently, and should never be in shell history. Use the `scripts/push-with-pat.sh` helper:

```bash
./scripts/push-with-pat.sh github_pat_xxxx origin main
```

What it does:

1. Writes the PAT to a temp file with `umask 077` + `chmod 700` (only the running shell can read it).
2. Sets `GIT_ASKPASS` to a script that echoes the PAT, so git can read it without env-vars or shell history.
3. Runs `git push origin main` with `credential.helper=` cleared (so git uses `GIT_ASKPASS`).
4. `shred -u`s the temp file on the way out, regardless of push success/failure.

Why this matters: pasting the PAT into `git remote set-url https://…@github.com/…` would write it to `.git/config` — recoverable later. Pasting it in a normal `git push` invocation puts it in `~/.bash_history`. This pattern avoids both.

## Common gotchas

<list them as you encounter them>

---

## Sources / credentials checklist

<list the third-party services + the GitHub roles the owner needs>
