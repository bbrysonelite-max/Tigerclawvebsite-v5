// Prerenders each legal policy to a standalone, crawlable static page at
// dist/legal/<slug>/index.html, reusing the React policy components from
// src/pages/Legal.tsx via Vite's programmatic SSR (no extra dependencies).
// The hashed Tailwind CSS + font links from the built dist/index.html are
// reused so the static pages match the site's brand. Also injects the legal
// URLs into dist/sitemap.xml. Run AFTER `vite build`.
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const SITE = 'https://tigerclaw.io'

if (!existsSync(path.join(distDir, 'index.html'))) {
  console.error('[prerender] dist/index.html missing — run `vite build` first.')
  process.exit(1)
}

// 1. Load the policy components through Vite SSR (resolves @ alias + TSX).
const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})
let sections, policyComponents, LEGAL_EFFECTIVE
try {
  const mod = await vite.ssrLoadModule('/src/pages/Legal.tsx')
  sections = mod.sections
  policyComponents = mod.policyComponents
  LEGAL_EFFECTIVE = mod.LEGAL_EFFECTIVE
} finally {
  await vite.close()
}

// 2. Reuse the built CSS + font links so static pages are on-brand.
const indexHtml = readFileSync(path.join(distDir, 'index.html'), 'utf8')
const headLinks = (indexHtml.match(/<link[^>]*>/g) || [])
  .filter((l) => /stylesheet|fonts\.googleapis|fonts\.gstatic|preconnect/.test(l))
  .join('\n    ')

const year = new Date().getFullYear()

function pageHtml({ title, description, canonical, bodyInner }) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${canonical}" />
    ${headLinks}
  </head>
  <body class="bg-[#0A0A0A]">
    <div class="min-h-screen bg-[#0A0A0A]">
      <header class="border-b border-white/10">
        <div class="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" class="text-white font-bold tracking-tight">TIGER CLAW</a>
          <a href="/legal" class="text-white/60 hover:text-white text-sm">All policies</a>
        </div>
      </header>
      <main class="max-w-3xl mx-auto px-6 pt-12 pb-20">
        ${bodyInner}
      </main>
      <footer class="border-t border-white/10 py-8">
        <div class="max-w-3xl mx-auto px-6 text-center text-white/50 text-sm">
          &copy; ${year} BotCraft Works LLC (DBA Tiger Claw). All rights reserved.
        </div>
      </footer>
    </div>
  </body>
</html>`
}

// 3. Render each policy to its own static page.
mkdirSync(path.join(distDir, 'legal'), { recursive: true })
const legalUrls = []
for (const s of sections) {
  const Comp = policyComponents[s.id]
  if (!Comp) continue
  const inner = renderToStaticMarkup(createElement(Comp))
  const slugDir = path.join(distDir, 'legal', s.slug)
  mkdirSync(slugDir, { recursive: true })
  writeFileSync(
    path.join(slugDir, 'index.html'),
    pageHtml({
      title: `${s.label} · Tiger Claw`,
      description: `${s.label} for Tiger Claw (BotCraft Works LLC). Effective ${LEGAL_EFFECTIVE}.`,
      canonical: `${SITE}/legal/${s.slug}`,
      bodyInner: `<a href="/legal" class="inline-block text-white/60 hover:text-white text-sm mb-8">&larr; All policies</a>${inner}`,
    }),
  )
  legalUrls.push(`/legal/${s.slug}`)
}

// 4. Render the /legal index page.
const list = sections
  .map((s) => `<li class="mb-2"><a class="text-white/85 hover:text-white underline underline-offset-2" href="/legal/${s.slug}">${s.label}</a></li>`)
  .join('\n        ')
writeFileSync(
  path.join(distDir, 'legal', 'index.html'),
  pageHtml({
    title: 'Legal · Tiger Claw',
    description: `Tiger Claw legal policies (BotCraft Works LLC). Effective ${LEGAL_EFFECTIVE}.`,
    canonical: `${SITE}/legal`,
    bodyInner: `<h1 class="text-3xl font-bold text-white mb-6">Legal</h1>\n      <ul>\n        ${list}\n      </ul>`,
  }),
)
legalUrls.push('/legal')

// 5. Inject legal URLs into dist/sitemap.xml (if present).
const sitemapPath = path.join(distDir, 'sitemap.xml')
if (existsSync(sitemapPath)) {
  let xml = readFileSync(sitemapPath, 'utf8')
  const entries = legalUrls
    .filter((u) => !xml.includes(`<loc>${SITE}${u}</loc>`))
    .map((u) => `  <url>\n    <loc>${SITE}${u}</loc>\n  </url>`)
    .join('\n')
  if (entries) {
    xml = xml.replace('</urlset>', `${entries}\n</urlset>`)
    writeFileSync(sitemapPath, xml)
  }
}

console.log(`[prerender] wrote ${legalUrls.length} legal pages + sitemap entries`)
