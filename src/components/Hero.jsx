import './Hero.css';
import { useSubscribe } from '../lib/useSubscribe';
import balloon from '../assets/air-balloon.svg';
import smallCloud from '../assets/small-cloud.svg';
import bigCloud from '../assets/big-cloud.svg';

export default function Hero() {
  const { status, error, handleSubmit } = useSubscribe('hero')

  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <span className="pill">Come. Make an impact here</span>

        <h1 className="hero__title">
          Find your role
          <br /> 
          in Ukraine's recovery
        </h1>

        <p className="hero__lead">
          Discover opportunities that work best for you, build your path to
          Ukraine, and connect with a community that&apos;s already making a
          difference.
        </p>

        <form className="hero__form" onSubmit={handleSubmit}>
          <input
            className="hero__input"
            type="email"
            name="email"
            placeholder="Email"
            aria-label="Email"
            required
            disabled={status === 'loading'}
          />
          <button
            className="hero__submit"
            type="submit"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Joining…' : 'Get early access'}
          </button>
        </form>

        {status === 'success' && (
          <p className="form-status form-status--ok" role="status">
            Thanks! You&apos;re on the list — we&apos;ll be in touch.
          </p>
        )}
        {status === 'error' && (
          <p className="form-status form-status--err" role="alert">
            {error}
          </p>
        )}
      </div>
      <img src={balloon} alt="Balloon" className="hero__balloon" />
      <img src={smallCloud} alt="Cloud" className="hero__small-cloud" />
      <img src={bigCloud} alt="Cloud" className="hero__big-cloud" />
    </section>
  )
}
