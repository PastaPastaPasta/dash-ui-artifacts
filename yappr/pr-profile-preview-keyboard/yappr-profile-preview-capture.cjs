const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
const phase=process.env.QA_PHASE;const dir='/tmp/yappr-profile-preview-evidence/'+phase;fs.mkdirSync(dir,{recursive:true});
run(async open=>{
const results=[];const post='Dr7Rkro6c4rp4BupbMHA5iXoKrSDtBqCTifWn9PioSrm';
for(const width of [1280,390]){
const {page:p,context,identity}=await open(76,'/user/?id=7q9PdfjVLCZbcLb8wDdExUCokYSdi9Gu251Fqne2jNv9');await p.setViewportSize({width,height:width===1280?900:844});await p.emulateMedia({colorScheme:'light'});
const article=p.getByTestId('post-card-'+post);const avatar=article.locator('a[href*="/user"]').first();await avatar.waitFor({timeout:60000});await avatar.scrollIntoViewIfNeeded();
const card=phase==='after'?p.getByRole('dialog',{name:'Profile preview'}):p.locator('[data-radix-popper-content-wrapper]').filter({hasText:'Following'}).last();
await avatar.focus();await expect(card.getByRole('button',{name:'Message',exact:true})).toBeVisible({timeout:20000});
await p.keyboard.press('ArrowDown');await p.waitForTimeout(450);
if(phase==='after')await expect(card.getByRole('link').first()).toBeFocused();else await expect(avatar).toBeFocused();
const active=()=>p.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent.trim(),href:document.activeElement.getAttribute('href'),insidePreview:!!document.activeElement.closest('[role="dialog"][aria-label="Profile preview"]')}));
const entryFocus=await active();await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(350);await p.screenshot({path:dir+'/entry-'+width+'.png'});
let followFocus;
{for(let i=0;i<3;i++)await p.keyboard.press('Tab');await p.waitForTimeout(450);followFocus=await active();if(phase==='after')await expect(card.getByRole('button',{name:'Follow',exact:true})).toBeFocused();await p.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));await p.waitForTimeout(350);await p.screenshot({path:dir+'/follow-focus-'+width+'.png'});}
results.push({phase,width,identity,post,url:p.url(),sourceHead:phase==='after'?'044abe7237c0f314fa84737e75f7f4ba5227cb63':'cf0efbc10b8757137063113ebbd2061e8b87d8f7',entryFocus,followFocus,captureScrollY:await p.evaluate(()=>window.scrollY)});await context.close();
}
fs.writeFileSync(dir+'/results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
});
