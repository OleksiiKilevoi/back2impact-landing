# Connect the waitlist forms to Google Sheets

Both email forms (the hero form and the "Join the waitlist" form) POST signups
to a **Google Apps Script web app**, which appends a row to a Google Sheet.
No backend or third-party service required.

## 1. Create the Sheet

1. Go to <https://sheets.google.com> and create a new blank spreadsheet.
2. Name it something like **Back2Impact Waitlist**. (The script creates a tab
   called `Waitlist` automatically with `Timestamp | Email | Source` headers.)

## 2. Add the script

1. In the sheet: **Extensions → Apps Script**.
2. Delete the placeholder `Code.gs` content and paste in the contents of
   [`google-apps-script/Code.gs`](google-apps-script/Code.gs) from this repo.
3. Click the **Save** icon.

## 3. Deploy as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon → choose **Web app**.
3. Set:
   - **Description**: `Waitlist endpoint`
   - **Execute as**: **Me**
   - **Who has access**: **Anyone**  ← required so the public form can post
4. Click **Deploy**, then **Authorize access** and approve the permissions
   (it's your own script writing to your own sheet).
5. Copy the **Web app URL** — it looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

> Tip: open that URL in a browser. You should see
> `{"ok":true,"message":"Back2Impact waitlist endpoint is live."}`

## 4. Point the site at it

1. Open `.env` in the project root and set the URL:
   ```
   VITE_WAITLIST_ENDPOINT=https://script.google.com/macros/s/AKfyc.../exec
   ```
2. Restart the dev server (`npm run dev`) or rebuild (`npm run build`).
   Vite only reads `.env` at startup/build time.
3. For the **Cloudflare Pages** deployment, add the same variable in the
   Cloudflare dashboard: **Pages project → Settings → Environment variables →
   `VITE_WAITLIST_ENDPOINT`**, then redeploy. (Or it's baked in at
   `npm run deploy` time from your local `.env`.)

## 5. Test

Submit either form. A new row appears in the sheet within a second or two:

| Timestamp | Email | Source |
|-----------|-------|--------|
| 2026-06-08 17:40 | you@example.com | hero |
| 2026-06-08 17:41 | you@example.com | waitlist |

The `Source` column tells you which form the signup came from.

## Updating the script later

If you edit `Code.gs`, you must **Deploy → Manage deployments → edit (pencil)
→ Version: New version → Deploy** to publish the change. Creating a brand-new
deployment instead gives you a *new URL* (which you'd then have to update in
`.env`).
