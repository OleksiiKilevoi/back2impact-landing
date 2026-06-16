// Posts a waitlist signup to the Cloudflare Worker (back2impact-waitlist).
//
// The endpoint URL is injected at build time from VITE_WAITLIST_ENDPOINT
// (see .env / .env.example). The Worker is same-protocol CORS-enabled, so we
// POST normal JSON and can read the response (unlike the old Apps Script setup
// which required a `no-cors` opaque request).
//
// `token` is a Cloudflare Turnstile token proving the request came from a real
// browser on our site. The Worker rejects requests without a valid token.

const ENDPOINT = import.meta.env.VITE_WAITLIST_ENDPOINT

const ERRORS = {
  failed_captcha: 'Verification failed. Please refresh and try again.',
  invalid_email: 'Please enter a valid email address.',
  forbidden: 'This request was blocked. Please reload the page.',
}

export async function subscribe(email, source, token) {
  if (!ENDPOINT) {
    throw new Error(
      'Waitlist endpoint is not configured. Set VITE_WAITLIST_ENDPOINT in your .env file.',
    )
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, source, token }),
  })

  if (!res.ok) {
    let code
    try {
      code = (await res.json()).error
    } catch {
      // ignore – fall back to generic message
    }
    throw new Error(ERRORS[code] || 'Something went wrong. Please try again.')
  }

  // { ok: true, duplicate: boolean }. A duplicate is still a success to the user.
  return res.json().catch(() => ({ ok: true }))
}
