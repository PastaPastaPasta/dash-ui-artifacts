const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
const phase=process.env.QA_PHASE,dir='/tmp/yappr-blog-comment-errors-evidence/'+phase;fs.mkdirSync(dir,{recursive:true});
run(async open=>{
const {page:p,context,identity,base}=await open(65,'/blog/?blog=BdMQRKM6xT8jx4bKbkhP3wYo7V835pDjcEWTbN5PMNRU&post=qa-pagination-fixture-02-p64');await p.setViewportSize({width:1000,height:1000});await p.emulateMedia({colorScheme:'light'});
const s=p.getByRole('heading',{name:/^Comments \(/}).locator('..');const content='QA139 temporary comment — delete failure feedback.',draft='QA139 temporary draft — reconnect and retry posting.';
const row=s.locator('article').filter({hasText:content});const result={phase,base,identity,content,draft,checks:[]};
try{
await expect(row).toBeVisible({timeout:90000});await s.scrollIntoViewIfNeeded();
await context.setOffline(true);await row.getByRole('button',{name:'Delete',exact:true}).click();
const deleteText=phase==='before'?'You can only delete your own comments':'Failed to delete comment. Please try again.';await expect(p.getByText(deleteText,{exact:true})).toBeVisible({timeout:90000});await expect(row).toBeVisible();await expect(row.getByRole('button',{name:'Delete',exact:true})).toBeEnabled();await p.waitForTimeout(700);await expect(p.getByText(deleteText,{exact:true})).toBeVisible();await p.screenshot({path:dir+'/offline-delete.png'});result.deleteToast=deleteText;result.checks.push('Own row retained and Delete enabled after offline failure');
await context.setOffline(false);await p.reload();await expect(row).toBeVisible({timeout:90000});const input=s.getByPlaceholder('Write a comment...');await input.fill(draft);await s.scrollIntoViewIfNeeded();await context.setOffline(true);await s.getByRole('button',{name:'Post comment',exact:true}).click();
const postToast=phase==='before'?p.getByText(/transport error: grpc error:/):p.getByText('Failed to post comment. Please try again.',{exact:true});await expect(postToast).toBeVisible({timeout:90000});await expect(input).toHaveValue(draft);await expect(s.getByRole('button',{name:'Post comment',exact:true})).toBeEnabled();await p.waitForTimeout(700);await expect(postToast).toBeVisible();await p.screenshot({path:dir+'/offline-post.png'});result.postToast=await postToast.innerText();result.checks.push('Draft retained and Post comment enabled after offline failure');result.success=true;
}finally{await context.setOffline(false);fs.writeFileSync(dir+'/results.json',JSON.stringify(result,null,2));await context.close();}console.log(JSON.stringify(result));
});
