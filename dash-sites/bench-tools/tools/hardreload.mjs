import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
const [, , url = 'https://d4shhq.dash.site/', map = '', times = '4', shot = '', color = 'light'] = process.argv;
const args = map ? [`--host-resolver-rules=MAP dash.site ${map}, MAP *.dash.site ${map}`, '--ignore-certificate-errors'] : [];
const browser = await chromium.launch({ args });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, ignoreHTTPSErrors: true, colorScheme: color, deviceScaleFactor: 2 });
const page = await ctx.newPage();
const settled = () => page.waitForFunction(() => document.title !== 'Loading from Dash Platform' && document.readyState === 'complete', null, { timeout: 90000 }).then(() => true, () => false);
await page.goto(url);
console.log('first visit', await settled(), await page.title());
const cdp = await ctx.newCDPSession(page);
for (let i = 1; i <= Number(times); i++) {
  const t = Date.now(); void cdp.send('Page.reload', { ignoreCache: true }).catch(() => {});
  await page.waitForTimeout(300);
  await page.waitForTimeout(300); const ok = await settled(); console.log('  took', Date.now() - t);
  console.log('  tries now', await page.evaluate(() => sessionStorage.getItem('dash-sites-boot')).catch(() => '?'), Date.now());
  const error = (await page.locator('#error').count()) ? await page.locator('#error').textContent() : null;
  console.log(`hard reload ${i}`, ok, JSON.stringify(await page.title()), error ? `error: ${error}` : '');
}
if (shot) await page.screenshot({ path: shot });
await browser.close();
