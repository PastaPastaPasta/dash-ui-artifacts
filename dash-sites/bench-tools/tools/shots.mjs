import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
const [, , prefix, ...urls] = process.argv;
const out = '/work/scratch/dash-site/proofs';
const browser = await chromium.launch();
const shapes = { desktop: { viewport: { width: 1280, height: 800 } }, phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } };
for (const [name, url] of urls.map((u) => u.split('='))) {
  for (const scheme of ['light', 'dark']) for (const [shape, opts] of Object.entries(shapes)) {
    const ctx = await browser.newContext({ ...opts, colorScheme: scheme });
    const page = await ctx.newPage();
    const resp = await page.goto(url, { waitUntil: 'load', timeout: 60000 });
    await page.waitForTimeout(name === 'name' ? 15000 : 1500);
    const status = resp?.status();
    const file = `${out}/${prefix}-${name}-${scheme}-${shape}.png`;
    await page.screenshot({ path: file });
    console.log(file, status, JSON.stringify((await page.title())), (await page.locator('h1').first().textContent().catch(() => '')));
    await ctx.close();
  }
}
await browser.close();
