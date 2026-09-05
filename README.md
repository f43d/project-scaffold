# project-scaffold

A starter kit for repos that follow a **documented, AI-friendly workflow**.

This isn't a framework — it's a **convention** plus one small Node script. Drop the structure into a new repo, customize `AGENTS.md` for your stack, and every working session automatically produces a written trail of decisions, ops notes, and per-day session logs.

## Layout

```
.
├── AGENTS.md                      # root context for AI agents (read first!)
├── CHANGELOG.md                   # user-facing
├── docs/
│   ├── ARCHITECTURE.md            # data + deploy + integration flow
│   ├── DECISIONS.md               # append-only design log
│   ├── HISTORY.md                 # notable history entries
│   ├── OPERATIONS.md              # day-2 ops, env vars, gotchas
│   ├── AI-WORKFLOW.md             # when to install which AI-agent plugin
│   ├── HANDOFF.md                 # start-here brief for the next session
│   ├── PERMANENCE.md              # long-term survival plan (optional, long-lived only)
│   ├── CODE-COMMENTS.md           # how to comment code for humans + AI agents
│   └── sessions/
│       └── YYYY-MM-DD-<slug>.md   # one per working day
├── scripts/
│   └── end-of-day.mjs             # `npm run end-of-day` snapshot tool
└── .github/
    └── ISSUE_TEMPLATE/
        ├── bug_report.md
        └── feature_request.md
```

## How to use this for a new project

### Path A — clone and strip

```bash
# Pick a target directory
git clone https://github.com/f43d/project-scaffold.git my-new-thing
cd my-new-thing
rm -rf .git
git init -b main
# Add your source code: src/, package.json, etc.
# Edit AGENTS.md to describe the new stack.
# First commit.
```

### Path B — use as a Github template

This repo will be marked as a [GitHub template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-template-repository) once the owner enables it. Then `Use this template` → done.

## How to retrofit an existing repo

```bash
cd path/to/your-existing-repo

# Pull the kit files
curl -L -o scripts/end-of-day.mjs https://raw.githubusercontent.com/f43d/project-scaffold/main/scripts/end-of-day.mjs

mkdir -p docs/sessions
echo "" > docs/DECISIONS.md
# (write initial headers as in this repo's docs/DECISIONS.md)

# Write an AGENTS.md based on this template's, customized for the project.

# Backfill: capture what's happened so far
echo "# 2024-... — initial backfill (no per-day logs yet)" > docs/sessions/2024-01-01-backfill.md
# Add a paragraph describing major historical events.
```

## The end-of-day routine

When the owner (or their AI agent) says **"call it a day"**:

1. The agent runs `npm run end-of-day` (or `node scripts/end-of-day.mjs` directly if no `package.json`).
2. The script outputs a JSON snapshot of what changed since the last session file, plus heuristic suggestions.
3. The agent drafts three updates: a session file, an optional DECISIONS entry, and an optional CHANGELOG entry.
4. The owner reviews / edits the drafts.
5. On confirmation, the agent writes the files, commits, and pushes.

Total elapsed time: **2–5 minutes**. See `docs/OPERATIONS.md` §"End-of-day routine" for the full protocol.

## License

MIT — copy, modify, redistribute.
