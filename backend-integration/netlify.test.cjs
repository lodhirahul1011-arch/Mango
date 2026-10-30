const {test}=require('node:test');
const assert=require('node:assert/strict');
const {handler}=require('../netlify/functions/api.cjs');

function request(path,method='GET',body=null) {
  return handler({
    httpMethod:method,
    path,
    headers:{origin:'https://celadon-griffin-9382dd.netlify.app','content-type':'application/json'},
    queryStringParameters:null,
    body,
    isBase64Encoded:false,
    requestContext:{identity:{sourceIp:'127.0.0.1'}},
  },{});
}

test('Netlify function serves health and same-origin contact preflight',async()=>{
  const health=await request('/api/health');
  assert.equal(health.statusCode,200);
  assert.equal(JSON.parse(health.body).status,'ok');

  const preflight=await request('/api/pio/contact','OPTIONS');
  assert.equal(preflight.statusCode,204);
  assert.equal(preflight.headers['access-control-allow-origin'],'https://celadon-griffin-9382dd.netlify.app');
});

test('Netlify function validates contact requests',async()=>{
  const response=await request('/api/pio/contact','POST','{}');
  assert.equal(response.statusCode,400);
  assert.ok(JSON.parse(response.body).errors.email);
});
