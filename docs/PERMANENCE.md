# Permanence Plan

> **Optional file** — only create this if your project needs to outlive
> the original author or survive long-term (years) without ongoing
> maintenance. For short-lived projects, skip this file.
>
> This template is generic. Copy the sections that apply, fill in the
> owner-specific details, **remove the sections that don't**.

This site / project is _<describe the purpose — e.g. "a 60th-birthday gift", "a long-running open-source tool">_. It is intended
to remain accessible / functional for as long as the underlying
services exist — ideally for decades. This document is written so that
anyone — including future-you — can keep it running without prior
knowledge.

If you're reading this and the original owner is no longer available,
you are welcome to maintain, archive, or migrate this project. The
licence (MIT by default) explicitly allows this.

## Open action items (read these first)

These are the loose ends identified when this doc was filled in. List
them at the top so they don't get lost in the longer narrative below.

1. _<action item, with date if known>_ — _<one-line description>_.
2. _<action item>_ — _<description>_.
3. _<action item>_ — _<description>_.

## Where the project lives

| Piece | Where |
| --- | --- |
| Live URL | _<if applicable>_ |
| Source code (GitHub) | https://github.com/&lt;owner&gt;/&lt;repo&gt; |
| Source code (fallback URL) | _<e.g. GitHub Pages default URL, Netlify fallback>_ |
| Static build output | `dist/` directory in the repo — fully self-contained, deployable to any static host |
| Backups | _<external backup location, e.g. external drive, second cloud provider>_ |

## Service ownership (fill in per service the project depends on)

| Service | Role | Account / renewal date |
| --- | --- | --- |
| _<e.g. Cloudflare>_ | _<DNS, registrar, etc.>_ | _<renewal date, payment method on file>_ |
| _<e.g. GitHub>_ | _<hosting, repo, actions>_ | _<designated successor, 2FA on>_ |
| _<e.g. Web3Forms>_ | _<form submission endpoint>_ | _<account email, free vs paid tier>_ |
| _<e.g. Twilio>_ | _<SMS / call>_ | _<account status>_ |

## GitHub account

| Item | Detail |
| --- | --- |
| Account holder | _<GitHub username>_ |
| Repo | https://github.com/&lt;owner&gt;/&lt;repo&gt; |
| **Designated successor** | _<name, relation, link to GitHub docs on setting this up>_ |
| 2FA on the GitHub account | _<yes / no — recommend yes>_ |
| Personal Access Tokens | _<currently-valid tokens; revoke periodically>_ |

## Backups

The repo is the source of truth. _N_ places should hold a complete copy:

1. **GitHub** (primary) — https://github.com/&lt;owner&gt;/&lt;repo&gt;
2. **Second remote** (e.g. GitLab mirror) — _<URL or instructions>_
3. **Local clone** — _<whose machine, where stored>_ — `git clone … && git pull` periodically.

archive.org's Wayback Machine also crawls public sites periodically;
verify at https://web.archive.org/web/*/&lt;your-domain&gt;.

## What to do if X breaks

> _Fill in per failure mode. Pick the most likely 3–5 scenarios and document the recovery for each._

### Domain expires / lapses

1. Check the registrar (the account listed above); pay the renewal.
2. _<specific steps for your registrar>_.

### Cloudflare account inaccessible /

- _<recovery steps — usually: contact support with proof of identity>_.
- **Prevent this**: _<add a backup email + 2FA to the account>_.

### GitHub inaccessible / repo deleted

1. **Push the local clone to a new host** (GitLab, Codeberg, Bitbucket, your
   own server). The repo is plain git, so it pushes anywhere.
2. Re-deploy the `dist/` directory to any static host (Netlify, Vercel,
   Cloudflare Pages, your own nginx).
3. Update the custom domain DNS to point at the new host.

### The project breaks visually but stays online

1. The project is fully static — no runtime dependencies. A broken
   page is almost always a single broken link or missing image.
2. Clone the repo, edit, redeploy. `npm run build` regenerates `dist/`.

### All services are gone (apocalyptic scenario)

The repo is plain HTML/CSS/JS in `dist/`. Open the `index.html` file in
any browser. It works without any server.

## For family members / future maintainers

If you are a family member or future maintainer reading this — _<URL or
description of what the project is>_ .

The repository is public and contains everything: source code, assets,
the docs (in this `docs/` folder), and any future changes. If the
original owner is no longer available, feel free to keep the project
running, archive it, or migrate it. The licence (MIT) explicitly
allows this.

The "Open action items" at the top of this file are the things that
haven't been completed yet. If they're still open when you read this,
they're the place to start.

---

_Last filled in: YYYY-MM-DD._
_Last reviewed: YYYY-MM-DD._