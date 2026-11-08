# Frontend-only contact deployment

Contact.tsx -> src/lib/contactEmail.ts -> https://api.emailjs.com/api/v1.0/email/send

The Contact Us form already uses EmailJS directly. No backend, SMTP server, database, or /api/contact route is needed for this form. Existing field validation, honeypot, duplicate-submit protection and 20-second timeout remain active. The existing local changes in contactEmail.ts have been preserved.

## Deploy the correct project

Use PIO_website_full_brand_updated (1) as the project root, not Mango-backend-pio.
Build: npm ci && npm run build
Publish: dist
Render: create a Static Site using render.yaml. Do not use npm start for a static deployment.
Netlify: netlify.toml now publishes dist and excludes the legacy backend functions using an empty functions directory. For manual upload, upload the built frontend folder.

## EmailJS account setup

Service: service_hhxvgjo
Template: template_rosujl5
Recipient: lodhirahul7002@gmail.com
Public configuration overrides: VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, VITE_CONTACT_EMAIL. Rebuild after changing these.
Vite reads the project-root .env; src/.env is not the frontend configuration file.

In the EmailJS dashboard, ensure the service is connected and the template exists. Set To Email to the fixed owner address above (recommended), or {{to_email}}. Set Reply-To to {{reply_to}}. Include {{name}}, {{email}}, {{phone}}, {{inquiry_type}}, {{message}}, {{subject}}, and {{submitted_at}} in the template as needed. If origin restrictions are enabled, allow your deployed website origin and custom domain. Browser sends must not require a private key. Never add SMTP passwords or an EmailJS private key to a VITE_ variable.

## Verification

After deployment, submit a real enquiry and check the browser network response, EmailJS Email History, and recipient inbox/spam. A 200 response means EmailJS accepted the request; it does not prove inbox delivery. No live email was sent during this code review.

Reference: https://www.emailjs.com/docs/rest-api/send/
