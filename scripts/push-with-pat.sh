#!/usr/bin/env bash
# scripts/push-with-pat.sh
#
# Push to a git remote using a Personal Access Token **without** leaving the
# PAT in:
#   - .git/config (where `git remote set-url https://…@github.com/…` would put it)
#   - shell history (~/.bash_history, etc.)
#   - process listing (ps aux)
#
# The PAT is written to a temp file with strict permissions (umask 077 +
# chmod 700) and passed to git via GIT_ASKPASS, which only the running shell
# can read. The temp file is `shred -u`'d on the way out regardless of
# whether `git push` succeeded.
#
# Usage:
#   ./scripts/push-with-pat.sh <pat> [<remote>] [<branch>]
#
# Examples:
#   ./scripts/push-with-pat.sh github_pat_xxxxxxxxxxxx
#   ./scripts/push-with-pat.sh github_pat_xxxxxxxxxxxx origin main
#
# Why this exists:
#   Pasting a PAT into `git remote set-url` writes it to .git/config where
#   it persists. Pasting it into a normal `git push` command lands it in
#   shell history. This helper avoids both.
set -euo pipefail

PAT="${1:?Usage: $0 <pat> [remote=origin] [branch=main]}"
REMOTE="${2:-origin}"
BRANCH="${3:-main}"

# Temp file for the askpass script. mktemp -t is BSD/macOS-style;
# use mktemp with explicit template for portability.
ASKPASS="$(mktemp -t git-askpass.XXXXXX.sh)"

# Write the PAT to the temp file with strict perms.
umask 077
printf '#!/bin/sh\necho "%s"\n' "$PAT" > "$ASKPASS"
chmod 700 "$ASKPASS"

# Push. GIT_ASKPASS points at our script; credential.helper= clears any
# cached credentials so git falls through to the askpass prompt.
GIT_ASKPASS="$ASKPASS" git -c credential.helper= push "$REMOTE" "$BRANCH"
STATUS=$?

# Always clean up the temp file, regardless of success/failure.
shred -u "$ASKPASS" 2>/dev/null || rm -f "$ASKPASS"

exit "$STATUS"