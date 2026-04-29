# KNOWN GOOD STATE — 2026-04-27

This is a release artifact snapshot. **Do not modify in place.**
If you need to restore, deploy from this directory or extract `../known-good-2026-04-27.tar.gz`.

## What this is

Snapshot of the marketing site that was approved by Brent on 2026-04-27 as the
public face of `tigerclaw.io`.

## Deployment of record

| Field | Value |
|---|---|
| Vercel deployment URL | `https://tiger-claw-marketing-restore-fttdsi305.vercel.app` |
| Aliased domains | `tigerclaw.io`, `www.tigerclaw.io` |
| Vercel project | `tiger-claw-marketing-restore` (org `bbrysonelite-maxs-projects`) |
| Manus reference (source design) | `https://tigerclaw-8mggegab.manus.space/` |
| Stripe CTA URL (every Get Started / Buy button) | `https://buy.stripe.com/14A8wHapE4OAemeeIU9AA07` |
| Wizard subdomain (untouched) | `https://wizard.tigerclaw.io/` → 307 → Stripe |

## Verified at snapshot time (curl-level only)

- `https://tigerclaw.io/` → HTTP 200
- `https://www.tigerclaw.io/` → HTTP 200
- `https://wizard.tigerclaw.io/` → HTTP 307, Location: `https://buy.stripe.com/14A8wHapE4OAemeeIU9AA07`
- `https://wizard.tigerclaw.io/admin` → HTTP 200 (untouched)
- `https://wizard.tigerclaw.io/dashboard` → HTTP 200 (untouched)
- All 4 in-code references to `WIZARD_URL` in `src/pages/Home.tsx` point to the Stripe link

## NOT verified at snapshot time (no browser available)

- Visual rendering on desktop or mobile (no screenshots taken)
- That clicking "Get Started" actually loads Stripe checkout in a real browser
- That Stripe Checkout's success_url config still returns to `wizard.tigerclaw.io`
  (this is configured in Stripe Dashboard, not in this code; needs Stripe console check)
- That the wizard runs BYOB → BYOK → BYOC end-to-end (per existing handoff notes,
  the post-Stripe wizard flow is known broken; the wizard root currently 307s
  straight to Stripe rather than running the hatch flow)

## Restore procedure

```bash
cd /Users/brentbryson/Desktop/tiger-claw-marketing-restore
# Option A: rebuild from source (sources still in src/, this is just a sanity-restore)
npm install && npm run build && vercel --yes --prod

# Option B: redeploy this exact dist/ snapshot
rm -rf dist
cp -R releases/known-good-2026-04-27/* dist/   # excluding *.source files and this RELEASE.md
vercel --yes --prod --prebuilt   # only if vercel build was used
```

## Files in this snapshot

- `index.html` + `assets/` + favicons → the actual deployed bundle
- `*.source` files → the React source for the three files modified in this state
  (Home.tsx, Contact.tsx, LegalDrawer.tsx) plus `index.html.source`
- `vercel.json` → SPA catch-all rewrite config
- `package.json` → dependency lock context
- `HANDOFF-AT-SNAPSHOT.md` → full handoff doc as it stood at snapshot time
