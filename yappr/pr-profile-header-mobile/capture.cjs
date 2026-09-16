const fs=require('node:fs');
const {run,expect}=require('/tmp/yappr-qa-browser.cjs');
const dir='/tmp/yappr-profile-header-evidence',label=process.env.QA_LABEL;
fs.mkdirSync(dir,{recursive:true});
run(async open=>{
 const {page:p,base,identity}=await open(55,'/user/?id={id}');
 const result={base,identity,label,checks:[]};
 await expect(p.getByRole('button',{name:'Edit profile',exact:true})).toBeVisible({timeout:90000});
 async function measure(state,width,buttons){
  await p.evaluate(()=>scrollTo(0,0));
  const geometry=[];
  for(const name of buttons){const b=p.getByRole('button',{name,exact:true}); if(await b.count()) geometry.push({name,...await b.boundingBox()});}
  result.checks.push({state,width,geometry});
  if(label==='after')for(const box of geometry){expect(box.x).toBeGreaterThanOrEqual(0);expect(box.x+box.width).toBeLessThanOrEqual(width+0.5);}
  if(width===320)await p.screenshot({path:`${dir}/${label}-${state}-${width}.png`});
 }
 for(const width of [320,390,1280]){
  await p.setViewportSize({width,height:width===1280?900:844});
  await measure('owner-read',width,['Share profile','Settings','Edit profile']);
  await p.getByRole('button',{name:'Edit profile',exact:true}).click();
  await expect(p.getByRole('button',{name:'Save',exact:true})).toBeVisible();
  await measure('owner-edit',width,['Share profile','Settings','Cancel','Save']);
  const name=p.locator('input').filter({visible:true}).first();
  const prior=await name.inputValue();await name.fill(prior+' draft');
  await p.getByRole('button',{name:'Cancel',exact:true}).click();
  await expect(p.getByRole('button',{name:'Edit profile',exact:true})).toBeVisible();
  await p.getByRole('button',{name:'Edit profile',exact:true}).click();
  expect(await p.locator('input').filter({visible:true}).first().inputValue()).toBe(prior);
  await p.getByRole('button',{name:'Cancel',exact:true}).click();
 }
 await p.goto(base+'/user/?id=A48nBj6ncVpDHrCdx84uaqSRtHR3p6ZuwdqLXfgbEpRW');
 await expect(p.getByRole('button',{name:'Follow',exact:true}).or(p.getByRole('button',{name:'Following',exact:true}))).toBeVisible({timeout:90000});
 for(const width of [320,390,1280]){
  await p.setViewportSize({width,height:width===1280?900:844});
  await measure('other-profile',width,['Share profile','Tip Bianca Laurent','Message Bianca Laurent','Follow','Following']);
 }
 fs.writeFileSync(dir+'/'+label+'.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
}).catch(e=>{console.error(e.message);process.exitCode=1});
