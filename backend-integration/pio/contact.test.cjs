const {test}=require('node:test');
const assert=require('node:assert/strict');
const express=require('express');
const {validate,createMailer,createRouter}=require('./contact.cjs');
const data={name:'Test <PIO>',phone:'+919876543210',email:'customer@example.com',inquiryType:'Become a Distributor',message:'<script>test</script>'};
const env={SMTP_HOST:'smtp.example.com',SMTP_USER:'sender@example.com',SMTP_PASS:'test',MAIL_FROM:'PIO <sender@example.com>',CONTACT_EMAIL:'receiver@example.com'};
test('validates required fields, lengths, headers, enum and honeypot',()=>{
 assert.equal(validate(data).name,data.name);
 for(const edit of [{name:''},{phone:'abc'},{email:'bad'},{email:'a@example.com\nBcc:x@y.com'},{inquiryType:'booking'},{message:'x'.repeat(5001)},{website:'bot'},{name:[]}]) assert.throws(()=>validate({...data,...edit}));
 assert.equal(validate({...data,message:''}).message,'');
});
test('SMTP awaits recipient acceptance, escapes HTML and uses Reply-To',async()=>{
 let captured,options,created=0;
 const mailer=createMailer(env,{createTransport:o=>{options=o;created++;return {sendMail:async m=>{captured=m;return {accepted:[env.CONTACT_EMAIL]};}};}});
 assert.deepEqual(await mailer.send(data),{emailStatus:'accepted'});await mailer.send(data);
 assert.equal(created,1);assert.equal(options.requireTLS,true);assert.equal(options.tls.rejectUnauthorized,true);
 assert.equal(captured.to,env.CONTACT_EMAIL);assert.equal(captured.replyTo,data.email);assert.equal(captured.from,env.MAIL_FROM);
 assert.ok(captured.html.includes('&lt;script&gt;'));assert.ok(captured.text.includes(data.message));assert.ok(captured.text.includes('Submitted at (UTC)'));
});
test('missing config, transport failure and unaccepted recipient reject',async()=>{
 await assert.rejects(createMailer({}).send(data));
 for(const sendMail of [async()=>{throw Error('secret-provider-error');},async()=>({accepted:[]})]) await assert.rejects(createMailer(env,{createTransport:()=>({sendMail})}).send(data));
 await assert.rejects(createMailer({...env,SMTP_PORT:'465',SMTP_SECURE:'false'}).send(data));
});
test('HTTPS provider requires successful response and message id',async()=>{
 const cfg={...env,CONTACT_MAIL_PROVIDER:'resend',RESEND_API_KEY:'test'};
 for(const [ok,body,pass] of [[true,{id:'accepted'},true],[false,{message:'secret'},false],[true,{},false]]){
  const mailer=createMailer(cfg,{fetch:async()=>({ok,json:async()=>body})});
  if(pass) assert.equal((await mailer.send(data)).emailStatus,'accepted');else await assert.rejects(mailer.send(data));
 }
});
async function withServer(mailer,run,max=50){
 const app=express();app.use('/api/pio/contact',createRouter({mailer,max}));
 const server=app.listen(0,'127.0.0.1');await new Promise(r=>server.once('listening',r));
 const url='http://127.0.0.1:'+server.address().port+'/api/pio/contact';
 try{await run((body,headers={})=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(body)}));}finally{await new Promise(r=>server.close(r));}
}
test('route success, invalid input, oversized body and origin rejection',async()=>{
 let calls=0;await withServer({send:async()=>{calls++;}},async post=>{
  assert.equal((await post(data)).status,200);
  assert.equal((await post({...data,email:''})).status,400);
  assert.equal((await post({...data,message:'a'.repeat(14000)})).status,413);
  assert.equal((await post(data,{Origin:'https://untrusted.invalid'})).status,403);
  assert.equal(calls,1);
 });
});
test('route mail failure is safe and never success',async()=>{
 await withServer({send:async()=>{throw Error('secret password customer@example.com');}},async post=>{
  const r=await post(data);assert.equal(r.status,503);const body=await r.text();assert.ok(!body.includes('secret'));assert.ok(!body.includes(data.email));
 });
});
test('rate limit blocks repeated submissions',async()=>{
 await withServer({send:async()=>{}},async post=>{assert.equal((await post(data)).status,200);assert.equal((await post(data)).status,429);},1);
});
