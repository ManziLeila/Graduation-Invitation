import config from '../src/config.js';
import { isGoogleFormConfigured, postToGoogleForm } from '../src/utils/googleFormPayload.js';

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return null;
    }
  }
  return null;
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowed =
    origin === config.siteUrl ||
    origin.endsWith('.vercel.app') ||
    origin.startsWith('http://localhost:');

  if (allowed && origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const formConfig = config.googleForm;
  if (!isGoogleFormConfigured(formConfig)) {
    return res.status(503).json({ ok: false, error: 'Google Form is not configured' });
  }

  const body = readJsonBody(req);
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const attendance = body?.attendance === 'yes' || body?.attendance === 'no' ? body.attendance : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const note = typeof body?.note === 'string' ? body.note.trim() : '';
  const lang = typeof body?.lang === 'string' ? body.lang : '';

  if (!name || !attendance) {
    return res.status(400).json({ ok: false, error: 'Name and attendance are required' });
  }

  try {
    await postToGoogleForm(formConfig, { name, attendance, phone, note, lang });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('RSVP save failed:', err);
    return res.status(502).json({ ok: false, error: 'Could not save to Google Form' });
  }
}
