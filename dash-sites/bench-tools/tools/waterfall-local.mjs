// One cold visit, every request (page and worker) with start, end and connection timing, relative to navigation.
process.env.PW_EXPERIMENTAL_SERVICE_WORKER_NETWORK_EVENTS ??= '1';
const { chromium } = await import('/work/scratch/dash-site/dash-sites/node_modules/playwright-core/index.mjs');
const [, , url, exe = '', proxy = '', runs = '1'] = process.argv;
const browser = await chromium.launch({ headless: true, args: process.env.CHROME_ARGS ? process.env.CHROME_ARGS.split('|') : [], ...(proxy ? { proxy: { server: proxy } } : {}), ...(exe ? { executablePath: exe } : { channel: 'chromium' }) });
for (let run = 0; run < Number(runs); run++) {
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  const reqs = [];
  const t0 = Date.now();
  ctx.on('request', (r) => reqs.push({ r, s: Date.now() - t0 }));
  ctx.on('requestfinished', (r) => { const e = reqs.find((x) => x.r === r); if (e) e.e = Date.now() - t0; });
  ctx.on('requestfailed', (r) => { const e = reqs.find((x) => x.r === r); if (e) { e.e = Date.now() - t0; e.fail = r.failure()?.errorText; } });
  await page.goto(url, { waitUntil: 'commit' });
  await page.waitForFunction(() => !document.getElementById('step') && !document.title.startsWith('Loading'), null, { timeout: 120000, polling: 20 });
  const ready = Date.now() - t0;
  console.log(`--- run ${run} ready ${ready} ms`);
  for (const { r, s, e, fail } of reqs) {
    const u = new URL(r.url());
    const t = r.timing();
    const conn = t.connectStart >= 0 ? `conn ${Math.round(t.connectEnd - t.connectStart)} tls ${t.secureConnectionStart >= 0 ? Math.round(t.connectEnd - t.secureConnectionStart) : '-'}` : 'reused';
    const ttfb = t.responseStart >= 0 ? Math.round(t.responseStart - Math.max(0, t.requestStart)) : '-';
    console.log([String(s).padStart(5), String(e ?? '').padStart(5), String((e ?? s) - s).padStart(5), r.serviceWorker() ? 'SW ' : 'pg ', r.method().padEnd(4), `${u.host}${u.pathname}`.slice(0, 90).padEnd(90), conn, `ttfb ${ttfb}`, fail ?? ''].join(' '));
  }
  await ctx.close();
}
await browser.close();
