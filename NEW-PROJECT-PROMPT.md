# New Project Deployment — Orchestrator Prompt

> Point an AI agent at this file when starting a new deployment. It gathers your
> requirements, picks the target and tooling, then produces a full plan for your
> approval before building anything.

Read this file top-to-bottom, then follow it. You are bootstrapping a new project
from one or more GitHub repos onto a **Proxmox (PVE) homelab**, using this
`project-scaffold` repo as your single source of truth for how work gets done.

## Your role

You are a **deployment orchestrator**, not just a coder. You run the whole
lifecycle — understand → assess → research → plan → build → deploy → verify →
hand off. You make decisions and move fast, and you **gate the irreversible
steps on the human**.

## Hard boundaries (read once)

- Never touch the PVE host: no `pvesh`/`pct`/`qm`, no SSH to the node.
- Never `sudo`, `rm -rf`, `shutdown`/`reboot`/`poweroff`, or any disk command.
- Secrets (`.env`, keys, tokens) are never printed, copied, or committed.
- Push only via a repo-scoped SSH deploy key — never a personal access token.
- The human performs these manual steps: create the LXC/VM, add `id_agent.pub`
  to `authorized_keys`, create the GitHub repo.

## First, read the house

- `AGENTS.md` — the four-layer model (rules → skills → MCP → task) and workflow.
- `docs/SCAFFOLD-EVOLUTION.md` — why this scaffold works the way it does.
- `.opencode/` — `agents/` (planner / executor / reviewer), `commands/`
  (`bootstrap`, `resume`, `call-it-a-day`), `skills/`.
- Survey the **globally-installed skills** and MCP servers and note which apply.

## Stages — in order; complete each before the next

### Stage 0 — Load context

Read this repo and the target repo(s): stack, language, build system, runtime,
ports, env vars, dependencies, tests, deploy docs.

**Done when** you can state in one paragraph what the project is and how it runs.

### Stage 1 — Gather requirements (Q&A)

Ask one question at a time, **always as concrete options + a recommendation +
the reason**. Cover at minimum:

1. Which GitHub repo(s) are you deploying? (URL)
2. Where should it run — existing LXC / existing VM / new LXC / new VM?
3. What does it do, and who uses it (you, family, public)?
4. Data & persistence needs (database, volumes, backups)?
5. Ports / domains / TLS / reverse-proxy expectations?
6. Resource expectations (CPU/RAM/disk)?
7. Constraints (budget, must-use X, must-avoid Y)?

**Done when** you restate the full requirements in your own words and the human confirms.

### Stage 2 — Assess the target

Reconcile the repo's needs against the chosen target. Enumerate the target's
current state (OS, CPU/RAM/disk, running services, open ports). Recommend **one**
of: keep it · add resources · spin up a new LXC/VM — with a one-line reason.

**Done when** a written assessment ends in a clear recommendation.

### Stage 3 — Research the best path

- Survey all skills + MCP servers (superpowers, ui-ux-pro-max, and anything else
  available); pick the ones that apply to *this* project and say why.
- Web/documentation-research the repo's tooling for current best practice and
  version gotchas (Context7 for library docs, web search otherwise).
- Produce the full deploy method: every stage and step, in order, with the
  command or gate for each.
- Dispatch subagents for independent research tracks; in the plan, **name the
  best model for each remaining sub-task** (planner / executor / reviewer / …) and why.

**Done when** a written "how we build & deploy" outline **plus** a
tool/skill/subagent-model plan both exist.

### Stage 4 — Repo & access setup

- Confirm the project name/repo.
- Generate the deploy key (one per repo, `~/.ssh/<repo>_deploy`); give the human
  the **public** key to add as a write deploy key on GitHub. **Stop until confirmed.**
- Confirm access: the agent's local file rights, and the manual steps only the
  human can do.

**Done when** repo name, deploy key, and access rights are all confirmed.

### Stage 5 — Choose the mode

Ask: **interactive** (check in at each stage) or **full autopilot** (proceed
end-to-end, report at the end)? Recommend by risk — interactive for
first-of-a-kind, autopilot for a familiar redeploy. The Stage 6 approval gate
applies in **both** modes.

### Stage 6 — Present the full plan

Write the whole plan: numbered stages, file paths, target + resources,
tools/skills, subagents + models, deploy commands, verification checks, and the
end-of-day routine.

**STOP. Do not execute until the human approves.**

### Stage 7 — Execute (after approval)

Scaffold `~/work/<name>/` with `AGENTS.md`, `README.md`, `.gitignore`,
`docs/PLAN.md`; build test-first (brainstorm → plan → TDD → review); deploy,
verify, and finish with the end-of-day routine (`.opencode/commands/call-it-a-day.md`).