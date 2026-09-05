# AGENTS.md — Project context for AI agents (and humans)

If you are an AI agent reading this: **stop, read this file first**, then read `docs/ARCHITECTURE.md` and `docs/DECISIONS.md` before doing any work.

## What this project is

> _Replace this section with 2–4 sentences about the project. Try to answer: what is it, who is it for, where does it live (URL/repo)._

## Stack — do not deviate without updating DECISIONS.md

> _List the frameworks, languages, services and constraints. e.g.:_
> - **Language**: TypeScript (strict)
> - **Runtime**: Node 20 LTS (no other Runtimes)
> - **Build**: Vite, output `dist/` (committed by CI, never by you)
> - **Deploy**: GitHub Pages via Actions, custom domain via `public/CNAME`
> - **Forbidden**: Tailwind, jQuery, anything not in `package.json`

## Build / dev / deploy

> _Replace with the canonical commands in this project. Read them out of `package.json` or `Makefile`._

```bash
# install, dev, build, test — whatever this project has
```

## Conventions

> _Codify the rules so an agent can apply them without asking you._
> - File naming: `kebab-case.<ext>` for sources, `PascalCase.astro` for components.
> - All user-facing strings are localized to &lt;lang code&gt; at `src/i18n/&lt;lang&gt;.json`.
> - Design tokens live exclusively in `src/styles/tokens.css` `:root` — change colours/fonts there.
> - **Tabular site content** lives in `data/*.env` (pipe-separated, see `docs/OPERATIONS.md` §"Data files"). Never JSON/YAML for content humans edit by hand.
> - Commit messages: `<type>(<scope>): <summary>` (e.g. `gallery: replace lightbox`).
> - **End-of-day commit prefix**: `docs(session): end-of-day YYYY-MM-DD — summary` — keeps session log commits easy to find in `git log`.
> - AI-authored commits get `Co-authored-by: opencode <noreply@opencode>` (or your agent's tag) in the trailer.
> - When making a non-trivial decision, append to `docs/DECISIONS.md`. State the **decision**, **context**, **alternatives rejected**, **consequence**.
> - When finishing a session of work, run `npm run end-of-day` (or your package's equivalent). The agent must produce draft updates, get your approval, then commit + push.
> - **Comment the code for BOTH humans and AI agents** — see `docs/CODE-COMMENTS.md`. Every file, component, section and non-obvious line should carry a short "what / why" note. The reader may be a family member with no prior context, or a future AI session that has never seen this repo. A block comment that explains *why* a decision was made beats five inline comments that restate the code. When a future session finds unexplained code, it is expected to ADD the missing comment rather than skip past it.

## Things to never do (without explicit ask)

> _Project-specific guardrails._
> - Don't add a runtime backend without an explicit request.
> - Don't commit secrets — `.env` is gitignored. Use the project's secret store.
> - Don't add analytics / trackers unless asked.
> - Don't enable dark mode by default unless that's the design.
> - Don't switch off the historical &lt;design palette name&gt; palette defined in `docs/DECISIONS.md`.
> - Don't strip or "clean up" explanatory comments during a refactor — a comment that survives is cheaper than re-deriving the why later. If a comment is wrong, fix the comment alongside the code.

## Token / security reminder policy

**The agent needs the GitHub PAT to keep pushing during a session. Reminding mid-session adds noise that prompts the owner to revoke mid-session and breaks the workflow.**

- Remind the owner to revoke the PAT **once**, at the actual end of the session.
- Trigger phrases that count as "actual end": "call it a day", "we're done for now", "stop for the night", or equivalent.
- Do **not** remind after every commit.
- Do **not** remind if the session has already ended once and the owner is mid-task again in the same calendar day.

## Where to look first

1. `docs/DECISIONS.md` — every trade-off explained
2. `docs/HISTORY.md` — what came from previous versions (if any)
3. `docs/ARCHITECTURE.md` — data flow + deploy + integration flow
4. `docs/OPERATIONS.md` — env vars, secrets, debugging, common gotchas
5. `docs/AI-WORKFLOW.md` — when to install which AI-agent plugin (skip if your project doesn't use one)
6. `docs/HANDOFF.md` — the start-here brief from the previous session (read this if the repo has been quiet for a while)
7. `docs/PERMANENCE.md` — long-term survival plan (only for long-lived projects)
8. `docs/sessions/` — chronological log of recent changes
9. `CHANGELOG.md` — user-facing log