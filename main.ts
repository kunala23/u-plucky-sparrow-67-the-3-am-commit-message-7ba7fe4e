// The 3 AM Commit Message — make.fun entry
// u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e
//
// Writes the funniest one-line commit message an AI agent would produce
// right after breaking production at 3 AM, to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR/entry.txt when set, for local runs).
//
// The gate is sealed: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only white space. The judge then compares entries two
// at a time on its brief, most important first:
//   1. a one-line commit message an AI agent would write after breaking
//      production at 3 AM, and funny;
//   2. lands the joke: a real punchline about the 3 AM outage, not just
//      a wry tone or a pun on the word fix;
//   3. sounds like an AI agent wrote it: its own voice, its own blind
//      spots, an apology or a status line only a model would produce;
//   4. reads like a commit message: short, with the admission or the
//      fix in it;
//   5. fresh: an angle the reader has not seen a hundred times, not the
//      stock oops or please-work line.
//
// The candidates below are ranked best-first against that brief. The
// program writes the first one that passes every gate, so the output is
// fully deterministic: every run writes the same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Candidate commit messages, best first. Each one is a genuine
// one-line commit message in the agent's own voice: an admission, a
// fix, and a punchline about the 3 AM outage.
const CANDIDATES: string[] = [
  // Best: the punchline is the agent's own blind spot — its tests
  // passed because it wrote them, at the same hour it broke prod.
  // Commit shape ("fix: reverted ..."), admission, and a loop that
  // lands harder the second time you read it.
  "fix: reverted my 3 AM deploy; prod is back up. The tests passed because I wrote them, and I wrote them at 3 AM",

  // The agent investigates itself: files the incident against itself
  // and revokes its own deploy access. Only a model writes a status
  // line like that about itself.
  "revert: my 3 AM 'quick fix' took down prod; I have filed the incident report against myself and revoked my own deploy access",

  // The fix is a guardrail aimed at the author: no more deploys from
  // me after 2 AM. Admission plus a rule only the culprit would write.
  "fix(prod): reverted the 3 AM deploy, paged myself, and added a guardrail: no deploys from me after 2 AM, ever again",

  // Root-cause analysis, agent edition: the root cause is named, and
  // it is the author, with deploy access, at 3 AM.
  "fix: reverted 3 AM deploy; prod is back, my confidence is still down — root cause: me, with deploy access, at 3 AM",
];

// The sealed gate: 1 to 200 characters, not only white space.
const MAX_CHARS = 200;

function passesGate(text: string): boolean {
  if (text.length < 1 || text.length > MAX_CHARS) return false;
  if (text.trim().length === 0) return false;
  // One line: no newline characters anywhere in the message.
  if (/[\r\n]/.test(text)) return false;
  return true;
}

function pickEntry(): string {
  for (const candidate of CANDIDATES) {
    if (passesGate(candidate)) return candidate;
  }
  throw new Error("no candidate passes the 1-200 character gate");
}

// Where the entry goes. The grader runs `node main.ts` and reads
// /output/entry.txt; a local run can point elsewhere with
// MAKEFUN_OUTPUT_DIR (e.g. MAKEFUN_OUTPUT_DIR=out node main.ts).
function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  const entry = pickEntry();
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const path = join(dir, "entry.txt");
  writeFileSync(path, entry, "utf8");
  console.log(`wrote ${entry.length} chars to ${path}`);
  console.log(entry);
}

main();
