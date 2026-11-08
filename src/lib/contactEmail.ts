import type { ContactForm } from '../components/contactValidation';

export async function sendContactEmail(form: ContactForm, signal: AbortSignal): Promise<void> {
  // Public browser credentials: static deployments also work without build-time env vars.
  // Never put an EmailJS private key or SMTP password here.
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() || 'service_hhxvgjo';
  const configuredTemplate = import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim();
  // Older Render services still have this deleted template in their environment.
  const templateId = !configuredTemplate || configuredTemplate === 'template_1d5ceon'
    ? 'template_rosujl5' : configuredTemplate;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() || '4X8Tgms0rvCIcHcVh';
  const recipient = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'lodhirahul7002@gmail.com';
  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal,
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: recipient,
        name: form.name.trim(),
        from_name: form.name.trim(),
        email: form.email.trim(),
        from_email: form.email.trim(),
        reply_to: form.email.trim(),
        phone: form.phone.trim(),
        inquiry_type: form.type,
        message: form.message.trim() || '(Not provided)',
        subject: `PIO Website - ${form.type}`,
        submitted_at: new Date().toISOString(),
      },
    }),
  });
  // EmailJS returns plain text (200 OK), not the backend's JSON envelope.
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    if (import.meta.env.DEV) {
      const reason = /template.*not found/i.test(detail) ? 'EmailJS template ID was not found'
        : /service.*not found/i.test(detail) ? 'EmailJS service ID was not found'
        : /origin/i.test(detail) ? 'This website origin is not allowed in EmailJS'
        : /public key|user.?id/i.test(detail) ? 'EmailJS public key was rejected'
        : 'Check EmailJS email history and service connection';
      console.error(`[PIO contact] EmailJS ${response.status}: ${reason}`);
    }
    throw new Error(response.status === 429
      ? 'Too many enquiries. Please wait a minute before trying again.'
      : 'Your enquiry could not be sent. Please try again or call our helpline.');
  }
}
