const R = '/work/scratch/dash-site/dash-sites/packages/core/dist';
const { EvoReader } = await import(`${R}/evo.js`);
const { resolveName, readerConfig } = await import(`${R}/index.js`);
for (const fetchContracts of [true, false, true, false]) {
  const t0 = Date.now();
  const r = await EvoReader.connect(readerConfig('mainnet'), { fetchContracts });
  const t1 = Date.now();
  const res = await resolveName(r, 'd4shhq');
  console.log({ fetchContracts, connect: t1 - t0, resolve: Date.now() - t1, status: res.status, content: res.site?.content?.slice(0, 30) });
}
process.exit(0);
