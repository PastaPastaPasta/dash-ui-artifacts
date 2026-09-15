import fs from 'node:fs';
import assert from 'node:assert/strict';
import {connectSdk} from '/Users/pasta/.t3/worktrees/yappr/guest-connections/scripts/sdk-env.mjs';
process.env.NETWORK='devnet';
const actor='6XrmCbPVLPWyda1fRTeFNZ9xhx8tdPH5rkNmtG9FWqek',author='sNnNFK4vrjhy6nPYpj2FSUhREY8CRG3QZscn61nXhAg',post='9mcdDNznWP86bScjmMykF1kzNpecneoFoZVVNAB5qCFd',contract='CdUkSHkQwGXXAkzKqrcrjUWLsj7qErK9XAZmLzJEhirU';
const sdk=await connectSdk({timeoutMs:15000});await sdk.contracts.fetch('GWRSAVFMjXx8HpQFaNJMqBV7MBgMK4br5UESsB4S31Ec');
const result={actor,author,post,contract,capturedAt:new Date().toISOString()};
for(const [type,where,orderBy] of [['follow',[['$ownerId','==',actor],['followingId','==',author]],undefined],['repost',[['$ownerId','==',actor],['postId','in',[post]]],[['$ownerId','asc'],['postId','asc']]],['reply',[['$ownerId','==',actor],['$createdAt','>',0]],[['$createdAt','desc']]]]){
const r=await sdk.documents.query({dataContractId:contract,documentTypeName:type,where,...(orderBy?{orderBy}:{}),limit:type==='reply'?100:1});assert(r instanceof Map);const records=[...r.entries()].filter(([,v])=>v!==undefined).map(([id,v])=>({id,data:v.toJSON()}));result[type]={count:records.length,records};
}
const label=process.argv[2]||'current';fs.writeFileSync('/tmp/yappr-review-evidence/social-persona33/'+label+'.json',JSON.stringify(result,(_,v)=>typeof v==='bigint'?v.toString():v,2));console.log(JSON.stringify({label,actor,follow:result.follow.count,repost:result.repost.count,replies:result.reply.records.map(x=>({id:x.id,content:x.data.content,rootPostId:x.data.rootPostId}))}));process.exit(0);
