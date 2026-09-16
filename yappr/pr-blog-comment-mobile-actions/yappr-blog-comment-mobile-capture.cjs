const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
const phase=process.env.QA_PHASE,dir='/tmp/yappr-blog-comment-mobile-evidence/'+phase;fs.mkdirSync(dir,{recursive:true});
run(async open=>{
const out=[];
for(const width of [320,390,1280]){
const{page:p,context,identity}=await open(65,'/blog/?blog=BdMQRKM6xT8jx4bKbkhP3wYo7V835pDjcEWTbN5PMNRU&post=qa-pagination-fixture-02-p64');await p.setViewportSize({width,height:width===1280?1000:844});const row=p.locator('article').filter({hasText:'QA143 temporary comment — mobile layout.'}).last();await expect(row).toBeVisible({timeout:90000});
const targetY=width===320?272.5:width===390?372.5:717;await row.evaluate((el,y)=>scrollTo({top:el.getBoundingClientRect().top+scrollY-y,behavior:'instant'}),targetY);await p.waitForTimeout(400);
const bounds=await row.evaluate(el=>{const name=[...el.querySelectorAll('span')].find(x=>x.textContent==='@cookingadrian5');const time=[...el.querySelectorAll('span')].filter(x=>/^(?:\d+|a|an|just|now)/.test(x.textContent)&&/(?:ago|now)/.test(x.textContent)).at(-1);const button=el.querySelector('button');const body=el.querySelector('p');const rect=x=>{if(!x)return null;const r=x.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom,text:x.textContent}};return{row:rect(el),name:rect(name),timestamp:rect(time),button:rect(button),body:rect(body),documentWidth:document.documentElement.scrollWidth,viewport:innerWidth}});
if(!bounds.timestamp||!bounds.button||!bounds.name)throw Error('Missing metadata bounds');const overlaps=(a,b)=>a.x<b.right&&a.right>b.x&&a.y<b.bottom&&a.bottom>b.y;bounds.timestampOverlapsDelete=overlaps(bounds.timestamp,bounds.button);bounds.nameOverlapsDelete=overlaps(bounds.name,bounds.button);bounds.nameOverlapsTimestamp=overlaps(bounds.name,bounds.timestamp);
if(phase==='after'){expect(bounds.timestampOverlapsDelete).toBe(false);expect(bounds.nameOverlapsDelete).toBe(false);expect(bounds.nameOverlapsTimestamp).toBe(false);expect(bounds.documentWidth).toBeLessThanOrEqual(width);expect(bounds.button.right).toBeLessThanOrEqual(bounds.row.right);expect(bounds.name.right).toBeLessThanOrEqual(bounds.button.x);}
await p.screenshot({path:dir+'/comment-'+width+'.png'});out.push({phase,width,identity,bounds});await context.close();
}
fs.writeFileSync(dir+'/results.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out));
});
