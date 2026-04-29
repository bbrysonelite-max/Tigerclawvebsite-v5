# Tiger Claw marketing site

This repository contains the public TigerClaw.io marketing site for Tiger Claw,
the AI follow-up assistant for independent distributors, affiliates, and
relationship-driven operators.

The customer-facing message is simple: Tiger Claw helps users remember prospect
details, draft replies, handle common objections, organize follow-up, and keep
serious conversations moving toward the next step.

## Stack

This site is a Vite app built with React, TypeScript, Tailwind CSS, Wouter,
Framer Motion, Radix Tooltip, and Lucide React.

Important files:

- `src/pages/Home.tsx`: Homepage copy and primary public marketing content.
- `src/pages/Contact.tsx`: Contact page.
- `src/pages/Legal.tsx`: Legal content rendered inside the drawer.
- `src/components/LegalDrawer.tsx`: Footer legal drawer.
- `src/content/legal.md`: Legal and disclaimer source copy.
- `index.html`: Public title, description, Open Graph, and Twitter metadata.
- `public/`: Favicons and touch icon.
- `releases/`: Known-good release snapshots and handoff artifacts.

## Local development

Install dependencies and run the local Vite server from the repository root.

```bash
npm install
npm run dev
```

The dev server normally starts at `http://localhost:5173/`.

## Verification

Run these checks before deployment.

```bash
npm run lint
npm run build
```

After deployment, verify the public metadata with:

```bash
curl -L https://tigerclaw.io | tr '<' '\n<' | grep -iE "title|description|og:title|og:description|twitter:title|twitter:description"
```

Verify prohibited public copy with:

```bash
curl -L https://tigerclaw.io | grep -iE "Nu Skin|Nuskin|stateless|multi-tenant|Mine|Hive|lead intelligence refinery|AI Director of Operations|Autonomous AI Sales Agents|closes deals|guarantee|guaranteed|commissions|rank advancement|income"
```

The second command must return no customer-facing matches.

## Deployment

The production domain is `https://tigerclaw.io/`.

Deploy through the linked Vercel project from the repository root.

```bash
vercel deploy --prod --yes
```

If Vercel creates a deployment URL that is not already assigned to the production
domain, alias it to `tigerclaw.io` and `www.tigerclaw.io`.

## Product positioning rules

Keep TigerClaw.io focused on the customer product, not the internal platform.

Use this core positioning:

> Tiger Claw is your AI follow-up assistant.

Do not use public copy that implies affiliation with any network marketing,
direct selling, MLM, affiliate marketing, or social-selling company. Do not name
specific companies in public copy unless legal counsel approves the exact use.

Avoid these terms in customer-facing metadata and visible public copy:

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
- `guarantees sales`
- `rank advancement`
- `commissions`
- `income`

Use safer language:

- Helps you follow up.
- Helps you remember prospect details.
- Helps draft better replies.
- Helps handle common objections.
- Helps keep conversations moving.
- Helps move serious conversations toward the next step.

## Current public metadata

The public metadata for TigerClaw.io must stay aligned with the customer product.

Title:

```text
Tiger Claw | Your AI Follow-Up Assistant
```

Meta description:

```text
Tiger Claw helps independent distributors, affiliates, and relationship-driven operators manage prospect conversations, remember details, draft replies, handle objections, and follow up consistently.
```

Open Graph and Twitter title:

```text
Tiger Claw — Your AI Follow-Up Assistant
```

Open Graph and Twitter description:

```text
Follow up faster, remember prospect details, handle common objections, and keep serious conversations moving with your own AI assistant.
```
