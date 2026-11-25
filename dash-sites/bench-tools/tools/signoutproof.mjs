import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
const [, , base, out] = process.argv;
mkdirSync(out, { recursive: true });
const identity = `${homedir()}/.local/share/dash-sites/testnet-deployer.identity.json`;
const shapes = { desktop: { viewport: { width: 1280, height: 900 } }, phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true } };
const browser = await chromium.launch({ channel: 'chromium', headless: true });
const signedIn = (page) => page.waitForSelector('#step-signin .done:not([hidden])', { timeout: 90000 });
const signIn = async (page) => {
  await page.setInputFiles('#identity-file', identity);
  await signedIn(page);
};
const state = (page) =>
  page.evaluate(() => ({
    signedIn: !document.querySelector('#step-signin .done').hidden,
    keyField: document.getElementById('key').value.length,
    localStorage: Object.keys(localStorage),
    sessionStorage: Object.keys(sessionStorage),
    cookies: document.cookie,
    notice: document.getElementById('signed-out').textContent,
  }));
const shot = async (page, name) => {
  await page.screenshot({ path: `${out}/${name}.png`, fullPage: false });
};
for (const color of ['light', 'dark']) for (const [shape, opts] of Object.entries(shapes)) {
  const tag = `${color}-${shape}`;
  const ctx = await browser.newContext({ ...opts, colorScheme: color });
  const page = await ctx.newPage();
  await page.clock.install();
  await page.goto(`${base}/new`);
  await page.fill('#title', 'Drafted before signing in');
  await page.locator('#step-content').scrollIntoViewIfNeeded();
  await shot(page, `1-edit-signed-out-${tag}`);
  await page.locator('#step-signin').scrollIntoViewIfNeeded();
  await signIn(page);
  await page.locator('#step-signin').scrollIntoViewIfNeeded();
  await shot(page, `2-signed-in-${tag}`);
  const before = await state(page);
  await page.clock.fastForward('10:05');
  await page.waitForFunction(() => document.getElementById('signed-out').textContent.includes('10 minutes'), null, { timeout: 10000 });
  await shot(page, `3-idle-signed-out-${tag}`);
  const idle = await state(page);
  console.log(tag, 'signed in:', JSON.stringify(before));
  console.log(tag, 'after 10 min idle:', JSON.stringify(idle));
  if (tag === 'light-desktop') {
    await signIn(page);
    await page.reload();
    await page.waitForLoadState('load');
    await page.waitForTimeout(1500);
    console.log(tag, 'after reload:', JSON.stringify(await state(page)));
    await shot(page, '4-after-reload-light-desktop');
    await signIn(page);
    await page.click('#signout');
    console.log(tag, 'after Sign out button:', JSON.stringify(await state(page)));
    await shot(page, '5-sign-out-button-light-desktop');
    await signIn(page);
    await page.goto('about:blank');
    await page.goBack();
    await page.waitForTimeout(1500);
    console.log(tag, 'after leaving and coming back (pagehide, bfcache):', JSON.stringify(await state(page)));
    await shot(page, '6-after-leaving-light-desktop');
    await signIn(page);
    await page.clock.setSystemTime(Date.now() + 8 * 3600_000);
    await page.mouse.click(5, 5);
    await page.waitForTimeout(300);
    console.log(tag, 'after 8 h asleep, first click:', JSON.stringify(await state(page)));
    await page.click('#key-signin summary');
    await page.fill('#key', 'cNotARealKeyJustTypedButNeverSubmitted');
    await page.goto('about:blank');
    await page.goBack();
    await page.waitForTimeout(1500);
    console.log(tag, 'typed key, left without signing in, came back:', JSON.stringify(await state(page)));
  }
  await ctx.close();
}
await browser.close();
