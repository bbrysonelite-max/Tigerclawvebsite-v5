// scripts/indexnow.mjs
//
// Ping IndexNow with every URL in dist/sitemap.xml.
// IndexNow is the open protocol used by Bing, Yandex, Seznam, Naver, and Yep;
// one POST fans out to all of them. Google is not a participant.
//
// Behavior:
//   - Reads dist/sitemap.xml, extracts <loc> URLs.
//   - Sends a single JSON POST to https://api.indexnow.org/IndexNow.
//   - Silent no-op (exit 0) when INDEXNOW_KEY is unset, so local dev builds
//     don't fail. Only production/preview deploys with the env var set will
//     actually ping.
//   - Non-zero exit on API failure so a broken deploy is visible in Vercel
//     logs, but is downgraded to a warning when SKIP_INDEXNOW=1.

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const HOST = "tigerclaw.io";
const ENDPOINT = "https://api.indexnow.org/IndexNow";
const SITEMAP = resolve(ROOT, "dist", "sitemap.xml");

const KEY = process.env.INDEXNOW_KEY;
const KEY_LOCATION = KEY
  ? `https://${HOST}/${KEY}.txt`
  : null;

function log(msg) {
  console.log(`[indexnow] ${msg}`);
}

function extractUrls(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const u = m[1].trim();
    if (u.startsWith(`https://${HOST}/`) || u === `https://${HOST}`) {
      urls.push(u);
    }
  }
  return urls;
}

async function main() {
  if (!KEY) {
    log("INDEXNOW_KEY not set — skipping (local build or key not configured).");
    return;
  }
  if (!existsSync(SITEMAP)) {
    log(`no sitemap at ${SITEMAP} — did the build run?`);
    process.exit(process.env.SKIP_INDEXNOW ? 0 : 1);
  }
  const urls = extractUrls(readFileSync(SITEMAP, "utf8"));
  if (urls.length === 0) {
    log("sitemap parsed but no URLs found — skipping.");
    return;
  }
  log(`submitting ${urls.length} URL${urls.length === 1 ? "" : "s"} to IndexNow…`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.text();
  log(`response ${res.status} ${res.statusText}${body ? ` — ${body.slice(0, 200)}` : ""}`);

  // IndexNow returns:
  //   200 — URLs submitted
  //   202 — URLs received, key validation pending
  //   400/403/422/429 — problem; log and fail
  if (res.status !== 200 && res.status !== 202) {
    if (process.env.SKIP_INDEXNOW) {
      log("non-2xx but SKIP_INDEXNOW is set — not failing the build.");
      return;
    }
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[indexnow] error:", err);
  if (process.env.SKIP_INDEXNOW) {
    log("error but SKIP_INDEXNOW is set — not failing the build.");
    return;
  }
  process.exit(1);
});
