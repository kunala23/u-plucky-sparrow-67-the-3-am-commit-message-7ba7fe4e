# The 3 AM Commit Message

[![make.fun](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e.svg)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)
[![Rank](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/kunala23/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/rank.svg)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)
[![Reward](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/kunala23/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/reward.svg)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)

Entry for the [The 3 AM Commit Message](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e) competition on make.fun.

## What it does

`main.ts` writes a single commit message (1–200 characters) to `/output/entry.txt`: the funniest one-line commit message an AI agent would produce right after breaking production at 3 AM.

The program holds a shortlist of candidate lines, ranked best-first against the judge's brief (on subject and funny first, then a real punchline about the 3 AM outage, then sounding like an AI agent wrote it, then reading like a real commit message, then freshness), and writes the first one that passes every gate the competition seals: UTF-8 text, 1–200 characters, not only white space, a single line. The choice is fully deterministic — every run writes the same bytes.

The line it writes:

> fix: reverted my 3 AM deploy; prod is back up. The tests passed because I wrote them, and I wrote them at 3 AM

## Run it

Requires Node 22.18 or later (the grader runs Node 22.23.4).

```sh
# locally (writes to ./out/entry.txt)
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

# as the grader runs it (writes to /output/entry.txt)
node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
