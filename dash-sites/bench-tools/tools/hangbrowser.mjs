import { chromium } from '/work/scratch/dash-site/dash-sites/node_modules/playwright/index.mjs';
import { createServer } from 'node:http';
import https from 'node:https';
import { readFileSync } from 'node:fs';
const dir = '/work/scratch/dash-site/hang';
const server = createServer((req, res) => {
  const f = req.url === '/b.js' ? 'b.js' : 'index.html';
  res.writeHead(200, { 'Content-Type': f.endsWith('.js') ? 'text/javascript' : 'text/html' });
  res.end(readFileSync(`${dir}/${f}`));
}).listen(18977);
const hang = https.createServer({ key: readFileSync('/work/scratch/dash-site/slowproxy/key.pem'), cert: readFileSync('/work/scratch/dash-site/slowproxy/cert.pem') }, () => {}).listen(18978);
const browser = await chromium.launch({ channel: 'chromium', headless: true, args: ['--ignore-certificate-errors'] });
const page = await browser.newPage();
await page.goto('http://localhost:18977/');
await page.waitForFunction(() => typeof run === 'function');
const cases = [
  ['silent + 2 real nodes', ['https://127.0.0.1:18978', 'https://70.34.206.123:443', 'https://89.35.131.149:443']],
  ['silent + 2 real nodes', ['https://127.0.0.1:18978', 'https://70.34.206.123:443', 'https://89.35.131.149:443']],
  ['silent + 2 real nodes', ['https://127.0.0.1:18978', 'https://70.34.206.123:443', 'https://89.35.131.149:443']],
];
for (const [label, addresses] of [['silent node only', ['https://127.0.0.1:18978']], ...cases]) {
  const t0 = Date.now();
  const r = await page.evaluate(([a]) => run(a, 30000), [addresses]);
  console.log(label, JSON.stringify(r), 'wall', Date.now() - t0);
}
await browser.close();
server.close();
hang.close();
process.exit(0);
