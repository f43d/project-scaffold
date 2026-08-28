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
> - AI-authored commits get `Co-authored-by: opencode <noreply@opencode>` (or your agent's tag) in the trailer.
> - When making a non-trivial decision, append to `docs/DECISIONS.md`. State the **decision**, **context**, **alternatives rejected**, **consequence**.
> - When finishing a session of work, run `npm run end-of-day` (or your package's equivalent). The agent must produce draft updates, get your approval, then commit + push.

## Things to never do (without explicit ask)

> _Project-specific guardrails._
> - Don't add a runtime backend without an explicit request.
> - Don't commit secrets — `.env` is gitignored. Use the project's secret store.
> - Don't add analytics / trackers unless asked.
> - Don't enable dark mode by default unless that's the design.
> - Don't switch off the historical &lt;design palette name&gt; palette defined in `docs/DECISIONS.md`.

## Where to look first

1. `docs/DECISIONS.md` — every trade-off explained
2. `docs/HISTORY.md` — what came from previous versions (if any)
3. `docs/ARCHITECTURE.md` — data flow + deploy + integration flow
4. `docs/OPERATIONS.md` — env vars, secrets, debugging, common gotchas
5. `docs/sessions/` — chronological log of recent changes
6. `CHANGELOG.md` — user-facing log
