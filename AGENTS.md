# Agent instructions

This file gives coding agents the operating rules for the TigerClaw.io marketing
site. Read this before changing copy, metadata, legal text, deployment settings,
or public routes.

## Project scope

TigerClaw.io is the customer-facing marketing site for Tiger Claw, an AI
follow-up assistant. It is not the enterprise platform site and must not pitch
the internal platform, stateless agent factory, Mine, Hive, or autonomous sales
agent architecture.

The production domain is:

```text
https://tigerclaw.io/
```

## Required positioning

Use this positioning in public copy:

```text
Tiger Claw is your AI follow-up assistant.
```

The product helps independent distributors, affiliates, social sellers, and
relationship-driven operators with prospect conversation memory, reply drafting,
common objection support, follow-up organization, and next-step guidance.

## Public copy restrictions

Do not add specific company names to public copy or metadata. This includes
company names from network marketing, direct selling, MLM, affiliate marketing,
or social-selling programs.

Do not imply Tiger Claw is affiliated with, endorsed by, sponsored by, approved
by, or recommended by any network marketing, direct selling, MLM, affiliate
marketing, or social-selling company.

Do not use guaranteed-results language. Avoid claims involving guaranteed sales,
signups, conversions, rank advancement, commissions, income, or specific
business outcomes.

Do not use these customer-facing phrases:

- `Autonomous AI Sales Agents`
- `AI Director of Operations`
- `sales engagement platform`
- `stateless agent factory`
- `multi-tenant platform`
- `lead intelligence refinery`
- `data moat`
- `Mine`
- `Hive`
- `closes deals`
- `guaranteed conversions`
- `rank advancement`
- `commissions`
- `income`

Use safer phrasing:

- Helps you follow up.
- Helps you remember prospect details.
- Helps draft better replies.
- Helps handle common objections.
- Helps keep conversations moving.
- Helps move serious conversations toward the next step.
- Supports booked conversations or calls without promising outcomes.

## Metadata requirements

Keep `index.html` metadata aligned with this exact customer-facing language.

Title:

```text
Tiger Claw | Your AI Follow-Up Assistant
```

Meta description:

```text
Tiger Claw helps independent distributors, affiliates, and relationship-driven operators manage prospect conversations, remember details, draft replies, handle objections, and follow up consistently.
```

Open Graph title:

```text
Tiger Claw — Your AI Follow-Up Assistant
```

Open Graph description:

```text
Follow up faster, remember prospect details, handle common objections, and keep serious conversations moving with your own AI assistant.
```

Twitter title:

```text
Tiger Claw — Your AI Follow-Up Assistant
```

Twitter description:

```text
Follow up faster, remember prospect details, handle common objections, and keep serious conversations moving with your own AI assistant.
```

## Development workflow

Install dependencies before local work:

```bash
npm install
```

Run the local server:

```bash
npm run dev
```

Run verification before claiming completion:

```bash
npm run lint
npm run build
```

## Pre-deploy checks

Before deploying, search the repository for stale public copy:

```bash
rg -n "Nu Skin|Nuskin|stateless|multi-tenant|Mine|Hive|lead intelligence refinery|AI Director of Operations|Autonomous AI Sales Agents|closes deals|guarantee|guaranteed|commissions|rank advancement|income|Concept A|Authority|BotCraftWorks" -g '!node_modules' -g '!dist'
```

Customer-facing matches must be removed or rewritten. Legal language that says
results are not guaranteed is acceptable when it is part of the disclaimer.

After deployment, verify the live domain:

```bash
curl -L https://tigerclaw.io | tr '<' '\n<' | grep -iE "title|description|og:title|og:description|twitter:title|twitter:description"
curl -L https://tigerclaw.io | grep -iE "Nu Skin|Nuskin|stateless|multi-tenant|Mine|Hive|lead intelligence refinery|AI Director of Operations|Autonomous AI Sales Agents|closes deals|guarantee|guaranteed|commissions|rank advancement|income"
```

The metadata command must show the approved metadata. The prohibited-copy command
must return no customer-facing matches.

## Deployment workflow

Deploy from the repository root with Vercel:

```bash
vercel deploy --prod --yes
```

The only production customer domain is `tigerclaw.io`. Do not move this site to a
different production domain unless Brent explicitly requests it.

## Change discipline

Keep changes tightly scoped. Do not modify the wizard, admin dashboard, internal
platform, or enterprise product unless the user explicitly asks for that work.

Do not delete release snapshots or handoff files unless the user explicitly asks.
If a snapshot contains stale public metadata, update the snapshot metadata rather
than removing the snapshot.

## Related TigerClaw.io repos

Use this repo as the public TigerClaw customer site. Keep these related repos
separate unless Brent explicitly asks for a cross-repo change.

- Core platform: `bbrysonelite-max/tiger-claw-v4-core`
- Mine product and build packet: `bbrysonelite-max/Datamine`
- Research and optimization loop: `bbrysonelite-max/Auto-Research-Loop`

## GitNexus use

- Keep `.gitnexus/` local and untracked.
- Use `gitnexus analyze --skills --skip-agents-md` after agent docs are
  installed so GitNexus updates the graph without replacing this rulebook.
- With multiple repos indexed, always include the repo name or full path when
  querying GitNexus.
- Group this repo under `tigerclaw-io` as `public/site`.
