const {chromium}=require('../.perf-tools/node_modules/playwright');
const fs=require('fs');
(async()=>{
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const results=[];const label=process.argv[2]||'baseline';const base=process.argv[3]||'http://127.0.0.1:4173';fs.mkdirSync('performance/artifacts',{recursive:true});
for(const mobile of [false,true]){
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1440,height:900},deviceScaleFactor:1,isMobile:mobile,hasTouch:mobile});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{window.perf={lcp:0,cls:0,longTasks:[]};for(const type of ['largest-contentful-paint','layout-shift','longtask'])new PerformanceObserver(list=>{for(const e of list.getEntries()){if(type==='largest-contentful-paint')window.perf.lcp=e.startTime;if(type==='layout-shift'&&!e.hadRecentInput)window.perf.cls+=e.value;if(type==='longtask')window.perf.longTasks.push(e.duration);}}).observe({type,buffered:true});});
 for(const visit of ['cold','repeat']){
 await page.goto(base,{waitUntil:'load',timeout:90000});await page.waitForTimeout(5000);
 const metrics=await page.evaluate(()=>({ ...window.perf,nav:performance.getEntriesByType('navigation')[0].toJSON(),resources:performance.getEntriesByType('resource').map(r=>({name:r.name,bytes:r.transferSize,decoded:r.decodedBodySize,duration:r.duration})),overflow:document.documentElement.scrollWidth>innerWidth,sections:[...document.querySelectorAll('main section')].map(e=>e.id)}));
 results.push({mobile,visit,metrics,errors:[...errors]});
 if(visit==='cold')await page.screenshot({path:'performance/artifacts/'+label+'-'+(mobile?'mobile':'desktop')+'.png'});
 }
 for(const id of ['flavours','mango-story','lychee-story','story','map','partner','contact']){await page.locator('#'+id).first().scrollIntoViewIfNeeded().catch(()=>{});await page.waitForTimeout(700);}
 await page.screenshot({path:'performance/artifacts/'+label+'-'+(mobile?'mobile':'desktop')+'-contact.png'});
 results.push({mobile,scrollCheck:await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,frames:[...document.querySelectorAll('canvas[data-frame]')].map(e=>e.dataset.frame),brokenImages:[...document.images].filter(e=>e.complete&&!e.naturalWidth).map(e=>e.src),navHidden:document.querySelector('[data-pio-nav]').hidden,longTasks:window.perf.longTasks})),errors});
 await context.close();
}
await browser.close();fs.writeFileSync('performance/'+label+'.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results.filter(r=>r.visit).map(r=>({mobile:r.mobile,visit:r.visit,lcp:Math.round(r.metrics.lcp),cls:r.metrics.cls,ttfb:Math.round(r.metrics.nav.responseStart-r.metrics.nav.requestStart),load:Math.round(r.metrics.nav.loadEventEnd),requests:r.metrics.resources.length,bytes:r.metrics.resources.reduce((s,r)=>s+r.bytes,0),longTasks:r.metrics.longTasks.length,errors:r.errors})),null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});