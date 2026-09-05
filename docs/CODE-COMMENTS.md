# Code comments — writing for both humans and AI agents

A project that follows this scaffold may outlive its author. The reader
of this code could be:

- a family member with no prior context,
- a future AI session that has never seen this repo,
- the original author, six months later, with no memory of the chat.

Comments are the only thing that survives from the design conversation.
Write them so any of those three readers can understand **what** the
code does and **why** it is that way.

## The rule of thumb

> A block comment that explains *why* a decision was made beats five
> inline comments that restate the code.

Inline comments that restate the code (`// add 1 to i`) rot and add
noise. Block comments that capture intent survive.

## What to comment

**Every file** should start with a 1–4 line header answering:

1. **What is this file / component / function for?**
2. **Who / what consumes it?** (which page imports it, which data file it reads)
3. **Any non-obvious constraint** (ordering rules, a CSS gotcha, a rejected alternative).

**Every section** of a large file (a CSS stylesheet, a long script)
should have a `/* === Name === */` or `// ─── Name ───` divider that
says what the block is for.

**Every non-obvious line or block** — especially:

- CSS tricks with a "why" (e.g. `closest-side` in a radial-gradient
  mask, a `!important`, a source-order-dependent media query).
- A workaround for a browser bug (note *which* browser, *what* it
  does wrong, and ideally the version/date it was last confirmed).
- A parser / serialiser quirk (e.g. "older rows have 4 columns; extra
  fields merge into the last — don't break this").
- A value that looks arbitrary (a clamp range, an opacity) — give the
  visual intent so a future tuner knows which direction to nudge.

**Decisions that changed the shape of the code** — put the full
rationale in `docs/DECISIONS.md`, then a one-line pointer in the code
comment (`/* see DECISIONS.md 2026-08-31 */`) so the story is one hop
away.

## What NOT to comment

- Code that is self-evident (`// increment the counter` above
  `i += 1`).
- Obvious HTML structure in a `.astro` file — the markup reads itself.
- Restating what a variable is named (`// the user's email`).

## When a future session finds unexplained code

If you (human or AI) are reading code that has no comment and you
cannot tell why it is structured this way:

1. **Add the comment** — a one-liner capturing what you deduced, so
   the next reader has a starting point. This is expected behaviour,
   not a violation.
2. If you *still* can't tell why after looking at the surrounding
   code + git history, leave a `TODO(why):` note rather than silently
   refactoring away the mystery.

## A worked example (from love-list-astro)

The hero photo feather (the round photo blending into the wallpaper)
ended up as a CSS `radial-gradient` mask. The comment carries the whole
story:

```css
/* Feather: a radial-gradient mask fades the circular edge to fully
   transparent. `circle closest-side` makes the gradient's 100% point
   land exactly on the border-radius circle's edge (the square's
   nearest side). Without closest-side the gradient defaults to
   farthest-corner, pushing the transparent zone outside the visible
   circle — no feather, hard edge.
   50% → 100% = the outer half of the radius fades out. Raise the
   stop toward ~70% for a thinner feather, lower toward ~35% for a
   wider one. */
```

Why this comment works:

- It names the *trap* (`farthest-corner`) that caused a real bug, so
  nobody re-introduces it.
- It explains how to *tune* it (`raise the stop…`), so a future
  maintainer changes one number instead of reverse-engineering CSS
  gradients.
- It reads like a paragraph, not like machine notes.

## Applying this to a new project

During the initial build and on every subsequent session, check:

1. Every new file has a header comment (what / who / constraints).
2. Every section in a long file has a divider.
3. Every CSS value with visual intent is annotated.
4. Every browser-workaround names the browser.
5. When you end a session, scan the diff for files that lost comments
   or that gained logic without a comment — the end-of-day routine
   (see `docs/OPERATIONS.md`) is a natural moment to backfill.

---

_Last updated: 2026-09-05._