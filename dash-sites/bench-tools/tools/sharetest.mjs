import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
import { mkdtempSync, rmSync } from 'node:fs';
const profile = mkdtempSync('/work/scratch/dash-site/sharetest-');
const ctx = await chromium.launchPersistentContext(profile, { channel: 'chromium', headless: true });
const loaded = (p) => p.waitForFunction(() => document.title !== 'Loading from Dash Platform' && document.readyState === 'complete', null, { timeout: 180000 });
for (const name of ['d4shhq', 'zq-no-such-name-7731', 'dash']) {
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const t0 = Date.now();
  let verifier;
  ctx.on('requestfinished', async (r) => { if (/verifier/.test(r.url()) && !verifier) { const s = await r.sizes().catch(() => null); verifier = { ms: Date.now() - t0, sizes: s }; } });
  await page.goto(`https://${name}.dash.site/`, { waitUntil: 'commit' });
  await loaded(page);
  console.log(name, 'ready', Date.now() - t0, 'ms; verifier', JSON.stringify(verifier), 'title', await page.title());
  await cdp.detach();
  await page.close();
}
await ctx.close();
rmSync(profile, { recursive: true, force: true });
