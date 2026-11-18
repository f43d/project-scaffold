#!/usr/bin/env python3
"""End-of-day snapshot for the project-scaffold convention.

Mirrors the git-diff logic of the old Node script, in stdlib-only Python so
Python projects don't need Node.

Usage:
  python3 scripts/end-of-day.py             # JSON to stdout
  python3 scripts/end-of-day.py --markdown  # markdown rendering
"""
import json
import os
import subprocess
import sys
import datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SESSIONS = os.path.join(ROOT, "docs", "sessions")


def sh(args):
    try:
        return subprocess.run(
            ["git", *args], cwd=ROOT, capture_output=True, text=True, check=False
        ).stdout.strip()
    except Exception:
        return ""


def main():
    markdown = "--markdown" in sys.argv
    today = datetime.date.today().isoformat()

    sessions = sorted(
        f for f in os.listdir(SESSIONS) if f.endswith(".md")
    ) if os.path.isdir(SESSIONS) else []
    last_session = sessions[-1] if sessions else None

    since_sha = sh(["log", "-1", "--format=%H", "--", "docs/sessions/"])
    if not since_sha:
        since_sha = sh(["rev-list", "--max-parents=0", "HEAD"])
    head_sha = sh(["rev-parse", "HEAD"])

    commits = (
        sh(["log", "--pretty=format:%h\t%an\t%s", f"{since_sha}..HEAD"]).splitlines()
        if since_sha else []
    )
    commits = [c for c in commits if c]

    files_changed = (
        sh(["diff", "--name-status", f"{since_sha}..HEAD"]).splitlines()
        if since_sha else []
    )
    files_changed = [f for f in files_changed if f]

    joined = "\n".join(files_changed)

    def re_test(pattern):
        import re
        return bool(re.search(pattern, joined, re.M))

    # Heuristics — conservative hints; the agent uses judgment.
    has_new_decision = (
        re_test(r"^\s*[AM]\s+(src/components/|\.github/workflows/)")
        or re_test(
            r"^\s*M\s+(package\.json|pyproject\.toml|requirements.*\.txt|"
            r"Cargo\.toml|go\.mod|astro\.config\.mjs|tsconfig\.json)"
        )
    )
    is_user_visible = re_test(r"^\s*[AM]\s+(src/pages/|src/components/|src/styles/|src/)")

    same_day = bool(last_session and last_session.startswith(today))
    if same_day:
        new_path = f"docs/sessions/{last_session} (append to existing)"
    else:
        slug = f"{today}-2.md" if any(s.startswith(today) for s in sessions) else f"{today}.md"
        new_path = f"docs/sessions/{slug}"

    summary = {
        "today": today,
        "new_session_path": new_path,
        "last_session_file": last_session,
        "session_count": len(sessions),
        "since_sha": since_sha[:12],
        "head_sha": head_sha[:12],
        "shortstat": sh(["diff", "--shortstat", f"{since_sha}..HEAD"]) if since_sha else "",
        "commits": commits,
        "files_changed": files_changed,
        "suggestions": {
            "append_or_create_session": bool(commits or files_changed),
            "append_decisions": has_new_decision,
            "update_changelog": is_user_visible,
        },
    }

    if markdown:
        sess = summary["suggestions"]["append_or_create_session"]
        new_path = summary["new_session_path"]
        sess_line = f"`{new_path}`" if sess else "no work this session"
        dec_line = "review & likely append" if summary["suggestions"]["append_decisions"] else "no clear new decision"
        chg_line = "likely needs an entry" if summary["suggestions"]["update_changelog"] else "probably no user-visible change"
        lines = [
            f"# End-of-day snapshot — {summary['today']}",
            "",
            f"- Last session file: `{summary['last_session_file'] or '(none, first session)'}`",
            f"- Total session files: {summary['session_count']}",
            f"- Diff range: `{summary['since_sha']}..{summary['head_sha']}`",
            f"- Stats: {summary['shortstat'] or 'no changes'}",
            "",
            "## Suggested updates",
            "",
            f"- **Session log**: {sess_line}",
            f"- **DECISIONS**: {dec_line}",
            f"- **CHANGELOG**: {chg_line}",
            "",
            "## Commits",
            "",
        ]
        lines += [f"- {c}" for c in commits] or ["- _none since the last session file_"]
        lines += ["", "## Files changed", ""]
        lines += [f"- `{f}`" for f in files_changed] or ["- _none since the last session file_"]
        print("\n".join(lines))
    else:
        print(json.dumps(summary, indent=2))


if __name__ == "__main__":
    main()
