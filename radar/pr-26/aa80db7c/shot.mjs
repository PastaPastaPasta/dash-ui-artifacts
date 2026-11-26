import { chromium } from 'playwright'
const [url, out, mode = 'desktop', scheme = 'light', waitMs = '9000'] = process.argv.slice(2)
const browser = await chromium.launch()
const ctx = await browser.newContext(
  mode === 'phone'
    ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: scheme }
    : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme },
)
const page = await ctx.newPage()
await page.goto(url, { waitUntil: 'load', timeout: 60000 })
await page.waitForTimeout(Number(waitMs))
// scroll through to trigger lazy content, then back to top
const h = await page.evaluate(() => document.documentElement.scrollHeight)
for (let y = 0; y < h; y += 600) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(150) }
await page.evaluate(() => window.scrollTo(0, 0))
await page.waitForTimeout(1500)
await page.screenshot({ path: out, fullPage: true })
console.log(out, await page.evaluate(() => document.documentElement.scrollHeight))
await browser.close()
