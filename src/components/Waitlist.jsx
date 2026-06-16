import './Waitlist.css'
import { useSubscribe } from '../lib/useSubscribe'
import Turnstile from '../lib/Turnstile'

export default function Waitlist() {
  const { status, error, handleSubmit, turnstileRef } = useSubscribe('waitlist')

  return (
    <section className="waitlist" id="waitlist">
      <div className="container waitlist__inner">
        <h2 className="waitlist__title">Join the waitlist</h2>
        <p className="waitlist__lead">
          Be among the first to access Back to Impact and receive updates about
          new opportunities, platform launches, and community initiatives
        </p>

        <form className="waitlist__form" onSubmit={handleSubmit}>
          <input
            className="waitlist__input"
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            required
            disabled={status === 'loading'}
          />
          <button
            className="waitlist__submit"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Joining…' : 'Get early access'}
          </button>
          <Turnstile handle={turnstileRef} />
        </form>

        {status === 'success' && (
          <p className="form-status form-status--ok" role="status">
            Thanks! You&apos;re on the waitlist — we&apos;ll be in touch.
          </p>
        )}
        {status === 'error' && (
          <p className="form-status form-status--err" role="alert">
            {error}
          </p>
        )}
      </div>
    </section>
  )
}
