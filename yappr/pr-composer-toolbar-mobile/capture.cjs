const fs=require('node:fs');
const {run,expect}=require('/tmp/yappr-qa-browser.cjs');
const label=process.env.QA_LABEL,after=label==='after',dir='/tmp/yappr-toolbar-evidence';
const result={label,base:process.env.QA_BASE_URL,revision:process.env.QA_REVISION,postSubmissions:0,cases:[]};
const save=()=>fs.writeFileSync(`${dir}/${label}.json`,JSON.stringify(result,null,2));
run(async open=>{
 const{page:p,base}=await open(55,'/settings/?section=about');
 await expect(p.getByText(process.env.QA_REVISION.slice(0,8),{exact:false}).first()).toBeVisible({timeout:90000});
 result.aboutRevisionObserved=true;
 await p.goto(base+'/feed/',{waitUntil:'domcontentloaded'});
 for(const width of [320,390,1280]){
  await p.setViewportSize({width:1280,height:900});
  await p.getByRole('button',{name:'Post',exact:true}).click({timeout:90000});
  const d=p.getByRole('dialog',{name:'Create a new post',exact:true});
  await d.getByTestId('compose-textarea').fill('Mobile toolbar QA');
  await expect(d.getByTestId('visibility-selector')).toBeVisible({timeout:90000});
  await p.setViewportSize({width,height:width===1280?900:844});
  await p.waitForTimeout(300);
  const toolbar=d.getByRole('button',{name:'Add poll',exact:true}).locator('..');
  async function measure(state,bar){
   const buttons=await bar.locator('button').evaluateAll(es=>es.map(e=>{
    const b=e.getBoundingClientRect(),t=e.parentElement.getBoundingClientRect();
    return {name:e.getAttribute('aria-label')||e.title||e.textContent,x:b.x,y:b.y,width:b.width,height:b.height,insideToolbar:b.x>=t.x-0.5&&b.right<=t.right+0.5,insideViewport:b.x>=0&&b.right<=innerWidth,disabled:e.disabled};
   }));
   result.cases.push({width,state,buttons});
   if(after){expect(buttons.every(b=>b.insideToolbar&&b.insideViewport)).toBe(true);const enabled=bar.locator('button:not(:disabled)');await enabled.first().focus();for(let i=0;i<await enabled.count();i++){await expect(enabled.nth(i)).toBeFocused();if(i+1<await enabled.count())await p.keyboard.press('Tab');}result.cases.at(-1).keyboardOrderPassed=true;}
   if(!after&&width===320&&state==='single')expect(buttons.some(b=>!b.insideToolbar)).toBe(true);
   await d.getByTestId('compose-textarea').last().focus();await p.waitForTimeout(400);if(width===320)await p.screenshot({path:`${dir}/${label}-${state}.png`});
  }
  await measure('single',toolbar);
  if(after){
   await d.getByRole('button',{name:'Add poll',exact:true}).click();
   await expect(d.getByRole('button',{name:'Remove poll',exact:true}).first()).toBeVisible();
   await d.getByRole('button',{name:'Remove poll',exact:true}).first().click();
   await expect(d.getByRole('button',{name:'Add poll',exact:true})).toBeVisible();
   await d.getByTestId('compose-textarea').focus();await d.getByTestId('compose-textarea').press('ControlOrMeta+A');
   await d.getByRole('button',{name:'Bold (Ctrl+B)',exact:true}).click();
   await expect(d.getByTestId('compose-textarea')).toHaveValue('**Mobile toolbar QA**');
   await d.getByTestId('compose-textarea').fill('Mobile toolbar QA');
  }
  await d.getByRole('button',{name:'Add to thread',exact:false}).click();
  const second=d.getByTestId('compose-textarea').nth(1);
  await second.fill('Second toolbar QA');
  const remove=d.getByRole('button',{name:'Remove this post',exact:true});
  await measure('thread',remove.locator('..'));
  if(after){await remove.click();await expect(d.getByTestId('compose-textarea')).toHaveCount(1);}
  await d.locator('button').first().click();
  await expect(d).toHaveCount(0);
 }
 save();console.log('toolbar capture passed',label,result.cases.length);
}).catch(e=>{result.failure=e.message;save();console.error(e.message);process.exitCode=1;});
