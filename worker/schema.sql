-- Back2Impact waitlist storage (Cloudflare D1).
-- Email is stored normalized (trimmed + lowercased) and UNIQUE, so duplicate
-- signups are rejected at the database level.

CREATE TABLE IF NOT EXISTS waitlist (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT NOT NULL UNIQUE,
  source     TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist (created_at);
