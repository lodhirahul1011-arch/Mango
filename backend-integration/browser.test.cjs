const {test}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
test('browser preserves values on failure and confirms only accepted delivery',async()=>{
 const {createServer}=await import('vite');
 const server=await createServer({server:{port:0,host:'127.0.0.1'}});
 await server.listen();
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({reducedMotion:'reduce'});
  await page.goto(server.resolvedUrls.local[0]+'#contact');
  let requests=0;
  await page.route('**/api/pio/contact',route=>{
   requests++;
   return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({emailStatus:'accepted'})});
  });
  await page.getByRole('button',{name:'Submit Enquiry'}).click();
  assert.equal(await page.locator('#contact-name').getAttribute('aria-invalid'),'true');
  assert.equal(await page.locator('#contact-phone').getAttribute('aria-invalid'),'true');
  assert.equal(await page.locator('#contact-email').getAttribute('aria-invalid'),'true');
  assert.equal(requests,0);
  await page.getByLabel('Phone Number *',{exact:true}).fill('12345');
  await page.getByRole('button',{name:'Submit Enquiry'}).click();
  assert.equal(await page.locator('#contact-phone').getAttribute('aria-invalid'),'true');
  assert.equal(requests,0);
  await page.unroute('**/api/pio/contact');
  await page.getByPlaceholder('Rahul Lodhi').fill('PIO Integration Test');
  await page.getByPlaceholder('+91 99999 99999').fill('9876543210');
  await page.getByPlaceholder('rahul@example.com').fill('test@example.com');
  await page.route('**/api/pio/contact',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({emailStatus:'failed'})}));
  await page.getByRole('button',{name:'Submit Enquiry'}).click();
  await page.getByRole('alert').waitFor();
  assert.equal(await page.getByPlaceholder('Rahul Lodhi').inputValue(),'PIO Integration Test');
  await page.unroute('**/api/pio/contact');
  await page.route('**/api/pio/contact',async route=>{
   assert.equal(route.request().postDataJSON().inquiryType,'Become a Distributor');
   await route.fulfill({status:200,contentType:'application/json',body:JSON.stringify({emailStatus:'accepted'})});
  });
  await page.getByRole('button',{name:'Submit Enquiry'}).click();
  await page.getByRole('heading',{name:'Thank you!'}).waitFor();
  const response=await fetch(server.resolvedUrls.local[0]+'api/pio/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
  assert.equal(response.status,400);
 } finally {await browser.close();await server.close();}
});
