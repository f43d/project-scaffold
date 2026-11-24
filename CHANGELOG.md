# Changelog

All notable changes to this scaffold. Format: newest first, one line unless context is needed.

## [v2.1.0] — 2026-11-24

New-project deployment orchestration.

- **Added** `NEW-PROJECT-PROMPT.md` — an 8-stage orchestrator prompt that gathers requirements,
  assesses the deploy target, researches tooling/skills, sets up the deploy key, and gates a full
  plan on human approval.
- **Added** `.opencode/commands/new-project.md` — `/new-project` command backing the prompt.
- **Changed** `README.md` to document the prompt + command and the "deploy a repo to PVE" flow.

## [v2.0.0] — 2026-11-18

Four-layer model (rules → skills → MCP → task), native opencode mechanics, Python-first tooling.

- **Added** `.opencode/` with `/resume`, `/bootstrap`, `/call-it-a-day` commands; `planner`/`executor`/`reviewer` subagents; `review-change` skill.
- **Added** `opencode.jsonc` (instructions + experimental todo).
- **Added** four-layer model + routing checklist to `AGENTS.md`; proactive check-in rule.
- **Changed** `end-of-day` from Node (`.mjs` + `package.json`) to Python stdlib (`scripts/end-of-day.py`).
- **Changed** `HANDOFF.md` to current-state-only (de-duplicated from `AGENTS.md`).
- **Changed** `AI-WORKFLOW.md` from static-site plugin advice to model-tiering notes.
- **Changed** Python-oriented examples throughout; `PERMANENCE.md` marked optional.
- **Removed** `package.json`, `scripts/end-of-day.mjs`.

Full reasoning: `docs/SCAFFOLD-EVOLUTION.md`.

## [v1.0.0] — 2026 (initial)

Docs convention (AGENTS/DECISIONS/OPERATIONS/HANDOFF + sessions) + `end-of-day.mjs` + `push-with-pat.sh`.
