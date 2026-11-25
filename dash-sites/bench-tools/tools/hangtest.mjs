const R = '/work/scratch/dash-site/dash-sites/packages/core/dist';
const { connectSdk } = await import(`${R}/evo.js`);
const { readerConfig } = await import(`${R}/index.js`);
const [, , timeoutMs = '3000'] = process.argv;
const t0 = Date.now();
const sdk = await connectSdk(readerConfig('mainnet'), { addresses: ['https://198.51.100.7:443'], timeoutMs: Number(timeoutMs) });
console.log('connected', Date.now() - t0);
const t1 = Date.now();
try { await sdk.system.status(); console.log('ok'); } catch (e) { console.log('err', String(e).slice(0, 200)); }
console.log('query took', Date.now() - t1);
process.exit(0);
