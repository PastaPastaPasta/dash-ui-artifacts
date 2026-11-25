import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
const browser = await chromium.launch({ channel: 'chromium', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto('https://dash.site/new', { waitUntil: 'load' });
await page.fill('#title', 'Live draft before sign-in');
await page.waitForTimeout(800);
console.log(JSON.stringify({
  net: await page.textContent('#net'),
  contentInert: await page.$eval('#step-content', (e) => e.hasAttribute('inert')),
  publishInert: await page.$eval('#step-publish', (e) => e.hasAttribute('inert')),
  cost: await page.textContent('#cost'),
  preview: await page.frameLocator('#frame').locator('h1').first().textContent().catch(() => null),
  errors,
}));
await browser.close();
