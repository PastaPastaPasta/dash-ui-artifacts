// Cold then warm visits in one persistent profile: network requests (not disk/SW cache), bytes, load time.
import { chromium } from 'playwright-core';
import { mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
const [, , url, runs = '3', exe = '', proxy = ''] = process.argv;
const settle = async (page) => {
  if (/\/new|dash\.site\/$/.test(url) && !/\.dash\.site/.test(url)) await page.waitForLoadState('load');
  else await page.waitForFunction(() => document.title !== 'Loading from Dash Platform' && document.readyState === 'complete', null, { timeout: 120000 });
  await page.waitForTimeout(1500);
};
async function visit(context, label) {
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  const net = [];
  cdp.on('Network.responseReceived', ({ requestId, response }) => {
    if (!response.fromDiskCache && !response.fromServiceWorker && !response.fromPrefetchCache && !response.url.startsWith('data:')) net.push({ requestId, url: response.url, status: response.status });
  });
  const bytes = new Map();
  cdp.on('Network.loadingFinished', ({ requestId, encodedDataLength }) => bytes.set(requestId, encodedDataLength));
  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'commit' });
  await settle(page);
  const ms = Date.now() - t0 - 1500;
  const mine = net.filter((r) => /dash\.site/.test(new URL(r.url).host));
  const kb = Math.round(mine.reduce((s, r) => s + (bytes.get(r.requestId) ?? 0), 0) / 1024);
  console.log(JSON.stringify({ label, ms, dashSiteRequests: mine.length, kb, list: mine.map((r) => `${r.status} ${new URL(r.url).pathname.replace(/[0-9a-f]{16}/, 'H')}`) }));
  await page.close();
}
for (let i = 0; i < Number(runs); i++) {
  const profile = mkdtempSync(join(tmpdir(), 'warm-'));
  const context = await chromium.launchPersistentContext(profile, { headless: true, ignoreHTTPSErrors: true, args: process.env.MAP ? [`--host-resolver-rules=MAP dash.site ${process.env.MAP}`] : [], ...(exe ? { executablePath: exe } : { channel: 'chromium' }), ...(proxy ? { proxy: { server: proxy } } : {}) });
  await visit(context, 'cold');
  await visit(context, 'warm1');
  await visit(context, 'warm2');
  await context.close();
}
