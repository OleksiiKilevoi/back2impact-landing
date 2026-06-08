/**
 * Back2Impact waitlist → Google Sheet
 *
 * Receives POSTed signups from the landing page forms and appends a row.
 * See WAITLIST_SETUP.md for deployment steps.
 */

const SHEET_NAME = 'Waitlist'

// PASTE YOUR SHEET ID HERE (recommended — works whether or not the script is
// bound to the spreadsheet). It's the part of the sheet URL between /d/ and /edit:
//   https://docs.google.com/spreadsheets/d/THIS_PART_IS_THE_ID/edit
const SPREADSHEET_ID = '13yFd_8KI2AZDH6TneCVmBgbBZNpUzO3egWJD_Fw-5uE'

function doPost(e) {
  const lock = LockService.getScriptLock()
  try {
    lock.waitLock(20000)

    const params = (e && e.parameter) || {}
    const email = (params.email || '').toString().trim()
    const source = (params.source || '').toString().trim()

    if (!email) {
      return json_({ ok: false, error: 'Missing email' })
    }

    getSheet_().appendRow([new Date(), email, source])
    return json_({ ok: true })
  } catch (err) {
    return json_({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

function doGet(e) {
  // Diagnostic: open  …/exec?diag=1  in a browser to check the sheet is reachable.
  if (e && e.parameter && e.parameter.diag) {
    try {
      const sheet = getSheet_()
      return json_({ ok: true, sheet: sheet.getName(), rows: sheet.getLastRow() })
    } catch (err) {
      return json_({ ok: false, error: String(err) })
    }
  }
  return json_({ ok: true, message: 'Back2Impact waitlist endpoint is live.' })
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID)
  }
  const active = SpreadsheetApp.getActiveSpreadsheet()
  if (!active) {
    throw new Error(
      'No active spreadsheet — set SPREADSHEET_ID at the top of the script.',
    )
  }
  return active
}

function getSheet_() {
  const ss = getSpreadsheet_()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Email', 'Source'])
  }
  return sheet
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  )
}
