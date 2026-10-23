function isPlaceholder(value) {
  return !value || String(value).includes('REPLACE');
}

export function isGoogleFormConfigured(formConfig) {
  if (!formConfig?.actionUrl || isPlaceholder(formConfig.actionUrl)) return false;
  const { entries } = formConfig;
  return Boolean(
    entries?.name &&
      entries?.attendance &&
      !isPlaceholder(entries.name) &&
      !isPlaceholder(entries.attendance),
  );
}

export function viewFormUrlFromAction(actionUrl) {
  return String(actionUrl).replace(/\/formResponse\/?$/, '/viewform');
}

export function parseFbzxFromViewHtml(html) {
  return html.match(/name="fbzx"\s+value="(-?\d+)"/)?.[1] ?? null;
}

/** Fields Google expects (including multiple-choice sentinel + partialResponse). */
export function buildGoogleFormBody(formConfig, data, fbzx) {
  const { entries, attendanceOptions } = formConfig;
  const fields = new URLSearchParams();

  fields.set(entries.name, data.name);
  const attendanceLabel =
    attendanceOptions?.[data.attendance] ?? (data.attendance === 'yes' ? 'Yes' : 'No');
  fields.set(entries.attendance, attendanceLabel);
  fields.set(`${entries.attendance}_sentinel`, '');

  if (entries.phone) fields.set(entries.phone, data.phone || '');
  if (entries.note) fields.set(entries.note, data.note || '');
  if (entries.language) fields.set(entries.language, data.lang || '');

  fields.set('fvv', '1');
  fields.set('pageHistory', '0');
  fields.set('partialResponse', `[null,null,"${fbzx}"]`);
  fields.set('fbzx', fbzx);
  fields.set('submissionTimestamp', String(Date.now()));
  fields.set('submit', 'Submit');

  return fields;
}

export async function postToGoogleForm(formConfig, data) {
  const actionUrl = formConfig.actionUrl;
  const viewUrl = viewFormUrlFromAction(actionUrl);

  const getRes = await fetch(viewUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; GraduationRSVP/1.0; +https://graduation-invitation-one-teal.vercel.app)',
    },
  });
  if (!getRes.ok) {
    throw new Error(`Could not load Google Form (${getRes.status})`);
  }

  const html = await getRes.text();
  const fbzx = parseFbzxFromViewHtml(html);
  if (!fbzx) {
    throw new Error('Could not read Google Form token (fbzx)');
  }

  const setCookie = getRes.headers.getSetCookie?.() ?? [];
  const cookieHeader = setCookie.map((c) => c.split(';')[0]).join('; ');

  const body = buildGoogleFormBody(formConfig, data, fbzx);
  const postRes = await fetch(actionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: viewUrl,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
    body: body.toString(),
    redirect: 'follow',
  });

  const text = await postRes.text();
  const ok =
    /another response|autre réponse|Submit another/i.test(text) ||
    postRes.url.includes('formResponse');

  if (!ok) {
    throw new Error('Google Form did not accept the response');
  }
}
