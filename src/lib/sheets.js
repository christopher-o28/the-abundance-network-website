// Google Sheets is the content backend for this site.
//
// READS (shows, blog posts, studio spaces, etc.):
// We use https://opensheet.elk.sh — a free proxy that turns any *public*
// Google Sheet into a JSON API, one call per tab. No API key, no service
// account. Each tab's header row becomes the JSON keys.
//
// Setup:
// 1. Create a Google Sheet, share it as "Anyone with the link — Viewer".
// 2. Grab the sheet ID from its URL:
//    https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
// 3. Put that ID in your .env file as VITE_SHEET_ID.
// 4. Create tabs named exactly: Shows, Blog, Studios (see README for columns).
//
// WRITES (inquiry / guest / brand forms):
// Handled separately in submitForm() via a Google Apps Script Web App —
// see docs/apps-script.gs for the script to deploy.

const SHEET_ID = import.meta.env.VITE_SHEET_ID
const FORMS_ENDPOINT = import.meta.env.VITE_FORMS_ENDPOINT

const cache = new Map()

export async function fetchSheet(tabName) {
  if (!SHEET_ID) {
    throw new Error(
      'No Google Sheet connected yet. Add VITE_SHEET_ID to your .env file.'
    )
  }
  if (cache.has(tabName)) return cache.get(tabName)

  const res = await fetch(`https://opensheet.elk.sh/${SHEET_ID}/${tabName}`)
  if (!res.ok) {
    throw new Error(
      `Couldn't load "${tabName}" from the sheet. Check the tab name and sharing settings.`
    )
  }
  const data = await res.json()
  cache.set(tabName, data)
  return data
}

export async function submitForm(formName, payload) {
  if (!FORMS_ENDPOINT) {
    throw new Error(
      'No form endpoint connected yet. Add VITE_FORMS_ENDPOINT to your .env file.'
    )
  }
  // Apps Script Web Apps don't return CORS headers for simple fetch reads,
  // so we fire the request in no-cors mode and treat it as fire-and-forget.
  await fetch(FORMS_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify({ form: formName, ...payload, submittedAt: new Date().toISOString() }),
  })
  return true
}
