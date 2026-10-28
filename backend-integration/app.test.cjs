const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const os=require('node:os');
const path=require('node:path');
const {createApp,loadEnvironment}=require('./app.cjs');
test('loads root mail settings regardless of current directory without overriding deployment variables',()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pio-env-'));
 try {
  fs.writeFileSync(path.join(dir,'.env'),'CONTACT_EMAIL=owner@example.com\nMAIL_PASS=fixture\n');
  const env={CONTACT_EMAIL:'deployment@example.com'};
  loadEnvironment(dir,env);
  assert.equal(env.CONTACT_EMAIL,'deployment@example.com');
  assert.equal(env.MAIL_PASS,'fixture');
 } finally {fs.rmSync(dir,{recursive:true});}
});
test('website API delivers validated enquiries and does not report failed sends as success',async()=>{
 const sent=[];
 const app=createApp({mailer:{send:async data=>{if(data.message==='fail') throw Error('private');sent.push(data);}}});
 const server=app.listen(0,'127.0.0.1');
 await new Promise(resolve=>server.once('listening',resolve));
 const base='http://127.0.0.1:'+server.address().port;
 const data={name:'Test',phone:'9876543210',email:'test@example.com',inquiryType:'Become a Distributor',message:'Hello'};
 const post=body=>fetch(base+'/api/pio/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
 try {
  const ok=await post(data);assert.equal(ok.status,200);assert.deepEqual(await ok.json(),{emailStatus:'accepted'});assert.equal(sent.length,1);
  assert.equal((await post({...data,email:'bad'})).status,400);
  const failed=await post({...data,message:'fail'});assert.equal(failed.status,503);assert.ok(!(await failed.text()).includes('private'));
  assert.equal((await fetch(base+'/.env')).status,404);
 } finally {await new Promise(resolve=>server.close(resolve));}
});
