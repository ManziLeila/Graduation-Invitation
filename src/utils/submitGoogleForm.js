export { isGoogleFormConfigured } from './googleFormPayload.js';

export async function submitGoogleForm(_formConfig, data) {
  const res = await fetch('/api/rsvp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`RSVP API ${res.status}`);
  }
  const json = await res.json();
  if (!json.ok) {
    throw new Error(json.error || 'RSVP save failed');
  }
}
