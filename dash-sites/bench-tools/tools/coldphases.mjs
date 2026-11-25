// Cold first-visit phases for one URL, N runs, each in a fresh incognito context.
import { chromium } from 'playwright-core';
const [, , url, runsArg = '5', exe = '', proxy = ''] = process.argv;
const browser = await chromium.launch({ headless: true, args: process.env.CHROME_ARGS ? process.env.CHROME_ARGS.split(' ') : [], ...(proxy ? { proxy: { server: proxy } } : {}), ...(exe ? { executablePath: exe } : { channel: 'chromium' }) });
const rows = [];
for (let i = 0; i < Number(runsArg); i++) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const reqs = [];
  const t0 = Date.now();
  ctx.on('request', (r) => reqs.push({ r, s: Date.now() - t0 }));
  ctx.on('requestfinished', (r) => { const e = reqs.find((x) => x.r === r); if (e) e.e = Date.now() - t0; });
  await page.goto(url, { waitUntil: 'commit' });
  await page.waitForFunction(() => !document.getElementById('step') && !document.title.startsWith('Loading'), null, { timeout: 120000, polling: 20 });
  const ready = Date.now() - t0;
  const find = (re, m) => reqs.find((x) => re.test(x.r.url()) && (!m || x.r.method() === m));
  const html = reqs[0];
  const sw = find(/\/sw\.js/);
  const vs = reqs.filter((x) => /dash-sites-verifier-/.test(x.r.url()) && x.e);
  const v = { s: Math.min(...vs.map((x) => x.s)), e: Math.max(...vs.map((x) => x.e)) };
  const q = find(/quorums\./);
  const dapi = reqs.filter((x) => /dapi\.v0\.Platform/.test(x.r.url()) && x.r.method() === 'POST');
  const sitejson = find(/site\.json/);
  const reset = find(/dash\/reset/);
  const proofs = dapi.filter((x) => x.s < sitejson.e && /getDocuments/.test(x.r.url()));
  const chunks = dapi.filter((x) => x.s >= sitejson.e);
  rows.push({
    ready,
    html: html.e,
    vstart: v.s,
    swjs: `${sw.s}-${sw.e}`,
    download: v.e - v.s,
    startup: q.s - v.e,
    quorums: Math.max(...reqs.filter((x) => /quorums\./.test(x.r.url())).map((x) => x.e)) - q.s,
    proofs: `${proofs.length}q ${sitejson.e - Math.min(...proofs.map((x) => x.s))}`,
    proofEach: proofs.map((x) => x.e - x.s).join('/'),
    reload: reset ? reset.s - sitejson.e : null,
    chunks: `${chunks.length}q ${ready - (reset?.s ?? sitejson.e)}`,
    chunkEach: chunks.map((x) => x.e - x.s).join('/'),
  });
  await ctx.close();
}
console.table(rows);
await browser.close();
