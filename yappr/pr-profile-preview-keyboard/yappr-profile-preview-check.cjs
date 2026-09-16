const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
run(async open=>{
const {page:p,context}=await open(76,'/user/?id=7q9PdfjVLCZbcLb8wDdExUCokYSdi9Gu251Fqne2jNv9');
const avatar=p.locator('article[data-testid^="post-card-"]').first().locator('a[href*="/user"]').first();
await avatar.waitFor({timeout:60000});
const card=p.getByRole('dialog',{name:'Profile preview'});
await avatar.focus();await expect(card).toBeVisible();await expect(avatar).toBeFocused();
await expect(card.getByRole('button',{name:'Message',exact:true})).toBeVisible({timeout:20000});
await p.keyboard.press('ArrowDown');await expect(card.getByRole('link').first()).toBeFocused();
const trace=[];for(let i=0;i<6;i++){trace.push(await p.evaluate(()=>({tag:document.activeElement.tagName,text:document.activeElement.textContent.trim()})));await p.keyboard.press('Tab');}
await p.keyboard.press('Escape');await expect(card).toHaveCount(0);await expect(avatar).toBeFocused();await p.waitForTimeout(550);await expect(card).toHaveCount(0);
await p.keyboard.press('ArrowDown');await expect(card).toBeVisible();await expect(card.getByRole('link').first()).toBeFocused();
await p.mouse.move(20,150);await p.waitForTimeout(550);await expect(card).toBeVisible();
await p.getByRole('link',{name:'About',exact:true}).focus();await expect(card).toHaveCount(0);await expect(p.getByRole('link',{name:'About',exact:true})).toBeFocused();
await avatar.hover();await expect(card).toBeVisible();await expect(p.getByRole('link',{name:'About',exact:true})).toBeFocused();
await card.getByRole('button',{name:'Message',exact:true}).hover();await p.waitForTimeout(550);await expect(card).toBeVisible();
await p.mouse.move(20,150);await expect(card).toHaveCount(0);
fs.mkdirSync('/tmp/yappr-profile-preview-evidence',{recursive:true});fs.writeFileSync('/tmp/yappr-profile-preview-evidence/initial-check.json',JSON.stringify({post:await p.locator('article[data-testid^="post-card-"]').first().getAttribute('data-testid'),trace},null,2));console.log(JSON.stringify({trace}));await context.close();
});
