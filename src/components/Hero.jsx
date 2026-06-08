import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <span className="pill">We are building community</span>

        <h1 className="hero__title">
          Your expertise can help
          <br />
          shape Ukraine.
        </h1>

        <p className="hero__lead">
          Discover opportunities that work best for you, build your path to
          Ukraine, and connect with a community that&apos;s already making a
          difference.
        </p>

        <form className="hero__form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="hero__input"
            type="email"
            placeholder="Email"
            aria-label="Email"
            required
          />
          <button className="hero__submit" type="submit">
            Join the list
          </button>
        </form>
      </div>
    </section>
  )
}
