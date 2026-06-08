import './Waitlist.css'

export default function Waitlist() {
  return (
    <section className="waitlist" id="waitlist">
      <div className="container waitlist__inner">
        <h2 className="waitlist__title">Join the waitlist</h2>
        <p className="waitlist__lead">
          Be among the first to access Back to Impact and receive updates about
          new opportunities, platform launches, and community initiatives
        </p>

        <form className="waitlist__form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="waitlist__input"
            type="email"
            placeholder="Email"
            aria-label="Email"
            required
          />
          <button className="waitlist__submit" type="submit">
            Join
          </button>
        </form>
      </div>
    </section>
  )
}
