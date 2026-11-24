---
description: Orchestrate a new project deployment onto the PVE homelab
---

Read and follow **`NEW-PROJECT-PROMPT.md`** in this repository (it sits next to
`AGENTS.md`). If the file is not in the current workspace, fetch it first:

```bash
curl -fsSL https://raw.githubusercontent.com/f43d/project-scaffold/main/NEW-PROJECT-PROMPT.md
```

(or `git clone git@github-project-scaffold:f43d/project-scaffold.git`).

Then follow `NEW-PROJECT-PROMPT.md` exactly — it runs the full deploy lifecycle
(gather requirements → assess target → research tooling → set up deploy key →
pick mode → present the plan) and **gates execution on the human's approval**.