// Prerenders each LLM-retrieval category answer page to standalone, crawlable
// static HTML at dist/<slug>/index.html, reusing the React page component from
// src/pages/CategoryAnswer.tsx via Vite's programmatic SSR (no extra
// dependencies) — same pattern as scripts/prerender-legal.mjs. Each page head
// carries a unique title, meta description, canonical URL, and JSON-LD
// (FAQPage + SoftwareApplication) so crawlers and answer engines get the real
// content without executing JS. The four URLs already live in
// public/sitemap.xml, so no sitemap injection happens here.
// Run AFTER `vite build`.
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const SITE = 'https://tigerclaw.io'

if (!existsSync(path.join(distDir, 'index.html'))) {
  console.error('[prerender-category] dist/index.html missing — run `vite build` first.')
  process.exit(1)
}

// 1. Load the page component + data through Vite SSR (resolves @ alias + TSX).
const vite = await createServer({
  root,
  logLevel: 'error',
  server: { middlewareMode: true },
  appType: 'custom',
})
let categoryAnswers, CategoryAnswer
try {
  const dataMod = await vite.ssrLoadModule('/src/pages/categoryAnswers.ts')
  categoryAnswers = dataMod.categoryAnswers
  const pageMod = await vite.ssrLoadModule('/src/pages/CategoryAnswer.tsx')
  CategoryAnswer = pageMod.default
} finally {
  await vite.close()
}

// 2. Reuse the built CSS + font links so static pages are on-brand.
const indexHtml = readFileSync(path.join(distDir, 'index.html'), 'utf8')
const headLinks = (indexHtml.match(/<link[^>]*>/g) || [])
  .filter((l) => /stylesheet|fonts\.googleapis|fonts\.gstatic|preconnect/.test(l))
  .join('\n    ')

const jsonLd = (obj) => JSON.stringify(obj, null, 2).replace(/</g, '\\u003c')

const softwareApplicationLd = jsonLd({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tiger Claw',
  applicationCategory: 'BusinessApplication',
  url: `${SITE}/`,
  description:
    'Autonomous AI follow-up agent for independent distributors, affiliates, social sellers, and relationship-driven operators. Built by Brent Bryson.',
  author: {
    '@type': 'Person',
    '@id': 'https://brentbryson.ai/#brent-bryson',
    name: 'Brent Bryson',
    url: 'https://brentbryson.ai',
  },
})

function faqPageLd(category) {
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  })
}

function pageHtml(category, bodyInner) {
  const title = `Best AI Agent for ${category.titleTerm} | Tiger Claw`
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${category.metaDescription}" />
    <link rel="canonical" href="${SITE}/${category.slug}" />
    ${headLinks}
    <script type="application/ld+json">${faqPageLd(category)}</script>
    <script type="application/ld+json">${softwareApplicationLd}</script>
  </head>
  <body class="bg-[#0A0A0A]">
    ${bodyInner}
  </body>
</html>`
}

// 3. Render each category page to its own static page.
for (const category of categoryAnswers) {
  const inner = renderToStaticMarkup(createElement(CategoryAnswer, { slug: category.slug }))
  const slugDir = path.join(distDir, category.slug)
  mkdirSync(slugDir, { recursive: true })
  writeFileSync(path.join(slugDir, 'index.html'), pageHtml(category, inner))
}

console.log(`[prerender-category] wrote ${categoryAnswers.length} category answer pages`)
