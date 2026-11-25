const R = '/work/scratch/dash-site/dash-sites/packages/core/dist';
const { EvoReader } = await import(`${R}/evo.js`);
for (const network of ['testnet', 'mainnet']) {
  const r = await EvoReader.connect({ network, contractId: '' });
  const sdk = r.sdk;
  const out = {};
  for (const [ns, fn] of [['system', 'status'], ['epoch', 'current']]) {
    try { out[`${ns}.${fn}`] = JSON.stringify(await sdk[ns][fn](), (k, v) => (typeof v === 'bigint' ? v.toString() : v)).slice(0, 700); } catch (e) { out[`${ns}.${fn}`] = 'ERR ' + e.message; }
  }
  console.log(network, out);
}
process.exit(0);
