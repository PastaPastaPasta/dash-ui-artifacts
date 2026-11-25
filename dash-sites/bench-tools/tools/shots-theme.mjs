import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
const APPDIR = process.env.APPDIR;
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.wasm': 'application/wasm' };
async function serveApp(ctx) {
  if (!APPDIR) return;
  await ctx.route(/^https:\/\/dash\.site\/(new|publish)(\/|$|\?)/, (route) => {
    let path = join(APPDIR, new URL(route.request().url()).pathname);
    if (existsSync(path) && statSync(path).isDirectory()) path = join(path, 'index.html');
    if (!existsSync(path)) return route.fulfill({ status: 404, body: '' });
    return route.fulfill({ status: 200, body: readFileSync(path), headers: { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' } });
  });
}
const [, , out, map = ''] = process.argv;
const args = map ? [`--host-resolver-rules=MAP dash.site ${map}, MAP *.dash.site ${map}`, '--ignore-certificate-errors'] : [];
const shapes = { desktop: { viewport: { width: 1280, height: 800 } }, phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } };
const pages = [
  ['landing', 'https://dash.site/', async () => {}],
  ['loading', 'https://d4shhq.dash.site/', async (ctx) => ctx.route(/dash-sites-verifier-.*\.wasm\.br$/, () => {})],
  ['error', 'https://d4shhq.dash.site/', async (ctx) => ctx.route(/\/sw\.js$/, (r) => r.fulfill({ status: 404, body: '' }))],
  ['notfound', 'https://zq-no-such-name-7731.dash.site/', async () => {}],
  ['missing-page', 'https://d4shhq.dash.site/no-such-page-7731', async () => {}],
  ['new', 'https://dash.site/new', async () => {}],
  ['publish', 'https://dash.site/publish', async () => {}],
];
const only = process.env.ONLY?.split(',');
const browser = await chromium.launch({ args });
for (const [name, url, prep] of pages) {
  if (only && !only.includes(name)) continue;
  for (const color of ['light', 'dark']) for (const [shape, opts] of Object.entries(shapes)) {
    const ctx = await browser.newContext({ ...opts, colorScheme: color, ignoreHTTPSErrors: true });
    await prep(ctx);
    await serveApp(ctx);
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 60000 }).catch(() => {});
    if (['notfound', 'missing-page'].includes(name)) await page.waitForFunction(() => document.title !== 'Loading from Dash Platform', null, { timeout: 90000 }).catch(() => {});
    await page.waitForTimeout(2000);
    const file = `${out}/${name}-${color}-${shape}.png`;
    await page.screenshot({ path: file, fullPage: !!process.env.FULL });
    console.log(file, JSON.stringify(await page.title()));
    await ctx.close();
  }
}
await browser.close();
