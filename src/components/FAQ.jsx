import { useState } from 'react'
import './FAQ.css'

const ITEMS = [
  {
    q: 'Who is Back to Impact for?',
    a: 'Back to Impact is for Ukrainians and foreign professionals exploring work and life in Ukraine. The platform is completely free to use.',
  },
  {
    q: 'What kinds of opportunities will I find?',
    a: 'Jobs, internships, projects, mentorships, and community initiatives across priority recovery sectors — technology, public administration, finance, infrastructure, and social impact.',
  },
  {
    q: 'Is Back to Impact only for UGS students?',
    a: 'No. Back to Impact is open to all Ukrainians and foreign professionals exploring work and life in Ukraine, not only UGS students.',
  },
  {
    q: 'How does matching work?',
    a: "Based on your profile, interests, experience, and goals, we'll recommend relevant opportunities and connect you with organizations, initiatives, and communities.",
  },
]

export default function FAQ() {
  // Last item open by default to match the design.
  const [openIndex, setOpenIndex] = useState(ITEMS.length - 1)

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2 className="faq__title">FAQ</h2>

        <ul className="faq__list">
          {ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <li className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
                <button
                  className="faq__q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <svg
                    className="faq__chevron"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {isOpen && (
                  <div className="faq__a">
                    <p>{item.a}</p>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
