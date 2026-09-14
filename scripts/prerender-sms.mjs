// Render the existing interactive page into the built shell. Keep Vite's JS
// entry so the email-request form still works after the initial HTML loads.
import { createServer } from 'vite'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { Router } from 'wouter'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

const shell = readFileSync('dist/index.html', 'utf8')
if (!shell.includes('<div id="root"></div>')) {
  throw new Error('SMS prerender: built shell has no empty root')
}
const vite = await createServer({
  logLevel: 'error', server: { middlewareMode: true }, appType: 'custom',
})
let body
try {
  const { default: SmsOptIn } = await vite.ssrLoadModule('/src/pages/SmsOptIn.tsx')
  body = renderToString(createElement(Router, { ssrPath: '/sms' }, createElement(SmsOptIn)))
} finally {
  await vite.close()
}

const title = 'SMS Opt-In | Tiger Claw'
const description = 'Request Tiger Claw text messages. Review message frequency, rates, consent, STOP and HELP instructions, terms, and privacy before opting in.'
const html = shell
  // The homepage FAQ is not visible on this route. Keep its schema off SMS.
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
  .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
  .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*("\s*\/?>)/g, `$1${description}$2`)
  .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*("\s*\/?>)/g, `$1${title}$2`)
  .replace(/(<link rel="canonical" href="|<meta property="og:url" content=")https:\/\/tigerclaw\.io\//g, '$1https://tigerclaw.io/sms')
  .replace('maximum-scale=1', 'minimum-scale=1')
  .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)

mkdirSync('dist/sms', { recursive: true })
writeFileSync('dist/sms/index.html', html)
console.log('[prerender-sms] wrote interactive /sms with readable initial HTML')
