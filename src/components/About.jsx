import './About.css'
import groupPhoto from '../assets/group.png'

const STATS = [
  { value: '350+', label: 'Scholars supported' },
  { value: '$1,425M', label: 'Operating expenses' },
  { value: '$94M+', label: 'Scholarships awarded' },
  { value: '5,400', label: 'Applications received' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__head">
          <span className="pill">About us</span>
          <h2 className="about__title">10 years</h2>
          <p className="about__lead">
            A decade of building Ukraine&rsquo;s next generation of leaders
            <br />
            through global education and community support.
          </p>
        </div>

        <ul className="stats">
          {STATS.map((stat) => (
            <li className="stat" key={stat.label}>
              <span className="stat__rule" />
              <span className="stat__value">{stat.value}</span>
              <span className="stat__label">{stat.label}</span>
            </li>
          ))}
        </ul>

        <figure className="about__photo">
          <img
            src={groupPhoto}
            alt="Ukraine Global Scholars community gathered in the Carpathian mountains"
            loading="lazy"
          />
        </figure>
        <div className="about__mission-block">
          <h3 className="about__mission-heading">
            Our mission
          </h3>
          <div className="about__mission-info-block">
            <p className="about__mission-title">
              We aim to develop a new generation
              <br/>
              of Ukrainian leaders capable of creating
              <br/>
              a victorious and prosperous future in Ukraine
              <br/>
              today
            </p>
            <p className="about__mission-description">
              Through mentorship, education, career guidance,
              and empowerment for Ukrainian youth, we seek to
              scale our impact and generate a powerful ripple effect
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
