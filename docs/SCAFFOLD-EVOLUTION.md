# Scaffold Evolution — v1 → v2

> **Purpose.** This file is the memory of *why* this template looks the way it does.
> It is written for two readers: a **human** who hasn't touched the project in months,
> and a **future AI agent** starting a fresh session. Before you refine this scaffold
> again (a v3, v4, …), read this first so you don't re-argue a settled decision or
> silently undo a fix that had a reason.
>
> Rule of thumb: **append, don't rewrite.** Add a new "v3" section below; keep the
> earlier sections as history.

---

## Version overview

| Version | Date | What it was |
|---|---|---|
| v1 | 2026 (initial) | "Documented, AI-friendly convention" — a docs convention + one Node script (`end-of-day.mjs`) + a PAT-based push helper. No `.opencode/` mechanics. |
| **v2** | 2026-11 | Added native opencode mechanics (commands / agents / skills / `opencode.jsonc`), the four-layer model, planner-executor-reviewer roles, Python-first tooling, and a proactive-check-in rule. Documented in this file. |

---

## The core idea: the four-layer model

Adopted from the opencode tutorial *"OpenCode Tutorial for Beginners: Master Rules, Skills & MCP"* by **James NoCode** (youtube `tQM6qoB9P0k`, ~20 min). Its thesis: the **"giant prompt" anti-pattern** — re-pasting rules + test commands + tool access + the task into every single request — is fragile and must be re-typed each time.

Instead, decompose every request into **four layers**, where only one changes per request:

| Layer | Where | When |
|---|---|---|
| **Rules** | `AGENTS.md` | a permanent fact about the project (commands, conventions, types, definition of done) |
| **Skills** | `.opencode/skills/<id>/SKILL.md` | a workflow you repeat more than once, exactly the same way |
| **MCP** | `opencode.jsonc` → `mcp.servers` | external context/action the source code can't prove (browser, a data API) |
| **Task** | your chat message | the only thing that changes per request |

This is now the top section of `AGENTS.md`, along with a **routing checklist** and an
**anti-pattern guard** ("if you catch yourself cramming everything into one prompt, split it").

---

## What changed v1 → v2 (and why)

### 1. Added `.opencode/` native mechanics (the biggest change)

