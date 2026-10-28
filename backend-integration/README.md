# PIO contact email deployment

Frontend repository: https://github.com/lodhirahul1011-arch/Mango
Backend repository: https://github.com/lodhirahul1011-arch/Mango-backend

## Separate Render services (current deployment)

Frontend https://mango-i4lg.onrender.com:
- Set VITE_CONTACT_API_BASE_URL=https://mango-backend-1wwy.onrender.com in Render Environment.
- Build: npm ci && npm run build. For a Static Site, publish directory: dist.
- Rebuild after changing VITE_CONTACT_API_BASE_URL.

Backend https://mango-backend-1wwy.onrender.com:
- Repository: Mango-backend, branch main, Root Directory empty.
- Node Web Service build: npm ci. Start: npm start. Docker deployments use the updated Dockerfile.
- GET /api/health must report service pio-backend.
- Public POST /api/pio/contact and OPTIONS preflight are handled before authentication; no login is required.
- Configure mail variables on the backend Render service. Local .env is not pushed to GitHub.
- CONTACT_EMAIL controls the recipient; visitor email is Reply-To.
- SMTP: CONTACT_MAIL_PROVIDER=smtp plus MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS, MAIL_FROM.
- Render Free blocks SMTP ports 465/587. Use a supported HTTPS provider or SMTP-capable hosting.
- EmailJS HTTPS: CONTACT_MAIL_PROVIDER=emailjs, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, EMAILJS_PRIVATE_KEY, CONTACT_EMAIL. Template recipient {{to_email}}, Reply-To {{reply_to}}. These are backend variables, never VITE_ secrets.
- Set TRUST_PROXY_HOPS=1 for Render's proxy.

## Local / combined hosting

See LOCAL_SETUP.md. npm run dev serves the frontend and contact API together; leave VITE_CONTACT_API_BASE_URL empty for that setup. npm run build followed by npm start serves both from Node.

## Verification

npm test covers validation, mail providers, failures and CORS. npm run test:browser covers frontend success/error handling. Provider acceptance does not guarantee inbox placement. No live test email is automatically sent by these tests.
