/**
 * Deploy this as a Google Apps Script Web App to turn form submissions
 * (For Brands, Be a Guest, etc.) into rows in your Google Sheet.
 *
 * SETUP:
 * 1. Open the same Google Sheet you're using for Shows/Blog data.
 * 2. Extensions → Apps Script. Paste this file in as Code.gs.
 * 3. Deploy → New deployment → type: Web app.
 *      Execute as: Me
 *      Who has access: Anyone
 * 4. Copy the deployment URL and put it in your .env as VITE_FORMS_ENDPOINT.
 * 5. Every submission lands as a new row in a tab named "Submissions"
 *    (created automatically on first submit), with the form name and
 *    a timestamp, plus one column per field the form sent.
 */

function doPost(e) {
  const body = JSON.parse(e.postData.contents)
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const tabName = 'Submissions'
  let sheet = ss.getSheetByName(tabName)

  const keys = Object.keys(body)

  if (!sheet) {
    sheet = ss.insertSheet(tabName)
    sheet.appendRow(keys)
  } else {
    // make sure any new fields get their own column
    const existingHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
    keys.forEach((k) => {
      if (!existingHeaders.includes(k)) {
        sheet.getRange(1, sheet.getLastColumn() + 1).setValue(k)
      }
    })
  }

  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0]
  const row = headers.map((h) => body[h] ?? '')
  sheet.appendRow(row)

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
}
