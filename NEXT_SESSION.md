# SMS repair next steps

September 14, 2026: independent browser checks and review passed. Publish the
requested repair and verify `/sms` and `/sms/` on Vercel. Do not
contact the vendor or change providers, registrations, DNS, or legal identity.

Run `npm run lint`, `npm run build --ignore-scripts`, and
`node scripts/check-sms.mjs`. The build flag skips the separate IndexNow
postbuild hook during local tests; it does not skip the build command.
Inspect generated HTML without JS and test preparation of an email request
without clicking its mailto link or sending anything.

Rollback: revert this repair commit and redeploy its parent if the new SMS route
fails; that restores the prior behavior but also restores the known unreadable
SMS page. Leave checkout, wizard, domain bindings, and legal pages untouched.
