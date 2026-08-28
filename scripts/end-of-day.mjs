#!/usr/bin/env node
// scripts/end-of-day.mjs
//
// End-of-day snapshot for projects following the project-scaffold convention:
//   docs/sessions/YYYY-MM-DD[-<slug>].md   one file per working day
//   docs/DECISIONS.md                      append-only log of design decisions
//   docs/HISTORY.md                        notable history (e.g. version migrations)
//   docs/OPERATIONS.md                     day-2 ops & common gotchas
//   docs/ARCHITECTURE.md                   data + deploy + moderation flow
//   AGENTS.md                              (root) project context for AI agents
//   CHANGELOG.md                           (root) user-facing changelog
//
// Usage:
//   node scripts/end-of-day.mjs             # JSON to stdout
//   node scripts/end-of-day.mjs --markdown  # Markdown rendering
//
// Heuristics output (just hints — the agent uses judgment):
//   suggestions.newSessionFile : create or append a session file
//   suggestions.appendDecisions: at least one DECISIONS-worthy change
//   suggestions.updateChangelog: at least one user-visible change
//
// Exit: 0 always.

import { readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const sessionsDir = join(repoRoot, 'docs', 'sessions');

const isMarkdown = process.argv.includes('--markdown');

function sh(cmd, args = []) {
  try {
    return execFileSync(cmd, args, {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    }).trim();
  } catch {
    return '';
  }
}

const today = new Date().toISOString().slice(0, 10);
const todaySlug = today;

let lastSession = null;
let allSessions = [];
try {
  allSessions = readdirSync(sessionsDir)
    .filter((f) => f.endsWith('.md'))
    .sort();
  if (allSessions.length > 0) lastSession = allSessions[allSessions.length - 1];
} catch {
  // docs/sessions may not exist yet — first run
}

// Anchor: most recent commit that touched docs/sessions/.
let sinceSha = sh('git', [
  'log',
  '-1',
  '--format=%H',
  '--',
  'docs/sessions/',
]);
if (!sinceSha) {
  sinceSha = sh('git', ['rev-list', '--max-parents=0', 'HEAD']);
}

const headSha = sh('git', ['rev-parse', 'HEAD']);

const commits = sinceSha
  ? sh('git', [
      'log',
      '--pretty=format:%h%x09%an%x09%s',
      `${sinceSha}..HEAD`,
    ]).split('\n').filter(Boolean)
  : [];

const filesChanged = sinceSha
  ? sh('git', ['diff', '--name-status', `${sinceSha}..HEAD`]).split('\n').filter(Boolean)
  : [];

const shortstat = sinceSha ? sh('git', ['diff', '--shortstat', `${sinceSha}..HEAD`]) : '';

// Heuristics — conservative. Real choice is yours / the agent's.
const hasNewDecision =
  /^\s*A\s+src\/components\//.test(filesChanged.join('\n')) ||
  /^\s*A\s+\.github\/workflows\//.test(filesChanged.join('\n')) ||
  /^\s*M\s+(package\.json|astro\.config\.mjs|tsconfig\.json|pyproject\.toml|requirements.*\.txt|Cargo\.toml|go\.mod)/.test(
    filesChanged.join('\n'),
  );

const isUserVisible =
  /^\s*[AM]\s+src\/pages\//.test(filesChanged.join('\n')) ||
  /^\s*[AM]\s+src\/components\//.test(filesChanged.join('\n')) ||
  /^\s*[AM]\s+src\/styles\//.test(filesChanged.join('\n'));

const sameDayContinuing = lastSession && lastSession.startsWith(today);
const newSessionPath = sameDayContinuing
  ? `docs/sessions/${lastSession} (append to existing)`
  : `docs/sessions/${todaySlug}${
      allSessions.some((f) => f.startsWith(todaySlug)) ? '-2.md' : '.md'
    }`;

const summary = {
  today: todaySlug,
  newSessionPath,
  lastSessionFile: lastSession,
  sessionCount: allSessions.length,
  sinceSha: sinceSha.slice(0, 12),
  headSha: headSha.slice(0, 12),
  shortstat,
  commits,
  filesChanged,
  suggestions: {
    appendOrCreateSession: commits.length > 0 || filesChanged.length > 0,
    appendDecisions: hasNewDecision,
    updateChangelog: isUserVisible,
  },
};

if (isMarkdown) {
  const lines = [];
  lines.push(`# End-of-day snapshot — ${summary.today}`);
  lines.push('');
  lines.push(`- Last session file: \`${summary.lastSessionFile ?? '(none, first session)'}\``);
  lines.push(`- Total session files: ${summary.sessionCount}`);
  lines.push(`- Diff range: \`${summary.sinceSha}..${summary.headSha}\``);
  lines.push(`- Stats: ${summary.shortstat || 'no changes'}`);
  lines.push('');
  lines.push('## Suggested updates');
  lines.push('');
  lines.push(
    `- **Session log**: ${summary.suggestions.appendOrCreateSession ? `\`${summary.newSessionPath}\`` : 'no work this session'}`,
  );
  lines.push(`- **DECISIONS**: ${summary.suggestions.appendDecisions ? 'review & likely append' : 'no clear new decision'}`);
  lines.push(`- **CHANGELOG**: ${summary.suggestions.updateChangelog ? 'likely needs an entry' : 'probably no user-visible change'}`);
  lines.push('');
  lines.push('## Commits');
  lines.push('');
  if (summary.commits.length === 0) {
    lines.push('- _none since the last session file_');
  } else {
    for (const c of summary.commits) lines.push(`- ${c}`);
  }
  lines.push('');
  lines.push('## Files changed');
  lines.push('');
  if (summary.filesChanged.length === 0) {
    lines.push('- _none since the last session file_');
  } else {
    for (const f of summary.filesChanged) lines.push(`- \`${f}\``);
  }
  lines.push('');
  console.log(lines.join('\n'));
} else {
  console.log(JSON.stringify(summary, null, 2));
}
