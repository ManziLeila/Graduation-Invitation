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

function buildFormFields(formConfig, data) {
  const { entries, attendanceOptions } = formConfig;
  const fields = {};

  fields[entries.name] = data.name;
  const attendanceLabel =
    attendanceOptions?.[data.attendance] ?? (data.attendance === 'yes' ? 'Yes' : 'No');
  fields[entries.attendance] = attendanceLabel;

  if (entries.phone) fields[entries.phone] = data.phone || '';
  if (entries.note) fields[entries.note] = data.note || '';
  if (entries.language) fields[entries.language] = data.lang || '';

  if (formConfig.fbzx) fields.fbzx = formConfig.fbzx;
  fields.fvv = '1';
  fields.submit = 'Submit';

  return fields;
}

/** Hidden iframe POST — works reliably with Google Forms (fetch no-cors often drops rows). */
function postViaHiddenIframe(actionUrl, fields) {
  return new Promise((resolve) => {
    const iframeName = `gf_${Date.now()}`;
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.setAttribute('aria-hidden', 'true');
    iframe.tabIndex = -1;
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(iframe);

    const form = document.createElement('form');
    form.action = actionUrl;
    form.method = 'POST';
    form.target = iframeName;
    form.style.display = 'none';

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = name;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();

    window.setTimeout(() => {
      form.remove();
      iframe.remove();
      resolve();
    }, 1600);
  });
}

export async function submitGoogleForm(formConfig, data) {
  const fields = buildFormFields(formConfig, data);
  await postViaHiddenIframe(formConfig.actionUrl, fields);
}
