const fs=require('node:fs'),{run,expect}=require('/tmp/yappr-qa-browser.cjs');
const dir='/tmp/yappr-blog-comment-errors-evidence';fs.mkdirSync(dir,{recursive:true});
run(async open=>{
const {page:p,context,identity}=await open(65,'/blog/?blog=BdMQRKM6xT8jx4bKbkhP3wYo7V835pDjcEWTbN5PMNRU&post=qa-pagination-fixture-02-p64');
const s=p.getByRole('heading',{name:/^Comments \(/}).locator('..');await expect(s.getByRole('heading',{name:'Comments (0)',exact:true})).toBeVisible({timeout:90000});
const content='QA139 temporary comment — delete failure feedback.';await s.getByPlaceholder('Write a comment...').fill(content);await s.getByRole('button',{name:'Post comment',exact:true}).click();await expect(s.getByPlaceholder('Write a comment...')).toHaveValue('',{timeout:90000});await p.reload();await expect(s.locator('article').filter({hasText:content})).toBeVisible({timeout:90000});const result={identity,content,url:p.url(),createdAndReloaded:true};fs.writeFileSync(dir+'/fixture.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));await context.close();
});
