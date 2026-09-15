const fs=require('node:fs'); const path=require('node:path'); const http=require('node:http');
const {chromium,expect}=require('/tmp/yappr-embed-user-navigation/node_modules/@playwright/test');
const fixture={postId:'5cY37VaxiKxBnprHfXG11Nx37eDv6Jb8RHYDMCmWWi8G',ownerId:'H4P7NB1JNJ3B9LRpPixi3sUs7qhN5w9xs9YbQSBFh8Z1',blogId:'BkqjYQ95Mm2vNGEaoKbE473jodp7ZPFQr1Mj3jmqw6wA',title:'QA embed navigation 20260915'};
(async()=>{const browser=await chromium.launch();const results=[];
for(const [variant,port,revision] of [['before',4184,'5ca005cafe8111fcee1b37aebec212f53421fd0f'],['after',4186,'70573048d3aeeb39d8f5490ada75037dfae18c18']]){
 const html=`<!doctype html><html lang="en"><meta charset="utf-8"><title>External article embed</title><style>body{font:18px system-ui;margin:36px auto;max-width:900px;color:#111;background:#f6f7f9}main{padding:24px;background:white;border:1px solid #ddd}h1{margin-top:0}</style><main><h1>External article embed</h1><p>QA host page using the Yappr script embed.</p><div data-yappr-post="${fixture.postId}" data-yappr-owner="${fixture.ownerId}" data-yappr-theme="light"></div><script src="http://localhost:${port}/devnet/embed.js"></script></main></html>`;
 const host=http.createServer((q,r)=>{r.writeHead(200,{'Content-Type':'text/html'});r.end(html)});await new Promise(r=>host.listen(4185,'127.0.0.1',r));
 const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:1,colorScheme:'light',locale:'en-US',timezoneId:'America/Chicago'});await context.addInitScript(()=>localStorage.setItem('theme','light'));const page=await context.newPage();const logs=[];page.on('console',m=>{if(m.type()==='error'||m.type()==='warning')logs.push({type:m.type(),text:m.text()})});
 await page.goto('http://127.0.0.1:4185/');const frame=page.frameLocator('iframe');await expect(frame.getByRole('heading',{name:fixture.title,exact:true})).toBeVisible({timeout:45000});
 const sandbox=await page.locator('iframe').getAttribute('sandbox');const link=frame.getByRole('link',{name:'View on Yappr'});const href=await link.getAttribute('href');await page.screenshot({path:path.join(__dirname,`${variant}-host.png`)});
 await link.click();
 if(variant==='before'){await page.waitForTimeout(1500);await expect(page).toHaveURL('http://127.0.0.1:4185/');await expect(link).toBeVisible();}
 else{await expect(page.getByRole('heading',{name:fixture.title,exact:true})).toBeVisible({timeout:45000});await expect(page.getByText('DEVNET',{exact:true})).toBeVisible();if(!page.url().startsWith(`http://localhost:${port}/devnet/blog/`))throw new Error('After did not open full article');}
 await page.waitForTimeout(600);await page.screenshot({path:path.join(__dirname,`${variant}-after-click.png`)});results.push({variant,revision,fixture,sandbox,href,destination:page.url(),logs,passed:true});await context.close();await new Promise(r=>host.close(r));
}
fs.writeFileSync(path.join(__dirname,'results.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();})().catch(e=>{console.error(e);process.exit(1)});
