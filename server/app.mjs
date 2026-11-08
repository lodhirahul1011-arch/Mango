import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist', import.meta.url));
const purposes = ['Become a Distributor', 'Become a Retailer', 'B2B / Institutional', 'General Consumer Feedback'];

export function createApp({ env = process.env, fetchImpl = globalThis.fetch } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);
  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api/contact', rateLimit({ windowMs: 60_000, limit: 5, standardHeaders: 'draft-7', legacyHeaders: false }));
  app.use(express.json({ limit: '16kb' }));
  app.post('/api/contact', async (req, res) => {
    const raw = req.body;
    if (!raw || ['name', 'email', 'phone', 'type', 'message'].some(key => typeof raw[key] !== 'string')) {
      return res.status(400).json({ ok: false });
    }
    const { name, email, phone, type, message } = Object.fromEntries(
      ['name', 'email', 'phone', 'type', 'message'].map(key => [key, raw[key].trim()]),
    );
    const digits = phone.replace(/\D/g, '');
    if (name.length < 2 || name.length > 100 || !/\p{L}/u.test(name) || /[\r\n\0]/.test(name) ||
        email.length > 254 || !/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(email) ||
        phone.length > 30 || !/^\+?[\d ()-]+$/.test(phone) || /^(\d)\1+$/.test(digits) ||
        (phone.startsWith('+') ? digits.length < 8 || digits.length > 15 : digits.length !== 10) ||
        (phone.startsWith('+91') && digits.length !== 12) || !purposes.includes(type) ||
        raw.message.length > 2000 || /\0/.test(message)) {
      return res.status(400).json({ ok: false });
    }
    const apiKey = env.RESEND_API_KEY?.trim();
    if (!apiKey) return res.status(503).json({ ok: false });
    try {
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        signal: AbortSignal.timeout(15_000),
        body: JSON.stringify({
          from: env.RESEND_FROM_EMAIL?.trim() || 'onboarding@resend.dev',
          to: [env.CONTACT_EMAIL?.trim() || 'lodhirahul7002@gmail.com'],
          reply_to: email,
          subject: `PIO Website - ${type}`,
          template: {
            id: env.RESEND_TEMPLATE_ID?.trim() || 'new-enquiry-notification',
            variables: { name, phone, email, purpose: type, message: message || '(Not provided)' },
          },
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.id) {
        console.error('[PIO contact] Resend rejected request', { status: response.status, category: result?.name });
        return res.status(response.status === 429 ? 429 : 502).json({ ok: false });
      }
      return res.json({ ok: true, id: result.id });
    } catch {
      console.error('[PIO contact] Resend request failed');
      return res.status(502).json({ ok: false });
    }
  });
  app.use('/api', (_req, res) => res.status(404).json({ ok: false }));
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
  app.use((error, _req, res, _next) => {
    res.status(error.status === 413 ? 413 : 400).json({ ok: false });
  });
  return app;
}