- **What:** new `.opencode/commands/`, `.opencode/agents/`, `.opencode/skills/`, plus a root `opencode.jsonc`.
- **Why:** v1 was a *docs convention* only — it relied on an agent reading `AGENTS.md` and remembering to do the right thing. In practice (seen in the `futu-skill` project) the routine was **silently not followed** because nothing triggered it. Native opencode files make the behavior **discoverable and executable**:
  - `/resume` → read the context in order and summarize in ≤10 lines (fixes slow session starts).
  - `/bootstrap` → scan the repo and (re)generate `AGENTS.md` from evidence (the video's "step 1").
  - `/call-it-a-day` → the end-of-day routine as a real command, not prose.
- **Source:** opencode docs (`/rules`, `/commands`, `/agents`, `/skills`), plus the real-world failure in `futu-skill`.

### 2. End-of-day: Node → Python

- **What:** `scripts/end-of-day.mjs` + `package.json` (Node) replaced by `scripts/end-of-day.py` (Python stdlib only), `package.json` removed.
- **Why:** the target projects are **Python data/agent tooling** (e.g. `futu-skill`), which run Python with **no pip and no Node on the default PATH**. A Node dependency meant `npm run end-of-day` couldn't run there. Stdlib Python has zero deps.
- **Rejected alternative:** keep `.mjs` and require Node. Rejected because it added a runtime the projects don't otherwise need.

### 3. End-of-day became a slash command, not prose

- **What:** `/call-it-a-day` command; `AGENTS.md` + `OPERATIONS.md` reference it.
- **Why:** the v1 routine lived in four places (`README`, `OPERATIONS.md`, `AGENTS.md`, `HANDOFF.md`) and depended on the agent remembering it. A command is one place, discoverable, and runs the snapshot script automatically.
- **Kept intact from v1:** the "**show drafts first, wait for approval, then commit**" discipline — this is the single best rule in v1 and is unchanged.

### 4. `HANDOFF.md` de-duplicated

- **What:** v1's `HANDOFF.md` repeated the stack, conventions, end-of-day protocol, and "never do" list — all of which also lived in `AGENTS.md`. v2's `HANDOFF.md` is **current-state only** (what works / open items / waiting on user / don't-do-next).
- **Why:** the two files drifted in the real project (`futu-skill`'s `AGENTS.md` and `HANDOFF.md` already described the routine differently). Single source of truth: `AGENTS.md` = conventions; `HANDOFF.md` = state.

### 5. Planner / executor / reviewer subagents

- **What:** `.opencode/agents/{planner,executor,reviewer}.md`, each `mode: subagent`.
- **Why:** the video's key workflow — split one feature into three roles: **planner** (returns a plan, forbidden from editing), **executor** (implements only the approved plan), **reviewer** (report-only). Encodes "plan first, human approves, then touch files."

### 6. `review-change` skill

- **What:** `.opencode/skills/review-change/SKILL.md` — reviews a diff, reports defects + missing tests, **never edits**.
- **Why:** the video's "repeat this review every time" workflow, turned into a reusable skill (layer 2 of the model).

### 7. Proactive check-in rule (new)

- **What:** "Before a non-trivial change, tell the user what you're about to do and why, and wait for a go-ahead."
- **Why:** the user explicitly asked for this — they want the agent to **prompt before major changes**, not only at session end. Lives in `AGENTS.md` + `OPERATIONS.md`.

### 8. `opencode.jsonc` added

- **What:** `instructions: ["docs/DECISIONS.md", "docs/OPERATIONS.md"]` + `experimental.todo: true`.
- **Why:** loads the decision log and ops guide into every session, after `AGENTS.md`; enables the built-in todo list for multi-step work.

### 9. Corrected opencode field names

- **What:** use `.opencode/agents/` (plural), `.opencode/commands/` (plural preferred), and `mode: subagent` + `description`. **Do not** use the deprecated V1 fields `tools` / `allowed-tools` / `permission` / `task` / `bash` — V2 uses `permissions`, `shell`, `subagent`.
- **Why:** the opencode docs (`/permissions`) explicitly warn V1 field names are deprecated. The v1 scaffold had none of these, but this documents the trap for future edits.
- **Source:** opencode `/agents`, `/commands`, `/permissions` docs.

### 10. Python-oriented examples throughout

- **What:** `CODE-COMMENTS.md` uses a Python example; `.gitignore` is Python-first; `OPERATIONS.md`/`AGENTS.md` example stack is Python tooling.
- **Why:** the scaffold targets Python data/agent tooling (per user). v1's examples were Astro/static-site oriented.

### 11. `AI-WORKFLOW.md` refocused on models, not static-site plugins

- **What:** v1 recommended `obra/superpowers` / `oh-my-opencode-slim` for static sites. v2 replaces that with **model-tiering notes**: cheap text-only models (DeepSeek flash — no image input) vs vision-capable (Gemini/Grok) vs top-tier (Claude/GPT), and the consequence for the `watch`/video skill.
- **Why:** the user runs a **mix** (Chinese LLMs, Grok, Gemini; limited Claude/OpenAI) and wants balanced cost. The old plugin advice was time-stamped and static-site-specific.

### 12. `PERMANENCE.md` marked optional

- **What:** kept (user chose "full doc set") but header now says **OPTIONAL — delete unless the project must outlive its author**.
- **Why:** user wants the full set available, but not every project needs successor planning.

### 13. Docs kept (user chose "full set")

All nine docs retained: `AGENTS`, `HANDOFF`, `DECISIONS`, `OPERATIONS`, `ARCHITECTURE`, `HISTORY`, `PERMANENCE`, `CODE-COMMENTS`, `AI-WORKFLOW`, plus `sessions/`. Earlier I'd proposed trimming to a "core six", but the user opted for the full set — so trimming was **rejected**.

---

## Decisions (with alternatives rejected)

| Decision | Chosen | Rejected |
|---|---|---|
| End-of-day runtime | Python stdlib | Node (`npm run end-of-day`) |
| Git auth | repo-scoped SSH **deploy key** (one per repo) | PAT in chat / `.git/config` |
| `HANDOFF.md` role | current state only | duplicate of `AGENTS.md` |
| Routine trigger | `/call-it-a-day` command (manual) | auto-detected at session end (agent forgot) |
| Subagent fields | `mode: subagent` + `description` + `permissions` | deprecated `tools`/`allowed-tools` |
| Doc set size | full set + optional PERMANENCE | trimmed core six |
| Check-in behavior | agent prompts before major changes | only at end-of-day |

## Environment assumptions baked into the workflow

- opencode runs in an **LXC** (control plane, e.g. `192.168.1.95`), **one project per LXC**.
- opencode **cannot** reach the PVE host; it deploys by SSHing into other LXCs/VMs (e.g. `.96`, `.97`) using its `id_agent` identity, after the user manually creates the target and adds the public key.
- Each project is **backed up to GitHub** and pushed via a **per-repo deploy key** (`core.sshCommand … IdentitiesOnly=yes`), never a PAT.
- `scripts/push-with-pat.sh` is still shipped as a **fallback** for remotes where a deploy key isn't possible (e.g. a non-GitHub remote). Deploy keys are the primary method; the PAT helper is kept only for those edge cases, not as the recommended path.
- **`rm -rf` is denied by the global policy**, so the scaffold's own instructions and commands must use `rm -r <specific>` (e.g. `rm -r .git`), never `rm -rf`. Applied to `README.md` and the global `/new-project` command on 2026-11-18.

---

## Open questions / candidates for v3

1. **`.opencode/commands/` (plural) vs `command/` (singular)** — docs call singular "legacy". Confirm which the installed opencode build actually loads; rename if needed.
2. **MCP template** — add commented `mcp.servers` examples (browser, data APIs) to `opencode.jsonc`.
3. **`/new-project` command** — ✅ done 2026-11-18, as a **global** command at `~/.config/opencode/commands/new-project.md` (host-specific paths/org, so kept global rather than in the scaffold). A portable version could still be added here later.
4. **Global guardrails** — ✅ done 2026-11-18: `~/.config/opencode/AGENTS.md` + a `policies` deny block in `opencode.jsonc` (deny `sudo`, `rm -rf`, `shutdown`/`reboot`/`poweroff`/`halt`, `pvesh`/`pct`/`qm`, `mkfs`, `dd`).
5. **Per-stack variants** — if non-Python projects appear, factor the Python-specific bits into an optional overlay rather than a second scaffold.
6. **`scripts/end-of-day.py` heuristics** — the file-path heuristics (which files count as "user-visible" / "decision") are currently generic; tune them to Python layouts.

---

## Sources

- Video: *"OpenCode Tutorial for Beginners: Master Rules, Skills & MCP (In 20 Minutes)"*, James NoCode — youtube `tQM6qoB9P0k`.
- opencode docs: `/rules` (AGENTS.md), `/agents`, `/commands`, `/skills`, `/permissions`, `/config`.
- v1 scaffold (`f43d/project-scaffold` commit history) + the v1 review notes.
- User requirements (2026-11-18): Python data/agent tooling; beginner; balanced cost; full doc set; optional PERMANENCE; prompt-before-major-changes.
