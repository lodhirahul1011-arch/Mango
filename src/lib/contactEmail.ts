import type { ContactForm } from '../components/contactValidation';
export async function sendContactEmail(form: ContactForm, signal: AbortSignal): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, signal, body: JSON.stringify(form),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || !result?.ok) throw new Error(response.status === 429
    ? 'Too many enquiries. Please wait a minute before trying again.'
    : 'Your enquiry could not be sent. Please try again or call our helpline.');
}
