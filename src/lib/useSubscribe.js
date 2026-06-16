import { useRef, useState } from 'react'
import { subscribe } from './subscribe'

// Shared form logic for the waitlist forms.
// `source` labels which form the signup came from (e.g. 'hero', 'waitlist').
//
// `turnstileRef` must be attached to a <Turnstile handle={turnstileRef} />
// rendered inside the form; it supplies the verification token at submit time.
export function useSubscribe(source) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')
  const turnstileRef = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get('email')?.toString().trim()
    if (!email) return

    setStatus('loading')
    setError('')
    try {
      // Run the Turnstile challenge now (on click), then submit with the token.
      const token = await turnstileRef.current?.execute?.()
      if (!token) throw new Error('Verification failed. Please try again.')
      await subscribe(email, source, token)
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      // Tokens are single-use; return the widget to idle for the next attempt.
      turnstileRef.current?.reset?.()
    }
  }

  return { status, error, handleSubmit, turnstileRef }
}
