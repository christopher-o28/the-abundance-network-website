# The Pod Network — website

React + Vite + Tailwind, with Google Sheets as the backend. No hero photo —
the identity runs on an animated waveform motif instead (fits a podcast
company, and it's alive without ever loading an image).

## Design at a glance

- **Colors**: `paper` (#FAF9F5, background), `ink` (#14151A, text/dark
  sections), `signal` (#FF4B3E, the "on-air" accent), `tape` (#1F6F5C),
  `gold` (#E8AA42).
- **Type**: Bricolage Grotesque for headlines, Inter for body copy, IBM Plex
  Mono for labels/timestamps (the "broadcast log" details — eyebrows, stats,
  dates).
- **Signature element**: the waveform bars (`src/components/Waveform.jsx`) —
  used in the hero, the nav mark, section dividers, and every play button.

## 1. Install & run

```bash
npm install
cp .env.example .env
npm run dev
```

The site works with empty env vars — the Shows / Insider sections will just
show a friendly "not connected yet" state until you wire up the sheet below.

## 2. Connect your Google Sheet (reads)

1. Create a Google Sheet.
2. Share it: **Anyone with the link → Viewer**.
3. Copy the ID from the URL: `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`
4. Put it in `.env` as `VITE_SHEET_ID`.
5. Create two tabs with these exact headers in row 1:

**`Shows` tab**
| id | title | host | category | description | streams | coverColor | coverImageUrl | audioEmbedUrl | episodeDate |
|----|-------|------|----------|-------------|---------|------------|----------------|----------------|-------------|

- `coverColor` is optional — use a hex like `#1F6F5C`, or leave blank to
  auto-assign one of the brand accents.
- `audioEmbedUrl` — link to the episode (Spotify, YouTube, etc.), used by
  the play button.

**`Blog` tab**
| id | title | date | excerpt | image | link | category |
|----|-------|------|---------|-------|------|----------|

**`StudioRentals` or `Studios` tab**
| id | name | tagline | desc | rate | capacity | image | category |
|----|------|---------|------|------|----------|-------|----------|

- `image` — direct image URL for the studio photo (e.g. Google Drive direct link, Imgur, Unsplash, or CDN link). Also supports column header `imageUrl` or `coverImageUrl`.
- `category` — optional badge label like "Roundtable / Panel", "Solo / Remote", or "Voiceover / Audio".


That's it — no API key needed. Reads go through
[opensheet.elk.sh](https://github.com/benborgers/opensheet), a small free
proxy that turns a public sheet tab into JSON (see `src/lib/sheets.js`).

**If your data is sensitive**, don't use this proxy — swap `fetchSheet()` for
a call to the Google Sheets API v4 with a service account, or route it
through your own backend instead.

## 3. Connect form submissions (writes)

The "For Brands" and "Be a Guest" forms need somewhere to write to:

1. Open the same Sheet → **Extensions → Apps Script**.
2. Paste in `docs/apps-script.gs`.
3. **Deploy → New deployment → Web app**, execute as *Me*, access *Anyone*.
4. Copy the deployment URL into `.env` as `VITE_FORMS_ENDPOINT`.

Submissions land in an auto-created `Submissions` tab, one row per entry.

## 4. Build for production

```bash
npm run build
```

Output goes to `dist/` — deploy it anywhere that serves static files
(Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc.). Remember to set
`VITE_SHEET_ID` and `VITE_FORMS_ENDPOINT` as environment variables on
whatever host you use, since Vite bakes them in at build time.

## Project structure

```
src/
  components/   Navbar, Footer, Waveform, ShowCard, InquiryForm, ...
  pages/        Home, Shows, ForBrands, ForCreators, BeAGuest,
                StudioRentals, Insider
  lib/          sheets.js (fetch/submit), useSheet.js (loading hook)
docs/
  apps-script.gs   paste into Google Apps Script to enable form writes
```
