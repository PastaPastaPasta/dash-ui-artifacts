const path = require('node:path');
const fs = require('node:fs');
const { chromium, expect } = require(path.join(process.env.YAPPR_WORKTREE || '/tmp/yappr-fix-payment', 'node_modules/@playwright/test'));
const outputDir = __dirname;
const testnet = 'yWUs17ht6ZcAw2EgZkEetnaLW9uX3aWfsw';
const mainnet = 'XdZgS6gbprXuu2SpRgv2ygVL9FNqBrWAHJ';
const results = [];
(async () => {
  const browser = await chromium.launch();
  for (const [variant, port, revision] of [
    ['before', 4181, '4105c5d1c914f5d0838619da93c3b8d28b4a780e'],
    ['after', 4182, '57d2395ae22566f79b355baaf5fad13dcf347c34']
  ]) {
    for (const surface of ['type-modal', 'custom-modal', 'profile']) {
      const context = await browser.newContext({ viewport: { width: 1440, height: 1100 }, deviceScaleFactor: 1, colorScheme: 'light', locale: 'en-US', timezoneId: 'America/Chicago' });
      const page = await context.newPage();
      const route = surface === 'profile' ? 'profile-payment-validation' : 'payment-validation';
      await page.goto(`http://localhost:${port}/devnet/qa/${route}/`, { waitUntil: 'domcontentloaded' });
      await expect(page.getByTestId('fixture-ready')).toHaveText('Ready');
      if (surface === 'profile') {
        await page.getByPlaceholder('dash:XnNh3... or bitcoin:bc1...').fill('tdash:y123');
        await page.getByRole('button', { name: 'Add', exact: true }).click();
        await expect(page.getByTestId('uri-count')).toHaveText(variant === 'before' ? '1' : '0');
        if (variant === 'after') await expect(page.getByText(/Please enter a valid payment URI/)).toBeVisible();
      } else {
        if (surface === 'custom-modal') {
          await page.getByRole('button', { name: 'Custom URI', exact: true }).click();
          await page.getByPlaceholder('e.g., dash:XnNh3biq9...').fill('tdash:y123');
        } else {
          await page.getByPlaceholder('yxxxxxxxxxxxxxxxxxxxxxxxxYYYYYY').fill('y123');
        }
        await page.getByRole('button', { name: 'Add Payment', exact: true }).click();
        await expect(page.getByTestId('save-count')).toHaveText(variant === 'before' ? '1' : '0');
        if (variant === 'before') await expect(page.getByTestId('saved-uri')).toHaveText('tdash:y123');
        else await expect(page.locator('p[role="alert"]')).toHaveText('Enter a valid Dash testnet address (tdash:).');
      }
      await page.waitForTimeout(1000);
      const filename = `${variant}-${surface}.png`;
      await page.screenshot({ path: path.join(outputDir, filename) });
      const focusFilename = `${variant}-${surface}-focus.png`;
      const focus = surface === 'profile' ? page.locator('main .space-y-3').first() : page.locator('div.relative.w-full.max-w-md');
      await focus.screenshot({ path: path.join(outputDir, focusFilename) });
      results.push({ variant, revision, surface, filename, focusFilename, url: page.url(), passed: true, body: await page.locator('body').innerText() });
      await context.close();
    }
  }
  // Compatibility checks use the real after component and the same save observer.
  for (const [name, scheme, address, accepted] of [
    ['valid-testnet', 'Dash (Testnet)', testnet, true],
    ['valid-mainnet', 'Dash', mainnet, true],
    ['wrong-network', 'Dash', testnet, false],
  ]) {
    const context=await browser.newContext({viewport:{width:1440,height:1100}});
    const page=await context.newPage();
    await page.goto('http://localhost:4182/devnet/qa/payment-validation/');
    await expect(page.getByTestId('fixture-ready')).toHaveText('Ready');
    await page.getByText(scheme,{exact:true}).click();
    await page.locator('#payment-method-address').fill(address);
    await page.getByRole('button',{name:'Add Payment',exact:true}).click();
    await expect(page.getByTestId('save-count')).toHaveText(accepted ? '1' : '0');
    if(!accepted) await expect(page.locator('p[role="alert"]')).toHaveText('Enter a valid Dash mainnet address (dash:).');
    results.push({name,passed:true});
    await context.close();
  }
  for (const surface of ['modal','profile']) {
    const context=await browser.newContext({viewport:{width:1440,height:1100}});
    const page=await context.newPage();
    const uri=`tdash:${testnet}?amount=1.25&label=Test%20store`;
    if(surface==='modal') {
      await page.goto('http://localhost:4182/devnet/qa/payment-validation/');
      await expect(page.getByTestId('fixture-ready')).toHaveText('Ready');
      await page.getByRole('button',{name:'Custom URI',exact:true}).click();
      await page.getByPlaceholder('e.g., dash:XnNh3biq9...').fill(uri);
      await page.getByRole('button',{name:'Add Payment',exact:true}).click();
      await expect(page.getByTestId('save-count')).toHaveText('1');
      await expect(page.getByTestId('saved-uri')).toHaveText(uri);
    } else {
      await page.goto('http://localhost:4182/devnet/qa/profile-payment-validation/');
      await expect(page.getByTestId('fixture-ready')).toHaveText('Ready');
      await page.getByPlaceholder('dash:XnNh3... or bitcoin:bc1...').fill(uri);
      await page.getByRole('button',{name:'Add',exact:true}).click();
      await expect(page.getByTestId('accepted-uris')).toHaveText(JSON.stringify([uri]));
    }
    results.push({name:`query-parameters-preserved-${surface}`,passed:true});
    await context.close();
  }
  fs.writeFileSync(path.join(outputDir,'results.json'),JSON.stringify(results,null,2));
  console.log(JSON.stringify(results.map(({body,...result})=>result),null,2));
  await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
