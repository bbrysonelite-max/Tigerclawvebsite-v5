// Run after the production build: node scripts/check-sms.mjs
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const file = process.argv[2] || 'dist/sms/index.html'
const html = readFileSync(file, 'utf8')
const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ')
const inputs = html.match(/<input\b[^>]*>/g) || []
const phone = inputs.find((input) => /type="tel"/.test(input))
const consent = inputs.find((input) => /type="checkbox"/.test(input))

assert.ok(phone, 'SMS HTML must include the phone input without JavaScript')
assert.match(phone, /\srequired(?:[\s=>])/, 'Phone must be required')
assert.ok(consent, 'SMS HTML must include explicit consent')
assert.match(consent, /\srequired(?:[\s=>])/, 'Consent must be required')
assert.doesNotMatch(consent, /\schecked(?:[\s=>])/, 'Consent must start unchecked')
for (const disclosure of [
  'I agree to receive recurring automated text messages',
  'Consent is not a condition of any purchase.',
  'Message and data rates may apply.',
  'Message frequency varies.',
  'Reply STOP to cancel, HELP for help.',
]) assert.ok(text.includes(disclosure), `Missing disclosure: ${disclosure}`)
assert.match(html, /href="\/legal\/terms"/, 'Terms must be linked')
assert.match(html, /href="\/legal\/privacy"/, 'Privacy must be linked')
assert.match(html, /<link\b(?=[^>]*rel="canonical")(?=[^>]*href="https:\/\/tigerclaw\.io\/sms")[^>]*>/, 'SMS canonical must match the public route')
assert.doesNotMatch(html, /style="[^"]*\bopacity:\s*0(?:[;"\s])/, 'Prerendered content must not depend on JS to become visible')
assert.doesNotMatch(text, /You're opted in/, 'Initial HTML must not claim enrollment')
assert.match(html, /<script\b[^>]*type="module"[^>]*src=/, 'Built interaction bundle must remain available')
assert.match(html, /<noscript>[\s\S]*?JavaScript is needed[\s\S]*?<\/noscript>/, 'No-JS visitors need an honest fallback')

const config = JSON.parse(readFileSync('vercel.json', 'utf8'))
const route = config.rewrites.find(({ source }) => source === '/sms')
assert.equal(route?.destination, '/sms/index.html', 'Vercel must serve the rendered SMS document')
assert.ok(config.redirects.some(({ source, destination }) => source === '/sms/' && destination === '/sms'), 'Trailing slash must reach the supported client route')
console.log(`PASS: ${file} has readable opt-in controls, disclosures, canonical, visible content, and the correct route`)
