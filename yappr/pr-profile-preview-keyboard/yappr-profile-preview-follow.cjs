const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
run(async open=>{
const target='9GmFToc9UiCYUz9aULocqsw1AKB1DdZsqo8ibzwWvTgL';
const {page:p,context,identity}=await open(76,'/user/?id='+target);
const avatar=p.locator('article[data-testid^="post-card-"]').first().locator('a[href*="/user"]').first();await avatar.waitFor({timeout:60000});
const card=p.getByRole('dialog',{name:'Profile preview'});
async function enter(){await avatar.focus();await p.keyboard.press('ArrowDown');await expect(card.getByRole('button',{name:'Message',exact:true})).toBeVisible({timeout:20000});await p.keyboard.press('Escape');await p.keyboard.press('ArrowDown');await expect(card.getByRole('link').first()).toBeFocused();for(let i=0;i<3;i++)await p.keyboard.press('Tab');}
await enter();await expect(card.getByRole('button',{name:'Follow',exact:true})).toBeFocused();await p.keyboard.press('Enter');await expect(card.getByRole('button',{name:'Unfollow',exact:true})).toBeVisible({timeout:45000});
await p.reload();await avatar.waitFor({timeout:60000});await enter();await expect(card.getByRole('button',{name:'Unfollow',exact:true})).toBeFocused();const persistedFollow=await card.innerText();
await p.keyboard.press('Enter');await expect(card.getByRole('button',{name:'Follow',exact:true})).toBeVisible({timeout:45000});
await p.reload();await avatar.waitFor({timeout:60000});await enter();await expect(card.getByRole('button',{name:'Follow',exact:true})).toBeFocused();const restored=await card.innerText();
await p.keyboard.press('Tab');await expect(card.getByRole('button',{name:'Message',exact:true})).toBeFocused();await p.keyboard.press('Enter');await p.waitForURL(url=>url.pathname.endsWith('/messages/')&&url.searchParams.get('startConversation')===target,{timeout:20000});
const out={identity,target,persistedFollow,restored,messageUrl:p.url()};fs.writeFileSync('/tmp/yappr-profile-preview-evidence/follow-check.json',JSON.stringify(out,null,2));console.log(JSON.stringify(out));await context.close();
});
