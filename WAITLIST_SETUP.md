# Waitlist (Cloudflare Worker + D1 + Turnstile)

Both email forms (hero + "Join the waitlist") POST signups to a **Cloudflare
Worker** (`back2impact-waitlist`), which verifies a **Turnstile** token and
stores the email in a **D1** database. This replaces the old Google Apps Script
+ Sheets setup.

Why this stack:

- **Privacy / anti-abuse** — only requests carrying a valid Turnstile token from
  an allowed origin can write. Direct/scripted POSTs are rejected.
- **No duplicates** — `email` is stored normalized (lowercased) with a `UNIQUE`
  constraint; repeat signups return `{ok:true, duplicate:true}` and write nothing.
- **Scale** — Workers Free = 100k req/day, D1 Free = 100k writes/day. A
  2,000–3,000 person conference burst is well within free limits, with none of
  the Apps Script / Sheets API rate caps.

## Architecture

```
Browser form → Turnstile token → POST JSON {email, source, token}
   → Worker (back2impact-waitlist)
       → verify Turnstile token (TURNSTILE_SECRET)
       → INSERT INTO waitlist ... ON CONFLICT(email) DO NOTHING  (D1)
   → {ok:true, duplicate}
```

Files:

- `worker/src/index.js` — the Worker
- `worker/wrangler.toml` — Worker config + D1 binding
- `worker/schema.sql` — D1 table
- `src/lib/subscribe.js` / `useSubscribe.js` / `Turnstile.jsx` — front end
- `.env` — `VITE_WAITLIST_ENDPOINT` (Worker URL) + `VITE_TURNSTILE_SITEKEY`

## Already provisioned

- **D1 database** `back2impact-waitlist` (id in `worker/wrangler.toml`), schema applied (remote + local).
- **Worker** deployed at `https://back2impact-waitlist.oleksii-kilevoi.workers.dev`.

## One-time setup you still need to do

### 1. Create a Turnstile widget

1. Cloudflare dashboard → **Turnstile** → **Add widget**.
2. Add hostnames: `back2impact.pages.dev`, `landing-ugs.oleksii-drizzle-team.us`,
   and `localhost`.
3. Widget mode: **Managed** (invisible unless a challenge is needed).
4. Copy the **Site Key** (public) and **Secret Key** (private).

### 2. Wire the keys in

```bash
# Public sitekey → front end (.env)
#   VITE_TURNSTILE_SITEKEY=0x....

# Secret → Worker (NOT committed)
cd worker
npx wrangler secret put TURNSTILE_SECRET   # paste the secret key
```

Put the sitekey into `.env` (`VITE_TURNSTILE_SITEKEY=...`).

> For **local dev** you can keep the Cloudflare TEST keys: sitekey
> `1x00000000000000000000AA` in `.env`, and the test secret is already in
> `worker/.dev.vars`. They always pass — never deploy them to production.

### 3. Deploy

```bash
npm run worker:deploy   # redeploy Worker (only needed if you change worker/)
npm run deploy          # build front end + deploy to Cloudflare Pages (production)
```

The front end's `VITE_*` values are baked in at `npm run deploy` time from your
local `.env`, so make sure the real sitekey + Worker URL are set there first.

## Day-to-day

```bash
npm run worker:dev          # run the Worker locally (localhost:8799) against local D1
npm run worker:emails       # dump all signups from production D1
npm run worker:db:init      # (re)apply schema to remote D1  — idempotent
```

Export to CSV when you need the list elsewhere:

```bash
cd worker
npx wrangler d1 execute back2impact-waitlist --remote \
  --command="SELECT email, source, created_at FROM waitlist ORDER BY created_at" --json
```

## Adding/removing allowed origins

Edit `BASE_ORIGINS` in `worker/src/index.js`, or set the `ALLOWED_ORIGINS`
var (comma-separated) in `worker/wrangler.toml`, then `npm run worker:deploy`.
`*.back2impact.pages.dev` preview deploys are already allowed.

## Retiring Google Apps Script

The old `google-apps-script/Code.gs` and its web app are no longer used. You can
leave the Apps Script deployment up (harmless) or delete it. Existing rows in the
old Google Sheet are not migrated — export them manually if you want them in D1.
