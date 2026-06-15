import './HowItWorks.css';
import photo from '../assets/how-it-works-photo.jpg';

const STEPS = [
  {
    num: '01',
    title: 'Tell us about yourself',
    desc: 'Share your background, skills, and goals so we can find the best match for you',
  },
  {
    num: '02',
    title: 'Discover opportunities',
    desc: 'Browse jobs, internships, and resources to make a smooth transition into your version of Ukrainian life',
  },
  {
    num: '03',
    title: 'Connect & apply',
    desc: 'There’s so much more to life than a full-time job! Apply for internships and projects, build your network, and find a community ready to welcome you here',
  },
]

export default function HowItWorks() {
  return (
    <section className="how" id="how-it-works">
      <div className="how__container">
        <div className="how__title-block">
          <span className="pill">How it works</span>
          <h2 className="how__title">
            (Re)build your relationship
            <br />
            with Ukraine in 3 steps
          </h2>
        </div>
        <div className="how__content-container">
          <div className="how__content">
            <ol className="steps">
              {STEPS.map((step) => (
                <li className="step" key={step.num}>
                  <div className="how__num-container">
                    <span className="step__num">{step.num}</span>
                  </div>
                  <div className="step__body">
                    <h3 className="step__title">{step.title}</h3>
                    <p className="step__desc">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <figure className="how__media">
            <div className="how__photo-container">
              <img
                className="how__photo"
                src={photo}
                alt="Happy people exploring opportunities on their laptops" loading="lazy" />
            </div>
            <span className="how__badge" aria-hidden="true">
              <svg className="how__badge-icon" width="34" height="34" viewBox="0 0 24 24" fill="none">
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
      </div>
    </section>
  )
}
