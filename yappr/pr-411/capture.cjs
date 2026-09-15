const { chromium } = require('/Users/pasta/.t3/worktrees/yappr-store-fix/node_modules/@playwright/test');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch();
  const report = [];
  for (const [variant, port, revision] of [
    ['before', 4178, '4105c5d1c914f5d0838619da93c3b8d28b4a780e'],
    ['after', 4177, '6cc35c1a671d03773acd5922d3812e9f228cfd35']
  ]) {
    for (const [size, width, height] of [['desktop', 1440, 1000], ['mobile', 390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, colorScheme: 'light', locale: 'en-US', timezoneId: 'America/Chicago', deviceScaleFactor: 1 });
      const page = await context.newPage();
      await page.goto(`http://localhost:${port}/devnet/store/view/`, { waitUntil: 'domcontentloaded' });
      await page.getByText('DEVNET', { exact: true }).first().waitFor();
      await page.waitForTimeout(5000);
      if (variant === 'after') await page.getByRole('heading', { name: 'Store link is missing an ID' }).waitFor();
      const file = `${variant}-${size}.png`;
      await page.screenshot({ path: `/tmp/yappr-store-evidence/${file}` });
      report.push({ variant, revision, file, viewport: { width, height }, url: page.url(), body: await page.locator('body').innerText() });
      await context.close();
    }
  }
  fs.writeFileSync('/tmp/yappr-store-evidence/captures.json', JSON.stringify(report, null, 2));
  await browser.close();
})();
