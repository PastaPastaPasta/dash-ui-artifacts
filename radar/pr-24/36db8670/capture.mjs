import { chromium, devices } from '@playwright/test'
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
const [which, base, out] = process.argv.slice(2)
const shapes = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
  phone: { ...devices['iPhone 13'] },
}
const browser = await chromium.launch()
const notesFile = `${out}/capture-notes.json`
const notes = existsSync(notesFile) ? JSON.parse(readFileSync(notesFile, 'utf8')) : []
for (const [shape, opts] of Object.entries(shapes)) {
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ ...opts, colorScheme: scheme })
    const page = await ctx.newPage()
    await page.goto(`${base}/platform/blocks`, { waitUntil: 'load' })
    const rows = page.locator('#main [data-row-id]')
    await rows.nth(24).waitFor({ timeout: 30000 })
    await page.waitForTimeout(1500)
    const before = await rows.count()
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await page.mouse.wheel(0, 200)
    await page.waitForTimeout(4000)
    const row25 = await rows.nth(24).getAttribute('data-row-id')
    await page.evaluate((id) => document.querySelector(`#main [data-row-id="${id}"]`)?.scrollIntoView({ block: 'center' }), row25)
    await page.waitForTimeout(1500)
    const after = await rows.count()
    const dir = `${out}/comparison/${which}`
    mkdirSync(dir, { recursive: true })
    await page.screenshot({ path: `${dir}/${shape}-${scheme}.png` })
    notes.push({ which, shape, scheme, url: page.url(), row25, rowsBefore: before, rowsAfter: after, at: new Date().toISOString() })
    await ctx.close()
  }
}
writeFileSync(notesFile, JSON.stringify(notes, null, 2))
await browser.close()
console.log(JSON.stringify(notes.filter((n) => n.which === which)))
