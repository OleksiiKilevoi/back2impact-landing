import './HowItWorks.css'
import photo from '../assets/how-it-works.svg'

const STEPS = [
  {
    num: '01',
    title: 'Create your profile',
    desc: 'Share your background and skills for personalized matching',
  },
  {
    num: '02',
    title: 'Discover opportunities',
    desc: 'Browse available positions and resources',
  },
  {
    num: '03',
    title: 'Apply',
    desc: 'Apply to roles and build professional networks',
  },
]

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="container how__grid">
        <div className="how__content">
          <span className="pill">How it works</span>
          <h2 className="how__title">
            Find opportunities
            <br />
            in 3 simple steps
          </h2>

          <ol className="steps">
            {STEPS.map((step) => (
              <li className="step" key={step.num}>
                <span className="step__num">{step.num}</span>
                <div className="step__body">
                  <h3 className="step__title">{step.title}</h3>
                  <p className="step__desc">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <figure className="how__media">
          <img src={photo} alt="Two people exploring opportunities on their laptops" loading="lazy" />
          <span className="how__badge" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path
                d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"
                fill="#fff"
              />
              <path d="M14 3v5h5" fill="#cfe0ff" />
              <path
                d="M9 13h6M9 16h6M9 10h2"
                stroke="#3b6df6"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </figure>
      </div>
    </section>
  )
}
