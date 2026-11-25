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
const rowSel = (i) => `#main tr[data-index="${i}"]`
for (const [shape, opts] of Object.entries(shapes)) {
  for (const scheme of ['light', 'dark']) {
    const ctx = await browser.newContext({ ...opts, colorScheme: scheme })
    const page = await ctx.newPage()
    await page.goto(`${base}/masternodes`, { waitUntil: 'load' })
    await page.locator(rowSel(0)).waitFor({ timeout: 60000 })
    await page.waitForTimeout(2000)
    for (let i = 0; i < 40; i++) {
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
      await page.mouse.wheel(0, 300)
      await page.waitForTimeout(250)
      if (await page.locator('#main [data-infinite], #main .rx-pager, #main nav[aria-label]').count()) break
    }
    await page.waitForTimeout(4000)
    for (let i = 0; i < 200 && !(await page.locator(rowSel(99)).count()); i++) {
      await page.evaluate(() => window.scrollBy(0, -300))
      await page.waitForTimeout(60)
    }
    await page.evaluate((s) => document.querySelector(s)?.scrollIntoView({ block: 'center' }), rowSel(99))
    await page.waitForTimeout(1500)
    const last = await page.evaluate(() => Math.max(...Array.from(document.querySelectorAll('#main tr[data-index]'), (r) => Number(r.getAttribute('data-index')))))
    const dir = `${out}/comparison/${which}`
    mkdirSync(dir, { recursive: true })
    await page.screenshot({ path: `${dir}/${shape}-${scheme}.png` })
    notes.push({ which, shape, scheme, url: page.url(), highestDrawnIndex: last, at: new Date().toISOString() })
    await ctx.close()
  }
}
writeFileSync(notesFile, JSON.stringify(notes, null, 2))
await browser.close()
console.log(JSON.stringify(notes.filter((n) => n.which === which)))
