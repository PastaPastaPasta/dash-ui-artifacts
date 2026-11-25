import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
const [, , out, map = ''] = process.argv;
const args = map ? [`--host-resolver-rules=MAP dash.site ${map}, MAP *.dash.site ${map}`, '--ignore-certificate-errors'] : [];
const shapes = { desktop: { viewport: { width: 1280, height: 800 } }, phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } };
const browser = await chromium.launch({ args });
for (const [name, url] of [['landing', 'https://dash.site/'], ['opening', 'https://d4shhq.dash.site/']]) for (const color of ['light', 'dark']) for (const [shape, opts] of Object.entries(shapes)) {
  const ctx = await browser.newContext({ ...opts, colorScheme: color, ignoreHTTPSErrors: true });
  if (name === 'opening') await ctx.route(/dash-sites-verifier-/, () => {});
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  if (name === 'opening') await page.click('summary');
  await page.waitForTimeout(1500);
  const file = `${out}/${name}-${color}-${shape}.png`;
  await page.screenshot({ path: file, fullPage: true });
  console.log(file, JSON.stringify(await page.locator('main:not([hidden]) footer').innerText()));
  await ctx.close();
}
await browser.close();
