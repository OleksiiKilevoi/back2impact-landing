import { useEffect, useRef } from 'react'

// Cloudflare Turnstile widget — deferred ("execute") mode.
//
// The widget is rendered on mount but stays IDLE: no challenge runs until the
// form calls `handle.current.execute()` (on button click). This avoids firing a
// challenge on every page visit.
//
// `handle` is a ref object. Once the widget is ready this component populates it
// with:
//   execute() → Promise<string>  – run the challenge now, resolve with the token
//   reset()                      – return the widget to idle for the next attempt
//
// The sitekey is public and comes from VITE_TURNSTILE_SITEKEY. The Turnstile
// script itself is loaded once in index.html.

const SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY
const FAIL_MSG = 'Verification failed. Please try again.'

export default function Turnstile({ handle }) {
  const containerRef = useRef(null)

  useEffect(() => {
    let widgetId
    let intervalId
    let cancelled = false
    let resolveToken = null
    let rejectToken = null

    function fulfil(token) {
      const r = resolveToken
      resolveToken = null
      rejectToken = null
      if (r) r(token)
    }

    function reject() {
      const r = rejectToken
      resolveToken = null
      rejectToken = null
      if (r) r(new Error(FAIL_MSG))
    }

    function render() {
      if (cancelled || !window.turnstile || !containerRef.current) return
      // Guard against double-render in React StrictMode.
      if (containerRef.current.childElementCount > 0) return

      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: SITEKEY,
        size: 'flexible',
        execution: 'execute', // don't run the challenge until execute() is called
        appearance: 'interaction-only', // pass in the background; only show UI if interaction is required
        callback: (token) => fulfil(token),
        'error-callback': () => {
          reject()
          return true
        },
        'expired-callback': () => reject(),
        'timeout-callback': () => reject(),
      })

      if (handle) {
        handle.current = {
          execute: () =>
            new Promise((resolve, rej) => {
              if (!window.turnstile || widgetId == null) {
                rej(new Error(FAIL_MSG))
                return
              }
              resolveToken = resolve
              rejectToken = rej
              window.turnstile.execute(widgetId)
            }),
          reset: () =>
            window.turnstile && widgetId != null
              ? window.turnstile.reset(widgetId)
              : undefined,
        }
      }
    }

    if (window.turnstile) {
      render()
    } else {
      intervalId = setInterval(() => {
        if (window.turnstile) {
          clearInterval(intervalId)
          render()
        }
      }, 200)
    }

    return () => {
      cancelled = true
      if (intervalId) clearInterval(intervalId)
      if (window.turnstile && widgetId != null) {
        window.turnstile.remove(widgetId)
      }
      if (handle) handle.current = null
    }
  }, [handle])

  return <div ref={containerRef} className="cf-turnstile-widget" />
}
