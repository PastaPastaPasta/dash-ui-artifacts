const fs=require('node:fs');
const path=require('node:path');
const {chromium,expect}=require('/tmp/yappr-embed-article-link/node_modules/@playwright/test');
const fixture={blogId:'BkqjYQ95Mm2vNGEaoKbE473jodp7ZPFQr1Mj3jmqw6wA',postId:'5cY37VaxiKxBnprHfXG11Nx37eDv6Jb8RHYDMCmWWi8G',ownerId:'H4P7NB1JNJ3B9LRpPixi3sUs7qhN5w9xs9YbQSBFh8Z1',title:'QA embed navigation 20260915',slug:'qa-embed-navigation-20260915'};
(async()=>{const browser=await chromium.launch();const results=[];
for(const [variant,port,revision] of [['before',3211,'4105c5d1c914f5d0838619da93c3b8d28b4a780e'],['after',4184,'5ca005cafe8111fcee1b37aebec212f53421fd0f']]){
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,colorScheme:'light',locale:'en-US',timezoneId:'America/Chicago'});await context.addInitScript(()=>localStorage.setItem('theme','light'));const page=await context.newPage();const base=`http://localhost:${port}/devnet`;
 await page.goto(`${base}/blog/?blog=${fixture.blogId}&post=${fixture.slug}`);
 await expect(page.getByRole('heading',{name:fixture.title,exact:true})).toBeVisible({timeout:30000});
 await page.getByRole('button',{name:'More actions',exact:true}).click();await page.getByRole('button',{name:'Embed',exact:true}).click();
 const dialog=page.getByRole('dialog');await expect(dialog).toBeVisible();await page.waitForTimeout(600);
 const snippets=await dialog.locator('pre').allTextContents();
 await page.screenshot({path:path.join(__dirname,`${variant}-generated-code.png`)});
 await dialog.screenshot({path:path.join(__dirname,`${variant}-generated-code-focus.png`)});
 await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.goto(`${base}/embed/?post=${fixture.postId}&owner=${fixture.ownerId}&theme=light`);
 await expect(page.getByRole('heading',{name:fixture.title,exact:true})).toBeVisible({timeout:30000});
 const link=page.getByRole('link',{name:'View on Yappr',exact:true});const href=await link.getAttribute('href');
 await page.screenshot({path:path.join(__dirname,`${variant}-populated-embed.png`)});
 await link.click();await page.waitForLoadState('domcontentloaded');
 if(variant==='before'){await expect(page.getByRole('heading',{name:'404',exact:true})).toBeVisible();if(new URL(page.url()).pathname.startsWith('/devnet'))throw new Error('Baseline unexpectedly retained path');}
 else{await expect(page.getByRole('heading',{name:fixture.title,exact:true})).toBeVisible({timeout:30000});await expect(page.getByText('DEVNET',{exact:true})).toBeVisible();if(!new URL(page.url()).pathname.startsWith('/devnet/blog'))throw new Error('After lost deployment');}
 await page.waitForTimeout(600);await page.screenshot({path:path.join(__dirname,`${variant}-destination.png`)});
 results.push({variant,revision,fixture,snippets,href,destination:page.url(),body:await page.locator('body').innerText(),passed:true});await context.close();
}
fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();})().catch(e=>{console.error(e.message);process.exit(1)});
