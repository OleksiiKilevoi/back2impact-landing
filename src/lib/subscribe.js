// Posts a waitlist signup to the Google Apps Script web app.
//
// The endpoint URL is injected at build time from VITE_WAITLIST_ENDPOINT
// (see .env / .env.example). It is a public URL — safe to ship to the browser.
//
// Google Apps Script web apps respond with a 302 redirect to
// googleusercontent.com, which omits CORS headers, so a normal (readable)
// cross-origin fetch is blocked. We therefore POST with `mode: 'no-cors'`:
// the request still reaches the script and the row is written, but the
// response is opaque. We treat "no network error" as success.

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT

export async function subscribe(email, source) {
  if (!ENDPOINT) {
    throw new Error(
      'Waitlist endpoint is not configured. Set VITE_WAITLIST_ENDPOINT in your .env file.',
    )
  }

  const body = new URLSearchParams({ email, source })

  await fetch(ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    body, // URLSearchParams => application/x-www-form-urlencoded (no CORS preflight)
  })
}
