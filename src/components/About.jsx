import './About.css'
import groupPhoto from '../assets/group.svg'

const STATS = [
  { value: '350+', label: 'Scholars supported' },
  { value: '$1,425M', label: 'Operating expenses' },
  { value: '$94M+', label: 'Scholarships awarded' },
  { value: '5,400', label: 'Applications received' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="about__head">
          <span className="pill">About us</span>
          <h2 className="about__title">10 years</h2>
          <p className="about__lead">
            A decade of building Ukraine&rsquo;s next generation of leaders through
            global education and community support.
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
      </div>
    </section>
  )
}
