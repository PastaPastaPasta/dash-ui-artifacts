import { chromium, devices } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const targets = { before: 'https://explorer.dashhq.org', after: 'https://explorer-next.dashhq.org' }
const shapes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  phone: { ...devices['iPhone 13'] },
}
const out = process.argv[2]
const browser = await chromium.launch()
const notes = []
for (const [which, base] of Object.entries(targets)) {
  for (const [shape, opts] of Object.entries(shapes)) {
    for (const scheme of ['light', 'dark']) {
      const ctx = await browser.newContext({ ...opts, colorScheme: scheme })
      const page = await ctx.newPage()
      await page.goto(`${base}/blocks?from=2200000`, { waitUntil: 'load' })
      await page.locator('a[href="/block/2200000"]').first().waitFor({ timeout: 30000 })
      await page.waitForTimeout(1500)
      const before = await page.locator('tbody tr, [data-row-id]').count()
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await page.mouse.wheel(0, 200)
      await page.waitForTimeout(4000)
      await page.evaluate(() =>
        document.querySelector('a[href="/block/2199981"]')?.scrollIntoView({ block: 'center' }),
      )
      await page.waitForTimeout(1500)
      const after = await page.locator('tbody tr, [data-row-id]').count()
      const dir = `${out}/comparison/${which}`
      mkdirSync(dir, { recursive: true })
      await page.screenshot({ path: `${dir}/${shape}-${scheme}.png` })
      const version = await page.evaluate(() => document.querySelector('meta[name="radar-build"]')?.getAttribute('content') ?? null)
      notes.push({ which, shape, scheme, url: page.url(), rowsBefore: before, rowsAfter: after, build: version, at: new Date().toISOString() })
      await ctx.close()
    }
  }
}
writeFileSync(`${out}/capture-notes.json`, JSON.stringify(notes, null, 2))
await browser.close()
console.log(JSON.stringify(notes))
