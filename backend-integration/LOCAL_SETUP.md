# Same-origin contact API (local and Node hosting)

Run `npm install`, then `npm run dev`. Vite now serves `/api/pio/contact` inside the same process as the frontend. Restart Vite after changing `.env`.

Root `.env` (beside package.json) is the server configuration. `VITE_CONTACT_API_BASE_URL=` uses the same origin. SMTP settings were migrated locally from src/.env; credentials remain ignored by Git. Existing deployment environment values take precedence over .env. Only public URLs should use the VITE_ prefix.

For production on a Node host: `npm run build`, then `npm start` (PORT defaults to 5000). Set server mail variables on that host. A static-only upload of dist does not run the API; use a Node host or deploy the existing backend integration and configure VITE_CONTACT_API_BASE_URL before building.

Required SMTP variables: CONTACT_MAIL_PROVIDER=smtp, CONTACT_EMAIL, MAIL_FROM, MAIL_HOST, MAIL_PORT, MAIL_SECURE, MAIL_USER, MAIL_PASS. Ports 587/false and 465/true are supported. `npm run mail:verify` checks connection/authentication without sending email.

Checks: `npm test`, `npm run test:coverage`, `npm run typecheck`, `npm run build`. For browser tests: `npx playwright install chromium`, then `npm run test:browser`.

Provider acceptance is not inbox delivery. To check real delivery, submit the form and check the configured recipient's inbox/spam. No live email was sent during automated verification.
