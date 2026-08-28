# Sessions log

This directory holds one Markdown file per working day. Format: `YYYY-MM-DD[-<slug>].md`.

The `scripts/end-of-day.mjs` script auto-detects the most recent session file and computes the diff range for you, then suggests whether to **append** (same day) or **create** (later).

```bash
npm run end-of-day --silent          # JSON snapshot
npm run end-of-day:md --silent       # Markdown rendering
```

See `docs/OPERATIONS.md` §"End-of-day routine" for the full workflow.
