# Nico Schultz — Site

A single-page athlete portfolio site: animated load-in, typed name hero, an
ambient dot-field background, a personal-records grid, a sliding sponsor
carousel, a scroll-drawn journey timeline, and a footer with a bottom-of-page
popup (contact / GoFundMe).

Built with [Vite](https://vitejs.dev) + React.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Editing content

Everything you'll want to change day-to-day lives in one place: the `CONFIG`
object at the top of **`src/App.jsx`**.

- **`nav`** — top nav quick links (in-page anchors like `#prs`, or full URLs)
- **`socials`** — social links, shown in the nav bar and the social strip.
  `icon` accepts: `instagram`, `twitter`, `tiktok`, `strava`, `youtube`,
  `linkedin`, `email`
- **`prs`** — personal records shown as scoreboard-style cards
- **`sponsors`** — shown in the sliding carousel. Each sponsor is
  `{ name, tier, initials, color }` — `color` sets that card's accent bar
  and logo badge automatically. Add as many as you like.
- **`timeline`** — the "Journey" section, earliest entry first
- **`footerLinks`**, **`gofundme`**, **`contact`** — footer + bottom popup

Nothing else in `App.jsx` needs to change for normal content updates.

Design tokens (colors, fonts, spacing) live at the top of `src/index.css`
as CSS custom properties, if you want to retheme later.

## Building for production

```bash
npm run build
```

Output goes to `dist/`. `vercel.json` is included for a zero-config deploy
to Vercel — just push this repo and import it there.

## Project structure

```
├── public/              # static assets (empty for now)
├── src/
│   ├── App.jsx           # all page content + logic (CONFIG lives here)
│   ├── index.css          # design tokens + all styles
│   └── main.jsx           # React entry point
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```
