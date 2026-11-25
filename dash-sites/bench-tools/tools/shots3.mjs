import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
const [, , base, out, scheme = 'https'] = process.argv;
const shapes = { desktop: { viewport: { width: 1280, height: 800 } }, phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } };
const pages = [
  ['landing', `${scheme}://${base}/`, false],
  ['site', `${scheme}://d4shhq.${base}/`, false],
  ['notfound', `${scheme}://zq-no-such-name-7731.${base}/`, false],
  
];
const browser = await chromium.launch();
for (const [name, url, noSw] of pages) for (const color of ['light', 'dark']) for (const [shape, opts] of Object.entries(shapes)) {
  const ctx = await browser.newContext({ ...opts, colorScheme: color });
  if (noSw) await ctx.addInitScript(() => { delete Object.getPrototypeOf(navigator).serviceWorker; });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  if (name === 'site' || name === 'notfound') await page.waitForFunction(() => !document.title.startsWith('Loading') && !document.getElementById('step'), null, { timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const file = `${out}/${name}-${color}-${shape}.png`;
  await page.screenshot({ path: file });
  console.log(file, JSON.stringify(await page.title()));
  await ctx.close();
}
await browser.close();
