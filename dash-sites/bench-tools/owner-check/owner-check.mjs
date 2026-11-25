import { connectSdk } from '@dash-sites/core/evo';
import { readerConfig, DPNS_CONTRACT_ID } from '@dash-sites/core';
const label = process.argv[2] ?? 'dem02026';
const node = process.argv[3];
const config = readerConfig('testnet');
const where = [['normalizedParentDomainName', '==', 'dash'], ['normalizedLabel', '==', label]];
const contract = { dataContractId: config.contractId };
const chunks = { ...contract, documentType: 'chunk', bind: { source: 0, sourceProperty: '$id', field: 'site' }, limit: 32 };
const withCheck = { dataContractId: DPNS_CONTRACT_ID, documentType: 'domain', where, limit: 1,
  subQueries: [{ ...contract, documentType: 'site', where, bind: { sourceProperty: '$ownerId', field: '$ownerId' } }, chunks] };
const withoutCheck = { ...contract, documentType: 'site', where, limit: 1, subQueries: [{ ...chunks, bind: { sourceProperty: '$id', field: 'site' } }] };
const variants = { withCheck, withoutCheck };
const opts = node ? { addresses: [node] } : {};
async function timed(sdk, q) {
  const c0 = process.cpuUsage(); const t0 = performance.now();
  const r = await sdk.documents.compositeWithProof(q);
  const ms = performance.now() - t0; const cpu = process.cpuUsage(c0);
  return { ms, cpu: (cpu.user + cpu.system) / 1000, r };
}
const med = (xs) => { const s = [...xs].sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; };
const out = { warm: { withCheck: [], withoutCheck: [] }, warmCpu: { withCheck: [], withoutCheck: [] }, cold: { withCheck: [], withoutCheck: [] } };
const sdk = await connectSdk(config, opts);
for (const name of Object.keys(variants)) { const { r } = await timed(sdk, variants[name]); console.log(name, 'sample', JSON.stringify(r.data, (k, v) => typeof v === 'bigint' ? String(v) : v).slice(0, 160)); }
const N = Number(process.env.N ?? 40);
for (let i = 0; i < N; i++) for (const name of (i % 2 ? ['withCheck', 'withoutCheck'] : ['withoutCheck', 'withCheck'])) {
  const { ms, cpu } = await timed(sdk, variants[name]); out.warm[name].push(ms); out.warmCpu[name].push(cpu);
}
const C = Number(process.env.C ?? 8);
for (let i = 0; i < C; i++) for (const name of (i % 2 ? ['withCheck', 'withoutCheck'] : ['withoutCheck', 'withCheck'])) {
  const fresh = await connectSdk(config, opts); const { ms } = await timed(fresh, variants[name]); out.cold[name].push(ms);
}
for (const k of ['warm', 'warmCpu', 'cold']) console.log(k, 'median ms', 'withCheck', med(out[k].withCheck).toFixed(1), 'withoutCheck', med(out[k].withoutCheck).toFixed(1), 'n', out[k].withCheck.length);
console.log(JSON.stringify(out));
