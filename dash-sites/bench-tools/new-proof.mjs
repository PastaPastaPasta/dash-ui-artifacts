import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
const [identityFile, label, outDir] = process.argv.slice(2);
const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'packages', 'builder', 'dist');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer((req, res) => {
  const path = normalize(new URL(req.url, 'http://x').pathname);
  const file = join(dist, path.endsWith('/') ? `${path}index.html` : path);
  if (!file.startsWith(dist) || !existsSync(file) || !statSync(file).isFile()) return res.writeHead(404).end();
  res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const browser = await chromium.launch();
try {
  for (const scheme of (process.env.SCHEMES ?? 'light,dark').split(',')) for (const [size, viewport] of [['desktop', { width: 1280, height: 900 }], ['phone', { width: 390, height: 844 }]].filter(([s]) => (process.env.SIZES ?? 'desktop,phone').includes(s))) {
    const ctx = await browser.newContext({ viewport, colorScheme: scheme, ...(size === 'phone' ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}) });
    const page = await ctx.newPage();
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.screenshot({ path: join(outDir, `new-start-${scheme}-${size}.png`), fullPage: true });
    if (await page.isVisible('#identity-file')) await page.setInputFiles('#identity-file', identityFile);
    else { await page.click('summary, #key-toggle', { timeout: 5000 }).catch(() => {}); await page.setInputFiles('#identity-file', identityFile); }
    await page.waitForSelector('#step-signin .done:not([hidden])', { timeout: 90000 });
    await page.waitForFunction(() => document.getElementById('balance')?.textContent !== '', undefined, { timeout: 60000 });
    await page.locator('#names button', { hasText: new RegExp(`^${label}\\.dash$`) }).click();
    await page.waitForSelector('#step-content:not([inert])');
    await page.fill('#title', 'Made with the Dash Sites builder');
    await page.fill('#tagline', 'Published on the final dash-sites contract (testnet 5BS87xCm…).');
    await page.waitForTimeout(600);
    await page.screenshot({ path: join(outDir, `new-ready-${scheme}-${size}.png`), fullPage: true });
    await page.locator('#frame').scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await page.screenshot({ path: join(outDir, `new-preview-${scheme}-${size}.png`) });
    console.log('frame h1', await page.frameLocator('#frame').locator('h1').textContent().catch((e) => 'ERR ' + e.message));
    console.log('ok', scheme, size, await page.textContent('#cost'));
    await ctx.close();
  }
} finally { await browser.close(); server.close(); }
