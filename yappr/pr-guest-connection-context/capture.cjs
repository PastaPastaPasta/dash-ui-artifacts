// Run against independent production exports. Uses real guest UI and live devnet reads.
// PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.js node capture.cjs before http://127.0.0.1:3211/devnet 4105c5d1c914f5d0838619da93c3b8d28b4a780e
// PLAYWRIGHT_MODULE=/path/to/node_modules/playwright/index.js node capture.cjs after http://127.0.0.1:3222/devnet 980ab21326c76ae3649980f3510d3d9116b22428
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const [phase, baseUrl, revision] = process.argv.slice(2);
assert(['before', 'after'].includes(phase));
(async () => {
  const browser = await chromium.launch({headless:true});
  const images = [];
  for (const [layout, viewport] of Object.entries({desktop:{width:1280,height:900},mobile:{width:390,height:844}})) {
    for (const kind of ['followers','following']) {
      const context = await browser.newContext({viewport,deviceScaleFactor:1,colorScheme:'light',locale:'en-US',timezoneId:'America/Chicago'});
      const page = await context.newPage();
      const response = await page.request.get(baseUrl + '/');
      const buildId = (await response.text()).match(/\\?"buildId\\?":\\?"([^"\\]+)/)?.[1];
      assert.equal(buildId, revision.slice(0,8));
      await page.goto(baseUrl + '/' + kind + '/', {waitUntil:'domcontentloaded'});
      const main = page.getByRole('main');
      if (phase === 'before') {
        await main.getByRole('heading', {name: new RegExp(`^@User's ${kind === 'followers' ? 'Followers' : 'Following'}$`)}).waitFor({state:'visible'});
        await main.getByText(kind === 'followers' ? 'No followers yet' : 'Not following anyone yet', {exact:true}).waitFor({state:'visible'});
      } else {
        await main.getByRole('heading', {name:`Sign in to view your ${kind}`}).waitFor({state:'visible'});
        assert.equal(await main.getByText(/^0 (followers|users)$/).count(),0);
      }
      await page.waitForTimeout(700);
      const filename = `${kind}-${layout}.png`;
      const output = path.join(__dirname,'comparison',phase,filename);
      await page.screenshot({path:output,fullPage:false});
      const result = {filename,route:`/devnet/${kind}/`,viewport,revision,buildId,sha256:crypto.createHash('sha256').update(fs.readFileSync(output)).digest('hex')};
      if (phase === 'after') {
        if (kind === 'followers') {
          await main.getByRole('button',{name:'Sign In',exact:true}).click();
          await page.getByRole('dialog',{name:/Sign in to Yappr/}).waitFor({state:'visible'});
          result.recoveryAction = 'Sign In opened existing login dialog';
        } else {
          await main.getByRole('button',{name:'Explore Yappr'}).click();
          await page.getByPlaceholder('Search posts and blog articles').waitFor({state:'visible'});
          assert.equal(new URL(page.url()).pathname,'/devnet/explore/');
          result.recoveryAction = 'Explore Yappr opened /devnet/explore/';
        }
      }
      images.push(result);
      await context.close();
    }
  }
  fs.writeFileSync(path.join(__dirname,phase+'-assertions.json'), JSON.stringify({capturedAt:new Date().toISOString(),phase,revision,images},null,2)+'\n');
  await browser.close();
})();
