# AGENTS.md — Project context for AI agents (and humans)

> **AI agent: read this whole file before doing anything.** It is the single source of truth
> for *how this project works*. `docs/HANDOFF.md` is the *current state*; do not repeat the
> conventions below there.

## The mental model (four layers)

Don't write one giant prompt. Split every request into the smallest layer that solves it:

| Layer | Where it lives | When to use |
|---|---|---|
| **Rules** | `AGENTS.md` (this file) | A permanent fact about the project: commands, conventions, types, "definition of done" |
| **Skills** | `.opencode/skills/<id>/SKILL.md` | A workflow you'll repeat more than once, exactly the same way |
| **MCP** | `opencode.jsonc` → `mcp.servers` | External context/action the source code alone can't prove (browser, a data API) |
| **Task prompt** | your chat message | The *only* thing that should change per request |

**Routing checklist** — when unsure where something goes:
1. Permanent project rule? → `AGENTS.md`
2. Will I repeat this workflow exactly? → make it a **skill**
3. Needs external context/action? → wire it as **MCP**
4. Something failed and unclear why? → **diagnose before rewriting**
5. Otherwise → keep it in the task prompt. Prefer the *smallest* layer.

If you catch yourself cramming rules + test commands + tool access + the task into one prompt,
step back and split it into layers.

## What this project is

> _Replace: 2–4 sentences. What is it, who is it for, where does it live (repo URL)?_

## Stack — do not deviate without updating `docs/DECISIONS.md`

> _List languages/frameworks/constraints. Example (Python tooling):_
> - **Language**: Python 3.13, stdlib-only where possible (no pip unless justified)
> - **Data**: fetched via a CLI / API wrapper; scripts live in `scripts/`
> - **Output**: `output/` is generated (gitignored)
> - **Forbidden**: anything not listed here without a `DECISIONS.md` entry

## Build / dev / test (canonical commands)

> _Read these out of the project's real tooling. The agent must run them, not guess._

```bash
# install / run / test / lint / typecheck — whatever this project has
```

## Roles (for anything non-trivial)

Use `.opencode/agents/` when a task is big enough to separate concerns:

- **planner** — examines the code, returns a complete plan (API, UI, auth, test coverage, proof)
  and is **forbidden from editing**. Wait for human approval.
- **executor** — implements *only* the approved plan, following `AGENTS.md` + existing patterns.
- **reviewer** — reports concrete defects + missing tests with file references. **Report only, no edits.**

## Conventions

> _Codify rules so an agent can apply them without asking. e.g.:_
> - File naming: `snake_case.py`; scripts are single-purpose CLI tools in `scripts/`.
> - Every script has a `--help`-style docstring + `if __name__ == "__main__":`.
> - Secrets live in env vars / a gitignored file; never in the repo.
> - Commit messages: `<type>(<scope>): <summary>` (e.g. `fix(dividends): …`).
> - AI-authored commits carry `Co-authored-by: opencode <noreply@opencode>`.
> - Comment the **why** on non-obvious lines — see `docs/CODE-COMMENTS.md`.

## Proactive check-in (important)

**Before making a non-trivial change** (new feature, refactor, dependency add, deleting a doc,
changing a convention), pause and **tell the user what you're about to do and why**, and wait
for a go-ahead unless they already approved it. Do not surprise them with big changes.
A non-trivial decision also gets an entry in `docs/DECISIONS.md`.

## End-of-day routine ("call it a day")

When the user says **"call it a day"** (or "wrap up", "we're done for now"), run the
`/call-it-a-day` command (or `python3 scripts/end-of-day.py` directly). It:
1. Snapshots what changed since the last session file.
2. Drafts three updates: `docs/sessions/<today>.md`, an optional `docs/DECISIONS.md` entry,
   an optional `CHANGELOG.md` entry.
3. **Shows the drafts and waits for approval before writing.**
4. On approval, writes, commits (`docs(session): end-of-day <date>`), and pushes.

Full protocol: `docs/OPERATIONS.md` §"End-of-day routine".

## Things to never do (without explicit ask)

> _Project guardrails. e.g.:_
> - Don't commit secrets or `.env` files.
> - Don't add a dependency without a `DECISIONS.md` entry.
> - Don't strip explanatory comments during a refactor — fix them if wrong, don't delete the *why*.
> - Don't run commands that modify the system (installs, deletes) without asking first.

## Where to look first

0. `docs/SCAFFOLD-EVOLUTION.md` — why this scaffold looks the way it does (read before refining it)
1. `docs/HANDOFF.md` — current state + open items (start here if the repo has been quiet)
2. `docs/DECISIONS.md` — every trade-off, with rejected alternatives
3. `docs/ARCHITECTURE.md` — data / deploy / integration flow
4. `docs/OPERATIONS.md` — env vars, secrets, gotchas, end-of-day protocol
5. `docs/HISTORY.md` — notable past versions
6. `docs/AI-WORKFLOW.md` — owner notes on agents/plugins/LLMs (personal, not rules)
7. `docs/sessions/` — chronological per-day log (latest = most recent)
8. `CHANGELOG.md` — user-facing log
