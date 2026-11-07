# Render frontend deployment

Create a Render Static Site from this repository (or use the included render.yaml Blueprint).

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- The verified public EmailJS settings are included in the frontend, so no environment variables are required. The four VITE_ values in `.env.example` can optionally override them; remove stale overrides from Render Environment.
- For manual Static Site setup, add a rewrite from `/*` to `/index.html`.
- Rebuild after changing any VITE_ environment variable.

The contact form sends directly to EmailJS. No backend service or SMTP configuration is required.

In EmailJS, open template `template_rosujl5` and set To Email to `{{to_email}}` (or the fixed owner address `lodhirahul7002@gmail.com`) and Reply-To to `{{reply_to}}`. The body should contain `{{name}}`, `{{email}}`, `{{phone}}`, `{{inquiry_type}}`, `{{message}}`, and `{{submitted_at}}`. Save the template and ensure service `service_hhxvgjo` is connected. If allowed origins are enabled, add the deployed Render origin and your custom domain.

Only public EmailJS credentials belong in browser configuration. Private EmailJS keys and SMTP passwords must never be added to VITE_ variables. Rotate credentials previously shared in example files.

After deployment, submit a real contact enquiry and check the EmailJS email history and recipient inbox. An accepted request confirms EmailJS accepted the email; final inbox delivery depends on the connected email service.
