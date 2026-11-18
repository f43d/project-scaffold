# Code comments — writing for humans and AI agents

The reader may be: a family member with no context, a future AI session that has never seen this
repo, or you, six months later. Comments are what survives the design conversation.

## Rule of thumb

> A block comment explaining **why** beats five inline comments restating the code.

Inline comments that restate (`# add 1 to i`) rot. Comments capturing intent survive.

## What to comment

- **File header** (1–4 lines): what is this file for, who/what consumes it, any non-obvious
  constraint.
- **Non-obvious lines**: a workaround for a bug (name the tool/browser + version), a parser quirk
  ("older rows have 4 columns; extras merge into the last — don't break this"), a value that looks
  arbitrary (give the intent so a tuner knows which way to nudge).
- **Decisions that changed the shape of the code**: full rationale in `docs/DECISIONS.md`, plus a
  one-line pointer (`# see DECISIONS.md 2026-08-31`).

Example (Python):
```python
# Fallback to the system clock when the API returns no timestamp. The API
# omits the field for cached rows (pre-2024), so we can't treat a missing
# value as an error — see DECISIONS.md 2024-02-11.
stamp = row.get("ts") or time.time()
```

## What NOT to comment

- Self-evident code (`i += 1  # increment the counter`).
- Restating a variable name (`# the user's email`).

## When you find unexplained code

1. **Add the comment** (what you deduced), so the next reader has a starting point.
2. If you still can't tell why, leave `# TODO(why):` rather than silently refactoring it away.

## Checklist (each session, especially at end-of-day)

1. Every new file has a header comment.
2. Non-obvious lines are annotated with the *why*.
3. Scan the diff for files that gained logic or lost a comment — backfill while the why is fresh.
