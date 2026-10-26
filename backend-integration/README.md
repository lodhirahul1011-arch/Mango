# PIO contact email on your existing backend

No second service is needed. The website now sends POST /api/pio/contact to your existing car-booking Render service. Its original /api/contact saves car enquiries with incompatible enum values and requires a message. The isolated PIO route sends email only; existing booking, admin and saved-contact behavior is untouched.

## Apply and deploy

A modified checkout is ready at integrations/car-booking/backend (ignored by the PIO repository). The portable files in this directory are the deliverable for the car-booking repository.

To apply to another checkout, run from backend-integration:

    node install.cjs /absolute/path/to/car-booking/backend

This copies pio/ and mounts its route in server.js AFTER existing CORS and BEFORE global body parsing. It also sets trust proxy to TRUST_PROXY_HOPS (default 1 for Render). Review that number if using a different proxy topology; never use unrestricted true. Existing dependencies already include Express, Nodemailer, dotenv and express-rate-limit.

From the car-booking backend directory:

    npm ci
    node --test pio/contact.test.cjs
    node pio/verify.cjs
    npm start

Commit server.js and pio/ to the car-booking repository, then redeploy the EXISTING car-booking-backend-pux1 Render service. This workspace has not pushed or deployed those changes. Until deployment, the new endpoint will not work on the live service.

## Backend environment (Render Environment or backend/.env)

Merge pio/.env.example into existing environment; keep MongoDB, JWT and booking configuration. Do not replace the entire existing environment with mail variables.

- CONTACT_MAIL_PROVIDER=smtp
- SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS: provider credentials. Existing MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS aliases are also supported. SMTP_ values take precedence if both exist.
- Port 587 requires SMTP_SECURE=false and STARTTLS; port 465 requires SMTP_SECURE=true. Certificate verification stays enabled.
- MAIL_FROM: authorized sender, for example PIO <sender@your-domain.com>.
- CONTACT_EMAIL: recipient mailbox only. Independent of ADMIN_EMAIL. Change this and restart/redeploy to redirect enquiries.
- CORS_ORIGINS: comma-separated EXACT PIO frontend origins, retaining existing car-booking origins. For local development include http://localhost:5173 (or the actual Vite port).
- TRUST_PROXY_HOPS=1 for the standard Render proxy.

Customer email becomes Reply-To, never From. Browser input cannot override recipients or credentials. Your src/.env is not the backend environment; its credentials must be placed on Render. Never prefix SMTP passwords/private keys with VITE_. Existing VITE_EMAILJS_PRIVATE_KEY should be removed/rotated if previously bundled or exposed. No credentials were copied into this integration.

## Frontend environment

Root .env (beside package.json), already configured locally:

    VITE_CONTACT_API_BASE_URL=https://car-booking-backend-pux1.onrender.com

Set the same variable in the frontend hosting environment and rebuild. For local backend use http://localhost:5000. Leave it empty only when a same-origin reverse proxy serves /api/pio/contact. Vite does not load src/.env by default. Only this public URL belongs in frontend configuration.

    npm run dev
    npm run build

## Render Free / HTTPS option

Render Free blocks outbound SMTP ports 25, 465 and 587: https://render.com/docs/free . SMTP requires compatible hosting; changing credentials cannot bypass this restriction. No plan upgrade is selected here.

For Render Free set CONTACT_MAIL_PROVIDER=resend, RESEND_API_KEY to a server-only Resend sending key, MAIL_FROM to an authorized sender on a verified domain, and CONTACT_EMAIL to your destination. Complete provider domain/DNS verification and any account/recipient restrictions first; a key alone is not enough. See https://resend.com/docs/api-reference/emails/send-email . SMTP settings are unused in this mode. The verification CLI checks configuration only for HTTPS; it does not send mail or verify account authorization.

## Reliability and testing

Successful SMTP recipient acceptance or a successful HTTPS message ID produces emailStatus=accepted. This is not a guarantee of inbox placement. Failure returns a safe 503, preserves the form values and never reports success. No database is added and no customer confirmation email is sent.

Rate limit is five attempts per IP per 15 minutes (in-memory per instance; use shared storage for multiple instances). Requests are limited to 12 KB, enquiry types are allowlisted, HTML is escaped and a honeypot rejects bots. Existing global backend rate limits also apply. Do not automatically retry uncertain timed-out submissions: a provider may have accepted an email before the connection was lost.

Tests use mocked providers and real local HTTP requests. No live delivery is implied. For a real test after deployment, submit the PIO form with your own details, confirm the network response says accepted, then check CONTACT_EMAIL inbox and spam. Verify CLI sends no email.
