# Sessions log

One Markdown file per working day: `YYYY-MM-DD[-<slug>].md`.

`scripts/end-of-day.py` auto-detects the most recent session file and computes the diff range,
then suggests whether to **append** (same day) or **create** (later day).

```bash
python3 scripts/end-of-day.py              # JSON snapshot
python3 scripts/end-of-day.py --markdown   # markdown rendering
```

See `docs/OPERATIONS.md` §"End-of-day routine" for the full workflow.
