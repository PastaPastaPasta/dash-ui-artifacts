const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
run(async open=>{
const result=[];
for(const width of [1280,390,320]){
const {page:p,context}=await open(76,'/user/?id=7q9PdfjVLCZbcLb8wDdExUCokYSdi9Gu251Fqne2jNv9');await p.setViewportSize({width,height:width===1280?900:568});
const avatar=p.locator('article[data-testid^="post-card-"]').first().locator('a[href*="/user"]').first();await avatar.waitFor({timeout:60000});
const card=p.getByRole('dialog',{name:'Profile preview'});
await avatar.focus();await p.keyboard.press('ArrowDown');await expect(card).toBeVisible();
const initial=await p.evaluate(()=>({tag:document.activeElement.tagName,role:document.activeElement.getAttribute('role'),loading:!!document.querySelector('[role="status"][aria-label="Loading profile"]')}));
await expect(card.getByRole('button',{name:'Message',exact:true})).toBeVisible({timeout:20000});
if(await card.evaluate(el=>el===document.activeElement)){await p.keyboard.press('Tab');}
await expect(card.getByRole('link').first()).toBeFocused();
for(let i=0;i<5;i++)await p.keyboard.press('Tab');await expect(card.getByRole('link').first()).toBeFocused();
await p.keyboard.press('Shift+Tab');await expect(card.getByRole('button',{name:'Message',exact:true})).toBeFocused();
const bounds=await card.boundingBox();if(bounds.x<0||bounds.x+bounds.width>width+1)throw new Error('card overflow');
await p.keyboard.press('Escape');await expect(card).toHaveCount(0);await expect(avatar).toBeFocused();await p.waitForTimeout(600);await expect(card).toHaveCount(0);
// Escape while focus stays on trigger must close without a reopen loop.
await avatar.blur();await avatar.focus();await expect(card).toBeVisible();await p.keyboard.press('Escape');await expect(card).toHaveCount(0);await p.waitForTimeout(600);await expect(card).toHaveCount(0);
// Primary profile navigation is still Enter, not popover activation.
const href=await avatar.getAttribute('href');await p.keyboard.press('Enter');await p.waitForURL(url=>url.pathname+url.search===href);
result.push({width,initial,bounds,primaryEnterUrl:p.url(),passed:true});await context.close();
}
fs.writeFileSync('/tmp/yappr-profile-preview-evidence/extended-check.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
});
