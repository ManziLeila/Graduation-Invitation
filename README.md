# Graduation invitation (React + Vite)

Single-page, mobile-first graduation invitation in **English**, **French**, and **Kinyarwanda**. No backend.

## Customize

1. **`src/config.js`** — Your name, initials, degree (per language), date (`YYYY-MM-DD`), events (time, venue, Google Maps URL), WhatsApp number (digits only), MTN MoMo entries, and bank details.
2. **`src/i18n/translations.js`** — All UI copy and WhatsApp message labels in `en`, `fr`, and `rw`.
3. **`index.html`** — Page title and Open Graph / Twitter descriptions.
4. **`public/favicon.svg`** — Your initials.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Go live (free, without github.io)

Keep code on GitHub if you like; host the site on **Netlify** or **Vercel** instead. You get a link like `keza-graduation.netlify.app` or `graduation-invite.vercel.app` (you can pick the name on the free plan).

### Vercel (recommended)

1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. **Add New Project** → import **ManziLeila/Graduation-Invitation**.
3. Leave defaults: **Build** `npm run build`, **Output** `dist` → **Deploy**.
4. **Project Settings → Domains** → edit the `.vercel.app` name if you want.
5. Share that URL only (no `github.io`).

Every push to `main` redeploys automatically.

### Netlify

1. Sign in at [netlify.com](https://netlify.com) with GitHub.
2. **Add new site → Import an existing project** → choose the repo.
3. Build command: `npm run build`, publish directory: `dist` (also in `netlify.toml`).
4. **Site configuration → Domain management** → change the `*.netlify.app` subdomain.

### Your own domain later

In Netlify or Vercel: **Domains → Add custom domain** (e.g. `invite.yourname.com`). Point DNS as they instruct. `vite.config.js` already uses `base: '/'` for root hosting.

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
