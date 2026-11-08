# Resend contact form deployment

The contact form now sends to POST /api/contact. The Node server sends through the Resend HTTPS API using the published new-enquiry-notification template (name, phone, email, purpose, message). The same server serves dist. EmailJS is no longer used.

## Local development
Keep RESEND_API_KEY in the ignored root .env. Run npm run dev:server in one terminal and npm run dev in another. Vite proxies /api to port 3001. For production locally, run npm run build then npm start.

## Render deployment
This setup requires a Node Web Service, not a Static Site. Create a Web Service connected to this repository/main, repository root as Root Directory, build command npm ci && npm run build, start command npm start, health path /api/health. render.yaml contains the equivalent Blueprint. A Static Site cannot run the contact endpoint.

Set RESEND_API_KEY as a private Render environment variable, RESEND_TEMPLATE_ID=new-enquiry-notification, RESEND_FROM_EMAIL=onboarding@resend.dev, CONTACT_EMAIL=lodhirahul7002@gmail.com. Never use a VITE_ prefix for the key. Remove old VITE_EMAILJS_* values. Do not commit .env.

The resend.dev sender sends only to the Resend account email. Use a verified-domain sender for production. HTTPS is used because Render Free blocks SMTP ports 465/587. Publish template edits before sending. Maximum message length is 2000 characters (Resend variable limit).

A successful response means Resend accepted the email, not guaranteed inbox delivery. Check Resend Email History and inbox/spam. Static-only Netlify deployment does not support this server configuration.
