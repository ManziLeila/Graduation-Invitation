# Graduation invitation (React + Vite)

Single-page, mobile-first graduation invitation in **English**, **French**, and **Kinyarwanda**. No backend — deploy to Netlify, Vercel, or GitHub Pages.

## Customize

1. **`src/config.js`** — Your name, initials, degree (per language), date (`YYYY-MM-DD`), events (time, venue, Google Maps URL), WhatsApp number (digits only), MTN MoMo entries, and bank details.
2. **`src/i18n/translations.js`** — All UI copy and WhatsApp message labels in `en`, `fr`, and `rw`.
3. **`index.html`** — Page title and Open Graph / Twitter descriptions (match your name and event).
4. **`public/favicon.svg`** — Replace `XX` with your initials.

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Production build

```bash
npm run build
npm run preview
```

Static files are in `dist/`.

## Deploy

### Netlify

- Connect the repo or drag-and-drop `dist/` after `npm run build`.
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

- Import the project; Vercel detects Vite automatically.
- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages

For a project site at `https://<user>.github.io/<repo>/`, set the Vite base path in `vite.config.js`:

```js
export default defineConfig({
  base: '/<repo-name>/',
  plugins: [react()],
});
```

Then build and deploy `dist/` (e.g. GitHub Actions “Deploy static content to Pages” or push `dist` to the `gh-pages` branch).

For a user/org site at `https://<user>.github.io/`, use `base: '/'`.

## Project layout

```
src/
  config.js
  i18n/translations.js
  i18n/LanguageContext.jsx
  hooks/useActiveSection.js
  hooks/useReveal.js
  components/
  App.jsx
  main.jsx
  index.css
```
