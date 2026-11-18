# Decision log

**Append-only.** Newest entry at the bottom. Each entry:

```
## YYYY-MM-DD — short title
- **Decision**:
- **Context**:
- **Alternatives rejected**:
- **Consequence**:
- **Cost to revisit**:
```

Capturing the rejected alternatives is what makes future agents work well — they don't have to
re-argue settled points.

---

## YYYY-MM-DD — adopt project-scaffold convention

- **Decision**: use this convention (`AGENTS.md`, `.opencode/`, `docs/sessions/`, `DECISIONS.md`, etc.).
- **Context**: first commit; no prior history.
- **Alternatives rejected**: relying on git messages only; decisions in code comments; README-only.
- **Consequence**: every change leaves a searchable record; sessions start with full context.
- **Cost to revisit**: if the project grows to multi-team scale, replace with ADRs (`docs/adr/0001-*.md`).
