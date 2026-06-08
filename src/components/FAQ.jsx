import { useState } from 'react'
import './FAQ.css'

const ITEMS = [
  {
    q: 'Who is Back to Impact for?',
    a: 'Back to Impact is for Ukrainians and foreign professionals exploring work and life in Ukraine — and the platform is completely free to use.',
  },
  {
    q: 'What kinds of opportunities will I find?',
    a: 'International roles across priority recovery sectors: technology, public administration, finance, infrastructure, and social impact.',
  },
  {
    q: 'Is Back to Impact only for UGS students?',
    a: 'No. Back to Impact is open to all Ukrainians and foreign professionals exploring work and life in Ukraine, not only UGS students.',
  },
  {
    q: 'How does onboarding and matching work?',
    a: 'Onboarding is CV-based and takes just minutes. An interest discovery chatbot then helps surface the opportunities that best fit your background and goals.',
  },
  {
    q: 'What support do I get when returning to Ukraine?',
    a: 'You receive automated arrival checklists seven days before your return date, plus guidance on practical needs — housing, banking, healthcare, transport, safety, digital services, and more.',
  },
  {
    q: 'Is it safe to enter Ukraine during martial law?',
    a: 'The platform provides safety information and details on the mandatory security training required for those entering Ukraine during martial law.',
  },
  {
    q: 'How is my personal data protected?',
    a: 'Back to Impact maintains GDPR compliance to protect your personal data.',
  },
]

export default function FAQ() {
  // First item open by default.
  const [openIndex, setOpenIndex] = useState(0)

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
