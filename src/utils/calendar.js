import { localized } from './localized';

function parseTime(time) {
  const [h, m] = time.split(':').map(Number);
  return { h, m };
}

function formatIcsDate(dateStr, time) {
  const { h, m } = parseTime(time);
  const [y, mo, d] = dateStr.split('-').map(Number);
  const pad = (n) => String(n).padStart(2, '0');
  return `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
}

export function buildGoogleCalendarUrl({ date, time, durationMinutes, title, location, details }) {
  const start = formatIcsDate(date, time);
  const { h, m } = parseTime(time);
  const endDate = new Date(`${date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
  endDate.setMinutes(endDate.getMinutes() + durationMinutes);
  const end = `${endDate.getFullYear()}${String(endDate.getMonth() + 1).padStart(2, '0')}${String(endDate.getDate()).padStart(2, '0')}T${String(endDate.getHours()).padStart(2, '0')}${String(endDate.getMinutes()).padStart(2, '0')}00`;

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: details || '',
    location: location || '',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcsBlob(events, { calendarName, lang }) {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Graduation Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${calendarName}`,
  ];

  events.forEach((event, index) => {
    const location = localized(event.venue, lang);
    const start = formatIcsDate(event.date, event.time);
    const { h, m } = parseTime(event.time);
    const endDt = new Date(`${event.date}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00`);
    endDt.setMinutes(endDt.getMinutes() + event.durationMinutes);
    const end = `${endDt.getFullYear()}${String(endDt.getMonth() + 1).padStart(2, '0')}${String(endDt.getDate()).padStart(2, '0')}T${String(endDt.getHours()).padStart(2, '0')}${String(endDt.getMinutes()).padStart(2, '0')}00`;

    lines.push(
      'BEGIN:VEVENT',
      `UID:graduation-${index}-${event.key}@invite`,
      `DTSTAMP:${formatIcsDate(event.date, '00:00')}`,
      `DTSTART;TZID=Africa/Kigali:${start}`,
      `DTEND;TZID=Africa/Kigali:${end}`,
      `SUMMARY:${escapeIcs(event.title)}`,
      `LOCATION:${escapeIcs(location)}`,
      `DESCRIPTION:${escapeIcs(event.description || '')}`,
      'END:VEVENT',
    );
  });

  lines.push('END:VCALENDAR');
  return new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
}

function escapeIcs(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

export function downloadIcs(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
