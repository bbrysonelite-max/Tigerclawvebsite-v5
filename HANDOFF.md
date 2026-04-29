# Tiger Claw Marketing Site — Handoff

> ## ⚠️ KNOWN GOOD STATE — DO NOT MODIFY WITHOUT BRENT APPROVAL
>
> - **Public face:** approved
> - **CTA:** production Stripe Payment Link (`https://buy.stripe.com/28E28jeFUfte7XQ6co9AA0c`)
> - **Stripe product description:** `AI-powered follow-up and conversation support software for independent operators, affiliates, and relationship-driven professionals.`
> - **Post-payment path:** `wizard.tigerclaw.io`
> - **Wizard:** untouched
> - **Admin/dashboard:** untouched
> - **No Codex / OpenAI terminal agents**
> - **No redesign**
> - **No route changes**
> - **No production move without screenshots**
>
> **Production move = brutally simple:**
> Approved marketing face → existing Stripe Checkout → existing Stripe success redirect → existing wizard.
> No extra page. No "Deploy your tiger in two minutes." No wizard-looking homepage. No agent improvisation.
>
> **Release artifact:** `releases/known-good-2026-04-27-final/` (snapshot of `dist/` at this state).
> **Deployment of record:** `https://tiger-claw-marketing-restore-1l9ytxuwp.vercel.app` (aliased to `tigerclaw.io` + `www.tigerclaw.io`).
> **Final-pass tweaks (2026-04-27 evening):** footer logo swapped from Zap-in-orange-circle to favicon (Home + Contact); floating desktop nav text bumped from `text-white/60` `font-medium` `0.8rem` to `text-white/85` `font-semibold` `text-sm` for readability/contrast.

---

**Last updated:** 2026-04-27 (KNOWN GOOD STATE locked, Brent moving to voice training)
**Project root:** `/Users/brentbryson/Desktop/tiger-claw-marketing-restore/`
**Vercel project:** `tiger-claw-marketing-restore` (org: `bbrysonelite-maxs-projects`)
**Live at:** `https://tigerclaw.io/` and `https://www.tigerclaw.io/`
**Preview alias:** `https://tiger-claw-marketing-restore.vercel.app/`
**Not a git repo.** No CI. Deploy via `vercel --yes --prod` from project root.

---

## What this is

Restoration of the Manus-designed marketing site
(`https://tigerclaw-8mggegab.manus.space/`), re-rendered as a Vite + React 19 +
Tailwind v4 app and pushed to `tigerclaw.io`.

Replaces the prior site with "Tiger Claw | Your AI Follow-Up Assistant."
which was on Vercel project `tigerclaw-website` (now domain-less, kept as rollback).

---

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind v4 (`@import "tailwindcss"; @theme inline { ... }` in `src/index.css`)
- framer-motion 12, wouter (router), lucide-react 1.11
- Path alias `@/*` → `./src/*` (no `baseUrl` — TS 6.0 deprecated it)
- Build: `npm run build` → `dist/`
- Deploy: `vercel --yes --prod`

`tsconfig.app.json` has `noUnusedLocals: false` / `noUnusedParameters: false` so the
verbatim-copied Manus files compile without scrubbing dead imports.

---

## Routes

- `/` → `src/pages/Home.tsx` (875 lines, verbatim Manus + 3 modifications, see below)
- `/contact` → `src/pages/Contact.tsx` (verbatim Manus + footer modifications)
- catch-all → `src/pages/NotFound.tsx`

**`/legal` route was removed.** Legal content lives in `src/pages/Legal.tsx` but only
as the source of section components. Legal is rendered via the right-side slide-out
drawer at `src/components/LegalDrawer.tsx`, opened from footer link clicks.

---

## Modifications applied on top of the verbatim Manus copy

1. **Legal slide-out tray** (`src/components/LegalDrawer.tsx`)
   - Right-side drawer with backdrop + ESC-to-close + focus on initial section
   - Used by Footer in both Home and Contact
   - IntersectionObserver scoped to drawer's scroll container (not viewport)

2. **Eyebrow color/size unification**
   - Constant `EYEBROW_GREEN = "#4ADE80"` introduced in `Home.tsx` and `Contact.tsx`
   - All eyebrow `text-xs` bumped to `text-sm`, all colors swapped to `EYEBROW_GREEN`
   - Affects: Problem, Thesis, Pattern Recognition, What Tiger Claw Is, Who It's For,
     Pricing, The Offer, Talk to the Founder, Contact eyebrows

3. **Cursor follower** (Home + Contact)
   - Was: 24px soft radial gradient with mix-blend-screen
   - Now: 12px solid orange dot with layered box-shadow glow halo

4. **Nav logo** (Home + Contact, desktop + mobile)
   - Was: orange circle background with `<Zap>` lightning icon
   - Now: `<img src="/favicon-64x64.png">` (sabertooth skull)

