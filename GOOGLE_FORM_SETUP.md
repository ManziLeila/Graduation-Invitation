# Save RSVPs to Google Sheets

Your site can send each RSVP to a **Google Form**. Responses appear in the linked **Google Sheet** (private to you). WhatsApp still opens afterward so guests can confirm there too.

## 1. Create the Google Form

1. Go to [Google Forms](https://forms.google.com) → **Blank form**.
2. Title it e.g. `Graduation RSVP — Keza Manzi Leila`.
3. Add these questions **in this order** (recommended):

| Question | Type | Options / notes |
|----------|------|-----------------|
| Full name | Short answer | Required |
| Will you attend? | Multiple choice | **Exactly:** `Joyfully accepts` and `Regretfully declines` |
| Phone | Short answer | Optional |
| Note | Paragraph | Optional |
| Language | Short answer | Optional (site sends `en`, `fr`, or `rw`) |

4. **Responses** tab → link to **Google Sheets** (create a new spreadsheet).

## 2. Get your form POST URL and field IDs

1. Open the live form (Preview).
2. Right‑click → **View page source** (or Inspect).
3. Search for `formResponse`. You will see something like:
   `https://docs.google.com/forms/d/e/1FAIpQLSd.../formResponse`
4. Copy that full URL → this is `actionUrl` in `config.js`.
5. Search for `entry.` in the source. Each input has a name like `entry.1234567890`. Match them to your questions (order usually matches).
   - Or use **Get prefill link** (form menu ⋮): fill sample answers, copy the URL, and read `entry.XXXXX=` from the query string.

## 3. Fill in `src/config.js`

```javascript
googleForm: {
  actionUrl: 'https://docs.google.com/forms/d/e/YOUR_ID/formResponse',
  entries: {
    name: 'entry.111111111',
    attendance: 'entry.222222222',
    phone: 'entry.333333333',
    note: 'entry.444444444',
    language: 'entry.555555555',
  },
  attendanceOptions: {
    yes: 'Joyfully accepts',
    no: 'Regretfully declines',
  },
},
```

`attendanceOptions` must match your Google Form multiple-choice text **exactly**.

Remove `language` from `entries` if you did not add that question.

6. In the form page source, search for `name="fbzx"` and copy the `value` → `fbzx` in `config.js` (required for the website to save rows).

## 4. Deploy

Push to GitHub so Vercel redeploys. Submit a test RSVP and check the **Responses** sheet.

## 5. View guests

Open the linked Google Sheet anytime, or Form → **Responses** → Sheets icon.

**Note:** Browsers cannot read Google’s reply (security), so the site cannot show “saved” confirmation from Google—but successful submits appear in the sheet within seconds.
