# AI Tooling — owner notes (personal, not project rules)

Notes on which models / agents / plugins are worth using, so future-me doesn't re-derive the
choice. **This is opinion, not convention** — `AGENTS.md` is the authority for rules.

## Models I can use (balanced cost/quality)

- **Cheap / text-only** (DeepSeek flash and other local/CN models): default for quick work,
  but **no image input** — vision/video features are unavailable.
- **Vision-capable** (Gemini, Grok): use for anything needing images or video understanding.
- **Top-tier** (Claude/GPT, limited access): reserve for hard reasoning / big refactors.

### Consequence for video
The `watch` skill's **local** engine extracts frames + transcript. A text-only model can only use
the *transcript*, not the frames. For real "watch the video" understanding, set up a Gemini key
(`watch` → `--engine gemini`) or run with a vision-capable model.

## Subagents (built-in)

- `.opencode/agents/` defines reusable subagents (planner / executor / reviewer).
- Use them to isolate context and parallelize: research/explore, independent reviews, long
  fetches. Don't use them for a 5-file read — spawning costs more than reading.

## Plugins (as needed, then remove)

> _Record verdicts like the old AI-WORKFLOW.md. For example:_
> - `obra/superpowers` — TDD discipline; worth it for big codebases, overkill for small scripts.
> - `oh-my-opencode-slim` — multi-agent parallelism for one-shot refactors, then uninstall.

## When to re-read

Before a new big project, or if a promising new model/plugin appears.
