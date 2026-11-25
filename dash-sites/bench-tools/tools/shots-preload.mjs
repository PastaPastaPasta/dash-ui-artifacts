import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
const [, , out, map = '', extra = ''] = process.argv;
const args = map ? [`--host-resolver-rules=MAP dash.site ${map}, MAP *.dash.site ${map}`, '--ignore-certificate-errors'] : [];
const shapes = { desktop: { viewport: { width: 1280, height: 800 } }, phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } };
const url = 'https://d4shhq.dash.site/';
const browser = await chromium.launch({ args });
async function shot(name, color, shape, prepare) {
  const ctx = await browser.newContext({ ...shapes[shape], colorScheme: color, ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  await prepare(ctx, page);
  const file = `${out}/${name}-${color}-${shape}.png`;
  await page.screenshot({ path: file });
  console.log(file);
  await ctx.close();
}
const slowWasm = async (ctx) => {
  await ctx.route(/\.wasm\.br$/, async (route) => {
    const response = await route.fetch();
    const body = await response.body();
    await new Promise((r) => setTimeout(r, 1500));
    await route.fulfill({ response, body });
  });
};
for (const color of ['light', 'dark']) for (const shape of ['desktop', 'phone']) {
  await shot('loading', color, shape, async (ctx, page) => {
    await ctx.route(/dash-sites-verifier-.*\.wasm\.br$/, () => {});
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1200);
  });
  if (extra) {
    await shot('details', color, shape, async (ctx, page) => {
      await ctx.route(/dash-sites-verifier-.*\.wasm\.br$/, () => {});
      await page.goto(url, { waitUntil: 'load' });
      await page.click('summary');
      await page.waitForTimeout(800);
    });
    await shot('error', color, shape, async (ctx, page) => {
      await ctx.route(/\/sw\.js$/, (route) => route.fulfill({ status: 404, body: '' }));
      await page.goto(url, { waitUntil: 'load' });
      await page.waitForTimeout(1500);
    });
  }
}
await browser.close();
