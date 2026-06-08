import { useState } from 'react'
import { subscribe } from './subscribe'

// Shared form logic for the waitlist forms.
// `source` labels which form the signup came from (e.g. 'hero', 'waitlist').
export function useSubscribe(source) {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const email = new FormData(form).get('email')?.toString().trim()
    if (!email) return

    setStatus('loading')
    setError('')
    try {
      await subscribe(email, source)
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong. Please try again.')
    }
  }

  return { status, error, handleSubmit }
}
