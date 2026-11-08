import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.mjs';

const valid = { name: 'Test User', email: 'test@example.com', phone: '9876543210', type: 'Become a Distributor', message: 'Contact test' };
async function withApp(options, run) {
  const server = createApp(options).listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  try {
    const url = `http://127.0.0.1:${server.address().port}/api/contact`;
    await run(body => fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }));
  } finally { await new Promise(resolve => server.close(resolve)); }
}
test('uses the published template and fixed server recipient, not browser overrides', async () => {
  await withApp({ env: { RESEND_API_KEY: 'test-secret' }, fetchImpl: async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const payload = JSON.parse(options.body);
    assert.deepEqual(payload.to, ['lodhirahul7002@gmail.com']);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.template.id, 'new-enquiry-notification');
    assert.deepEqual(payload.template.variables, { name: valid.name, email: valid.email, phone: valid.phone, purpose: valid.type, message: valid.message });
    assert.equal(payload.html, undefined);
    return Response.json({ id: 'accepted-id' });
  } }, async post => {
    const response = await post({ ...valid, to: 'attacker@example.com' });
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { ok: true, id: 'accepted-id' });
  });
});
test('rejects invalid fields and oversized template variables without sending', async () => {
  await withApp({ env: {}, fetchImpl: () => { throw new Error('Must not send'); } }, async post => {
    for (const body of [{}, { ...valid, email: 'invalid' }, { ...valid, message: 'x'.repeat(2001) }]) {
      assert.equal((await post(body)).status, 400);
    }
  });
});
test('missing configuration fails without reporting success', async () => {
  await withApp({ env: {} }, async post => assert.equal((await post(valid)).status, 503));
});
test('provider rejection never becomes a success response or leaks details', async () => {
  await withApp({ env: { RESEND_API_KEY: 'test-secret' }, fetchImpl: async () => Response.json({ name: 'validation_error', message: 'private detail' }, { status: 403 }) }, async post => {
    const response = await post(valid);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { ok: false });
  });
});
test('limits repeated submissions', async () => {
  await withApp({ env: {} }, async post => {
    for (let i = 0; i < 5; i++) await post(valid);
    assert.equal((await post(valid)).status, 429);
  });
});
