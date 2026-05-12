# GitNexus indexing

Use this repo as the `public/site` member of the TigerClaw.io GitNexus group.
Run indexing from the repo root after pulling, switching branches, or changing
public copy, metadata, routing, legal text, or deployment config.

```bash
cd /Users/brentbryson/Tigerclawvebsite-v5
gitnexus analyze --skills --skip-agents-md
gitnexus status
```

For the full TigerClaw.io and `bbrysonelite-max` account indexing workflow, see
`docs/operations/gitnexus-indexing.md` in
`/Users/brentbryson/tiger-claw-v4-core`.
