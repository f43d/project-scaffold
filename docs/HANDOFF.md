# Handoff Brief

> **Read this file first** before doing anything in a new session on this
> project. It contains the full project context, the current state, the
> open items, and the conventions the previous session established.

## What this project is

> _Replace this section with 2–4 sentences. Try to answer: what is it, who is it for, where does it live (URL/repo), what stack._

## The most important docs to read

Read these in this order before doing anything:

1. `AGENTS.md` — project context, stack, conventions, "things to never do", and the **end-of-day routine** (triggered by "call it a day").
2. `docs/ARCHITECTURE.md` — data flow, deploy flow, integration flow.
3. `docs/DECISIONS.md` — every major decision with the rejected alternatives. If the next AI is tempted to re-argue a settled question, this is where the answer is.
4. `docs/OPERATIONS.md` — env vars, day-2 ops, common gotchas.
5. `docs/PERMANENCE.md` — registrar info, renewal date, GitHub designated successor, backup locations, "what to do if X breaks" scenarios. (Skip if your project doesn't need long-term survival planning.)
6. `docs/AI-WORKFLOW.md` — when to install which AI-agent plugin.
7. `git log --oneline -20` — code-level history.
8. `docs/sessions/` — chronological log, one file per working day. Latest file is the most recent state.

## Repo conventions (don't deviate without updating DECISIONS.md)

> _Customize this section per project. Generic template:_
> - **TS strict**, **ESM only**, server code in `src/lib/*.ts`, browser code in client `<script>` blocks of `.astro` files.
> - **CSS tokens** in `src/styles/global.css :root` — change colours / fonts there, not in component styles.
> - **Data files** in `data/*.env` are pipe-separated (`NN|field1|...|fieldN`). Parse via `src/lib/parseEnv.ts`.
> - **Three shared modules** in `src/lib/`: `types.ts` (data shapes), `parseEnv.ts` (env parser + cache), `utils.ts` (`pickRandomInt`, `formatBytes`, `escapeHtml`).
> - **Commit messages**: `<type>(<scope>): <summary>`. End-of-day commits prefix with `docs(session): …`. Include a body paragraph explaining the **why** for non-trivial changes.
> - **AI-authored commits** carry `Co-authored-by: opencode <noreply@opencode>` in the trailer.
> - **End-of-day routine** (see `AGENTS.md`): when the user says "call it a day", run `npm run end-of-day`, draft session log + DECISIONS + CHANGELOG entries, **show drafts**, wait for confirmation, commit, push, then remind ONCE about PAT revocation.

## Current state at handoff (date: YYYY-MM-DD)

> _List the current state of the project as of the most recent session:_
> - What works
> - What's in scope to do (open items, in priority order)
> - Things the next AI should NOT do

### What works

> _Bullet list._

### What's in scope to do (open items, in priority order)

> _Numbered list._

### Last-session artifacts artifacts (still need the user's eyes)

> _Bullet list of pending things the user said they'd handle, drafts waiting for review, etc._

### Things the next AI should NOT do

> _Bullet list — protects against re-arguing settled questions._

## How to start a session on this project

The user will paste a prompt. It should be:

> Read these files in this order, then summarise back to me what you
> know about this project before doing anything:
> 1. AGENTS.md
> 2. docs/ARCHITECTURE.md
> 3. docs/DECISIONS.md
> 4. docs/OPERATIONS.md
> 5. docs/PERMANENCE.md   (if it exists)
> 6. docs/HANDOFF.md
> 7. docs/AI-WORKFLOW.md
> 8. git log --oneline -20
> 9. docs/sessions/ (latest file)
>
> Today's task: [whatever the user wants done]

That's all the next session needs.

## How the user uses the end-of-day routine

When the user says "call it a day" (or "wrap up", "let's call it a day",
or similar):

1. Run `npm run end-of-day` in this project's root to get the snapshot.
2. Draft three things:
   - Session log entry (append to today's file in `docs/sessions/` — usually `YYYY-MM-DD.md`; if a new file is needed, create one per working day).
   - `docs/DECISIONS.md` entry only if a real architectural / strategic decision was made (refactors don't qualify; explicit "I chose X over Y" calls do).
   - `CHANGELOG.md` entry if anything user-visible changed.
3. **Show drafts.** Wait for explicit confirmation — don't write anything until the user says "yes" (or similar). The user may edit drafts before approving.
4. Commit and push. Ask for the GitHub PAT if the token is gone from the sandbox. Use the the canonical one if it's still in `.git/config`, else ask.
5. After push, remind ONCE about PAT revocation. Per `AGENTS.md`, do not nag about this at any other time.

## Repo info quick reference

> _Fill in once per project:_
> - **Repo URL**: https://github.com/&lt;owner&gt;/&lt;repo&gt;
> - **Live URL**: &lt;if applicable&gt;
> - **Default branch**: main
> - **Workflows**: `.github/workflows/deploy.yml` (or equivalent)
> - **Hidden pages**: `/settings/` (no public link — owner-only)
> - **Public data files**: `data/list.env`, `data/gallery.env`, `data/blessings.env`
> - **GitHub Variables needed**: _&lt;list&gt;_
> - **Last session date / last commit SHA at handoff**: _record this on save_

## Last session summary (date)

> _One-paragraph recap of what the previous session accomplished. Update this on every save._

---

_Last updated: YYYY-MM-DD (handoff written)._