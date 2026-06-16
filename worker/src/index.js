/**
 * Back2Impact waitlist Worker.
 *
 * Receives signups from the landing page (POST JSON {email, source, token}),
 * verifies a Cloudflare Turnstile token (so only requests from our own front
 * end can write), then inserts into D1 with a UNIQUE(email) constraint that
 * silently drops duplicates.
 *
 * Bindings (see wrangler.toml):
 *   DB                – D1 database
 *   TURNSTILE_SECRET  – Turnstile secret key (set via `wrangler secret put`)
 *   ALLOWED_ORIGINS   – optional comma-separated extra origins
 */

// Origins that are always allowed (production domains + local dev).
const BASE_ORIGINS = [
  'https://back2impact.pages.dev',
  'https://landing-ugs.oleksii-drizzle-team.us',
  'http://localhost:5173',
  'http://localhost:4173',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const TURNSTILE_VERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

function allowedOrigins(env) {
  const extra = (env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  return [...BASE_ORIGINS, ...extra]
}

function isAllowedOrigin(origin, env) {
  if (!origin) return false
  if (allowedOrigins(env).includes(origin)) return true
  // Allow Cloudflare Pages preview deployments: <hash>.back2impact.pages.dev
  try {
    const { protocol, hostname } = new URL(origin)
    if (protocol === 'https:' && hostname.endsWith('.back2impact.pages.dev')) {
      return true
    }
  } catch {
    // fall through
  }
  return false
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

function json(obj, status, origin) {
  const headers = { 'Content-Type': 'application/json' }
  if (origin) Object.assign(headers, corsHeaders(origin))
  return new Response(JSON.stringify(obj), { status, headers })
}

async function verifyTurnstile(token, secret, ip) {
  if (!token || !secret) return false
  const form = new FormData()
  form.append('secret', secret)
  form.append('response', token)
  if (ip) form.append('remoteip', ip)

  try {
    const res = await fetch(TURNSTILE_VERIFY, { method: 'POST', body: form })
    const data = await res.json()
    return data.success === true
  } catch {
    return false
  }
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin')
    const allowed = isAllowedOrigin(origin, env)

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return allowed
        ? new Response(null, { status: 204, headers: corsHeaders(origin) })
        : new Response(null, { status: 403 })
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'method_not_allowed' }, 405, null)
    }

    // Origin allowlist — first line of "only our front end can write".
    if (!allowed) {
      return json({ ok: false, error: 'forbidden' }, 403, null)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return json({ ok: false, error: 'invalid_json' }, 400, origin)
    }

    const email = String(body.email || '').trim().toLowerCase()
    const source = String(body.source || '').slice(0, 64)
    const token = String(body.token || '')

    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json({ ok: false, error: 'invalid_email' }, 400, origin)
    }

    // Turnstile — the real bot/abuse gate.
    const ip = request.headers.get('CF-Connecting-IP')
    const human = await verifyTurnstile(token, env.TURNSTILE_SECRET, ip)
    if (!human) {
      return json({ ok: false, error: 'failed_captcha' }, 403, origin)
    }

    try {
      const result = await env.DB.prepare(
        'INSERT INTO waitlist (email, source) VALUES (?, ?) ON CONFLICT(email) DO NOTHING',
      )
        .bind(email, source)
        .run()
      const duplicate = result.meta.changes === 0
      return json({ ok: true, duplicate }, 200, origin)
    } catch {
      return json({ ok: false, error: 'db_error' }, 500, origin)
    }
  },
}
