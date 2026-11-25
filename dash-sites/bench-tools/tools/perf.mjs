// Usage: node perf.mjs <url> <outdir> <label> [runs]
// Cold = new profile; warm = same tab reload with the worker alive; restart = new browser on the same profile.
import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [, , url, outDir, label, runsArg = '3'] = process.argv;
const runs = Number(runsArg);
mkdirSync(outDir, { recursive: true });
const CATS = ['devtools.timeline', 'v8', 'v8.wasm', 'disabled-by-default-v8.wasm.detailed', 'v8.execute', 'blink.user_timing', 'loading', 'ServiceWorker', 'disabled-by-default-devtools.timeline'].join(',');

async function measure(context, page, tag, fresh, target = url) {
  const requests = [];
  const t0 = Date.now();
  const onReq = (r) => requests.push({ r, start: Date.now() - t0 });
  const onDone = (r) => {
    const e = requests.find((x) => x.r === r);
    if (e) e.end = Date.now() - t0;
  };
  context.on('request', onReq);
  context.on('requestfinished', onDone);
  context.on('requestfailed', onDone);
  const browser = context.browser();
  const tracePath = join(outDir, `${label}-${tag}.trace.json`);
  if (browser) await browser.startTracing(page, { path: tracePath, categories: CATS.split(',') });
  const cdp = await context.newCDPSession(page);
  if (fresh) await page.goto(target, { waitUntil: 'commit', timeout: 120000 });
  else await page.reload({ waitUntil: 'commit', timeout: 120000 });
  let ready;
  try {
    await page.waitForFunction(() => !document.getElementById('step') && !document.title.startsWith('Loading'), null, { timeout: 180000, polling: 50 });
    ready = Date.now() - t0;
  } catch {
    ready = null;
  }
  const paint = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0];
    return { title: document.title, fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null, nav: n ? { responseEnd: n.responseEnd, domContentLoaded: n.domContentLoadedEventEnd, load: n.loadEventEnd } : null };
  });
  await page.waitForTimeout(500);
  if (browser) await browser.stopTracing();
  await cdp.detach();
  context.off('request', onReq);
  context.off('requestfinished', onDone);
  context.off('requestfailed', onDone);
  const net = requests.map(({ r, start, end }) => {
    const u = new URL(r.url());
    const t = r.timing();
    return { start, end: end ?? null, ms: end == null ? null : end - start, sw: !!r.serviceWorker(), url: u.host === new URL(target).host ? u.pathname : `${u.protocol}//${u.host}${u.pathname}`, method: r.method(), network: t.responseStart > 0 && t.connectEnd !== -1 ? 'conn' : t.responseStart > 0 ? 'net' : '-' };
  });
  return { tag, ready, ...paint, net };
}

function wasmTime(tracePath) {
  try {
    const { traceEvents } = JSON.parse(readFileSync(tracePath, 'utf8'));
    const sum = {};
    for (const e of traceEvents) {
      if (e.ph !== 'X' || !e.dur) continue;
      if (/wasm|Wasm/.test(e.name) || /v8\.compile|V8\.Compile|EvaluateScript|v8\.run/.test(e.name)) sum[e.name] = (sum[e.name] ?? 0) + e.dur / 1000;
    }
    return Object.fromEntries(Object.entries(sum).filter(([, v]) => v > 5).sort((a, b) => b[1] - a[1]).map(([k, v]) => [k, Math.round(v)]));
  } catch (error) {
    return { error: String(error) };
  }
}

const results = [];
const map = process.env.PERF_MAP;
const args = map ? [`--host-resolver-rules=MAP dash.site ${map}, MAP *.dash.site ${map}`, '--ignore-certificate-errors'] : [];
const other = url.replace(/^https:\/\/[^.]+\./, 'https://zq-no-such-name-7731.');
const browser = await chromium.launch({ channel: 'chromium', headless: true, args });
for (let i = 0; i < runs; i++) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  let page = await context.newPage();
  const cold = await measure(context, page, `cold${i}`, true);
  const warm = await measure(context, page, `warm${i}`, false);
  const cdp = await context.newCDPSession(page);
  await cdp.send('ServiceWorker.enable');
  await cdp.send('ServiceWorker.stopAllWorkers');
  await cdp.detach();
  await page.close();
  await new Promise((resolve) => setTimeout(resolve, 1000));
  page = await context.newPage();
  const stopped = await measure(context, page, `stopped${i}`, true);
  await page.close();
  page = await context.newPage();
  const second = await measure(context, page, `othername${i}`, true, other);
  await context.close();
  for (const r of [cold, warm, stopped, second]) {
    r.compile = wasmTime(join(outDir, `${label}-${r.tag}.trace.json`));
    results.push(r);
    console.log(label, r.tag, 'ready', r.ready, 'fcp', r.fcp, 'requests', r.net.length);
  }
}
await browser.close();
writeFileSync(join(outDir, `${label}.json`), JSON.stringify(results, null, 2));
