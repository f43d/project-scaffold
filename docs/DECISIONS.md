# Decision log

**Append-only.** Newest entry at the bottom. Each entry has:

```
## YYYY-MM-DD — short title
- **Decision**:
- **Context**:
- **Alternatives rejected**:
- **Consequence**:
- **Cost to revisit**:
```

Capturing the rejected alternatives is what makes future agents work well — they don't have to re-argue settled points.

---

<!-- Newest entry at the bottom -->

## YYYY-MM-DD — _sample first entry_

- **Decision**: use the project-scaffold convention (this file, `docs/sessions/`, `AGENTS.md`, etc.) for &lt;your project&gt;.
- **Context**: this is the first commit; no prior history.
- **Alternatives rejected**: relying on git commit messages only, encoding decisions in code comments, or describing the project only in README.
- **Consequence**: every change leaves a searchable record; every AI session starts with full context.
- **Cost to revisit**: if the project grows to multi-team scale, replace this file with proper ADRs (`docs/adr/0001-*.md` etc.).
