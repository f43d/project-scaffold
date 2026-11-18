---
description: Scan the repo and generate or refresh AGENTS.md from real evidence
---
Examine the repository and (re)generate `AGENTS.md` from evidence, not guesses.

Inspect: `README.md`, package/build manifests (`pyproject.toml`, `requirements*.txt`,
`package.json`, `Cargo.toml`, `go.mod`), entry points, source layout, shared types/schemas,
authorization or role checks, and any existing docs.

Produce/update `AGENTS.md` to include, exactly:
- **What this project is** (2–4 sentences)
- **Stack** (languages, frameworks, constraints)
- **Build / dev / test** canonical commands, verbatim
- **Conventions** (naming, layout, secrets, commit style)

Keep the four-layer model + end-of-day + "things to never do" sections intact.
Show the diff of what changed and wait for approval before overwriting.