5. **Favicon**
   - Sabertooth v2 PNG set in `public/` (16/32/64/128 + apple-touch 256)
   - `<link rel="icon">` tags in `index.html`

6. **Buy CTAs**
   - `WIZARD_URL` constant in `Home.tsx` points at
     `https://buy.stripe.com/28E28jeFUfte7XQ6co9AA0c` (Stripe Payment Link directly)
   - Stripe redirects successful purchases to
     `https://wizard.tigerclaw.io/signup?session_id={CHECKOUT_SESSION_ID}` so
     the wizard can verify the payment session and open the hatch flow.
   - Wired into: pricing-card "Start for $147/month" button + nav "Get Started" pill
     (desktop + mobile)
   - Other CTAs (`#pricing` anchors) still scroll to the pricing section

7. **`vercel.json`** — SPA catch-all rewrite to `/index.html` so client routes don't 404

---

## Domains (Vercel)

| Host | Project | Behavior |
|---|---|---|
| `tigerclaw.io` | `tiger-claw-marketing-restore` | Serves new site |
| `www.tigerclaw.io` | `tiger-claw-marketing-restore` | Serves new site |
| `wizard.tigerclaw.io` | `web-onboarding` | UNTOUCHED, 307s to Stripe |
| (old) `tigerclaw-website` project | (no domains) | Kept as rollback escape hatch |

DNS lives at Porkbun, not Vercel nameservers. No DNS edits were made today.
Domain swap was project-rebind only via Vercel CLI.

**Gotcha discovered the hard way:** `vercel domains rm tigerclaw.io` removes the
domain from the *account*, which cascaded and detached `wizard.tigerclaw.io` too.
Wizard was 404 for ~30s until re-bound to `web-onboarding`. Don't use
`vercel domains rm` for project rebind — instead use the API or dashboard to
detach from the source project specifically.

---

## What is tested vs. NOT tested

**Tested (curl-level):**
- HTTP 200 on `/`, `/contact`, `www.`, apex
- Page titles + meta tags in served HTML
- Favicon files serve
- Stripe URL is in the deployed JS bundle
- `wizard.tigerclaw.io` still 307s to Stripe

**NOT tested (no browser was opened today):**
- Visual rendering of any page
- Get Started button actually loading Stripe checkout
- Legal drawer slide-in animation, scroll lock, ESC, backdrop click
- Cursor follower appearance
- Mobile layout / responsive breakpoints
- Hover states, transitions, scroll-triggered animations
- Form submission on `/contact` (mailto:success@tigerclaw.io)
- Cal.com iframe on Contact + Home booking section
- End-to-end Stripe → wizard → dashboard funnel (wizard side is broken anyway)

**No code review.** Brent built ~2000 lines of new/copied/modified code today
without a second-pass review. Build passing is not the same as code being reviewed.

---

## Known broken / pending

1. Cursor follower: visual quality unverified.
2. Mobile rendering: unverified.
3. Full paid checkout should still be smoke-tested with a real Stripe checkout
   session before paid traffic. The configured handoff is now:
   marketing CTA → Stripe Payment Link →
   `wizard.tigerclaw.io/signup?session_id={CHECKOUT_SESSION_ID}`.

---

## How to pick this up

```bash
cd /Users/brentbryson/Desktop/tiger-claw-marketing-restore
npm install         # if node_modules missing
npm run dev         # local dev at http://localhost:5173/
npm run build       # type-check + bundle
vercel --yes --prod # deploy to tigerclaw.io
```

To test what was shipped today, the right move is:
1. Open `https://tigerclaw.io/` in a browser
2. Click "Get Started" in the nav → confirm Stripe page loads for the
   production `$147/month` Tiger Claw product
3. Click any footer legal link → confirm drawer slides in from right
4. Open in mobile viewport → confirm mobile nav + layout
5. Walk the page top to bottom on desktop and mobile

If anything looks off, check the verbatim Manus reference at
`https://tigerclaw-8mggegab.manus.space/` and the source files
in `~/Desktop/Examples of New Websites for Tigerclaw/`.

---

## Files of interest

- `src/pages/Home.tsx` — main landing (875 lines, verbatim Manus + 6 mods above)
- `src/pages/Contact.tsx` — contact page (verbatim Manus + nav/footer mods)
- `src/pages/Legal.tsx` — legal section components, exported for the drawer
- `src/components/LegalDrawer.tsx` — slide-out tray (NEW, written today)
- `src/App.tsx` — wouter routes (`/legal` route removed)
- `index.html` — Manus head metadata + favicon links
- `vercel.json` — SPA catch-all rewrite
- `tsconfig.app.json` — `noUnusedLocals/noUnusedParameters` set false

---

## Constraints (still active)

- `wizard.tigerclaw.io` is sacred — operator's polished signup page, do not delete
  or modify without explicit approval per global memory
- `tigerclaw-website` project (the old marketing site) is the rollback — do not
  delete without explicit approval
