# project-scaffold (v2)

A starter kit for repos that follow a **documented, AI-friendly workflow**, built around the
**four-layer model** for the opencode AI tool: **rules (`AGENTS.md`) → skills → MCP → task prompt**.

Drop this structure into a new repo, customize `AGENTS.md` for your stack, and every session
automatically produces a written trail of decisions, ops notes, and per-day session logs.

## Layout

```
.
├── AGENTS.md                      # root context for AI agents (single source of conventions)
├── CHANGELOG.md                   # user-facing log
├── README.md
├── opencode.jsonc                 # instructions array + experimental todo
├── .opencode/
│   ├── commands/                  # slash commands: /resume /bootstrap /call-it-a-day
│   ├── agents/                    # subagents: planner / executor / reviewer
│   └── skills/review-change/      # canonical repeatable review workflow
├── scripts/
│   ├── end-of-day.py              # snapshot + heuristics for the end-of-day routine
│   └── push-with-pat.sh           # safe push without leaking a PAT
└── docs/
    ├── HANDOFF.md                 # current state + open items (start-here)
    ├── DECISIONS.md               # append-only design log (with rejected alternatives)
    ├── OPERATIONS.md              # day-2 ops, env vars, gotchas, end-of-day protocol
    ├── ARCHITECTURE.md            # data + deploy + integration flow
    ├── HISTORY.md                 # notable version history
    ├── PERMANENCE.md              # OPTIONAL — long-term survival / successor plan
    ├── CODE-COMMENTS.md           # how to comment for humans + AI agents
    ├── AI-WORKFLOW.md             # owner's notes on agents/plugins/LLMs
    └── sessions/                  # one markdown file per working day
```

## Adopt for a new project

```bash
git clone https://github.com/<owner>/project-scaffold.git my-new-thing
cd my-new-thing
rm -r .git && git init -b main
# add your source; edit AGENTS.md for the stack
# then run the /bootstrap command to auto-fill AGENTS.md from your repo
git add -A && git commit -m "chore: scaffold"
```

## Retrofit an existing repo

```bash
cd path/to/existing-repo
# copy in AGENTS.md, opencode.jsonc, .opencode/, scripts/, docs/
# write an initial docs/DECISIONS.md header
# backfill: echo "# YYYY-MM-DD — initial backfill" > docs/sessions/YYYY-MM-DD-backfill.md
```

## The end-of-day routine

When you (or your agent) say **"call it a day"**, the agent runs `/call-it-a-day`
(`python3 scripts/end-of-day.py`), drafts a session log + optional DECISIONS/CHANGELOG
entries, **shows you the drafts, waits for approval**, then commits and pushes.
Total: **2–5 minutes**. See `docs/OPERATIONS.md` §"End-of-day routine".

## The four-layer model (tl;dr)

| Layer | Where | When |
|---|---|---|
| Rules | `AGENTS.md` | permanent project facts |
| Skills | `.opencode/skills/` | a workflow repeated exactly |
| MCP | `opencode.jsonc` | external context/action |
| Task | your message | the only thing that changes per request |

## History & reasoning

Why this scaffold looks the way it does, and what changed from v1 → v2 (with the rejected
alternatives and sources) is documented in **`docs/SCAFFOLD-EVOLUTION.md`** — read it before
refining the template again.

## License

MIT — copy, modify, redistribute.
