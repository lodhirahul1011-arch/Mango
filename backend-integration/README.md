# PIO contact email deployment

## Netlify (frontend and API in this repository)

The root `netlify.toml` builds the Vite site and deploys `netlify/functions/api.cjs`
as the contact API. `/api/health` and `/api/pio/contact` are routed to that
function on the same origin, so the browser does not need a separate backend URL.

Set these server-side environment variables in the Netlify site settings:
- `CONTACT_MAIL_PROVIDER=emailjs`
- `CONTACT_EMAIL`
- `EMAILJS_SERVICE_ID`
- `EMAILJS_TEMPLATE_ID`
- `EMAILJS_PUBLIC_KEY`
- `EMAILJS_PRIVATE_KEY`
- `TRUST_PROXY_HOPS=1`

Keep the EmailJS private key in Netlify's environment variables; never expose it
with a `VITE_` prefix or commit it in `.env`. Redeploy after setting or changing
these variables.

## Separate Render services (optional)

Frontend:
- Set `VITE_CONTACT_API_BASE_URL` to the backend Render URL in Render Environment.
- Build: `npm ci && npm run build`. For a Static Site, publish directory: `dist`.
- Rebuild after changing `VITE_CONTACT_API_BASE_URL`.

Backend:
- Deploy the backend repository as a Node Web Service with build `npm ci` and start `npm start`.
- Configure mail variables on the backend Render service. Local `.env` is not pushed to GitHub.
- GET `/api/health` should report service `pio-backend`.
- Public POST `/api/pio/contact` and OPTIONS preflight are handled before authentication.
- Render Free blocks SMTP ports 465/587. Use a supported HTTPS provider such as EmailJS or Resend.
- CONTACT_EMAIL controls the recipient; visitor email is Reply-To.
- EmailJS template recipient is `{{to_email}}`; Reply-To is `{{reply_to}}`.
- SMTP: `CONTACT_MAIL_PROVIDER=smtp` plus `MAIL_HOST`, `MAIL_PORT`, `MAIL_SECURE`, `MAIL_USER`, `MAIL_PASS`, and `MAIL_FROM`.

## Local / combined hosting

See `LOCAL_SETUP.md`. `npm run dev` serves the frontend and contact API together; leave `VITE_CONTACT_API_BASE_URL` empty for that setup. `npm run build` followed by `npm start` serves both from Node.

## Verification

npm test covers validation, mail providers, failures and CORS. npm run test:browser covers frontend success/error handling. Provider acceptance does not guarantee inbox placement. No live test email is automatically sent by these tests.
