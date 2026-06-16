import { useState } from 'react'
import './FAQ.css'
import plusIcon from '../assets/plus-icon.svg';

const GETTING_STARTED_ITEMS = [
  {
    q: 'What is Back to Impact Ukraine?',
    a: "A platform that helps Ukrainians return home and find meaningful work, and supports international professionals considering contributing to Ukraine's recovery.",
  },
  {
    q: 'Who can use the platform?',
    a: 'Ukrainians by birth, by heritage, and by choice - as well as international professionals exploring opportunities to live and work in Ukraine.',
  },
  {
    q: 'Is it free to use?',
    a: 'Yes, fully free for all users.',
  },
  {
    q: 'How do I join?',
    a: 'Simply register with your email, and we’ve got you!',
  },
  {
    q: 'What do I need to get started?',
    a: 'Upload your up-to-date CV and complete a short profile outlining your interests and career preferences. The platform will personalize your job feed, match you with relevant opportunities, and provide all the information and resources you need to support your return to Ukraine.',
  },
  {
    q: 'How long does the onboarding take?',
    a: 'The CV upload takes a few minutes. The interest discovery chatbot takes 10-15 minutes and can be completed in multiple sessions at your own pace.',
  },
]

const JOBS_OPPORTUNITIES_ITEMS = [
  {
    q: "I'm not Ukrainian. Can I still use the platform?",
    a: 'Yes. The platform is open to anyone exploring Ukraine. If you want job matching, you can register and go through the same onboarding as Ukrainians.'
  },
  {
    q: 'What kind of roles are available for international professionals?',
    a: 'Roles in priority recovery sectors: technology, public administration, finance, infrastructure, and social impact. Listings intended for international candidates include English-language descriptions and information on work permit requirements.'
  },
]

const RETURNING_TO_UKRAINE_ITEMS = [
  {
    q: "I haven't been to Ukraine in years. Where do I start?",
    a: 'With this exact platform:) It covers security, housing, banking, healthcare, transport, digital services, and more.'
  },
  {
    q: 'Is it safe to come to Ukraine right now?',
    a: 'The platform provides up-to-date safety information and links to official resources, including shelter locations and regional security updates. For first-time entrants to Ukraine under martial law, the platform also provides mandatory security training information. We recommend reviewing official sources before finalizing your coming date.'
  },
  {
    q: 'Will someone help me with the practicalities of moving back?',
    a: 'Yes. Seven days before your confirmed return date, the platform automatically sends you a personalized arrival checklist covering logistics, banking setup, connectivity, and first-week steps. Your UGS coordinator is available for anything that goes beyond the checklist.'
  },
  {
    q: "I don't speak Ukrainian. Is there support for that?",
    a: 'The platform includes links to Ukrainian-language learning resources and tracks your progress as part of a return-readiness score.'
  }
]

const PRIVACY_DATA_ITEMS = [
  {
    q: 'What happens to my CV and personal data?',
    a: 'Your data is used solely to generate your interest profile and job matches. Employers do not receive your personal details without your explicit consent. The platform is GDPR-compliant.'
  }
]

const SUPPORT_HELP_ITEMS = [
  {
    q: "What if I have a question that the chatbot can't answer?",
    a: 'The platform flags unanswered questions to the UGS team, who respond and add the answer to the knowledge base. You can also reach a UGS coordinator directly through the platform at any point.'
  }
]

// const ITEMS = [
//   {
//     q: 'Who is Back to Impact for?',
//     a: 'Back to Impact is for Ukrainians and foreign professionals exploring work and life in Ukraine — and the platform is completely free to use.',
//   },
//   {
//     q: 'What kinds of opportunities will I find?',
//     a: 'International roles across priority recovery sectors: technology, public administration, finance, infrastructure, and social impact.',
//   },
//   {
//     q: 'Is Back to Impact only for UGS students?',
//     a: 'No. Back to Impact is open to all Ukrainians and foreign professionals exploring work and life in Ukraine, not only UGS students.',
//   },
//   {
//     q: 'How does onboarding and matching work?',
//     a: 'Onboarding is CV-based and takes just minutes. An interest discovery chatbot then helps surface the opportunities that best fit your background and goals.',
//   },
//   {
//     q: 'What support do I get when returning to Ukraine?',
//     a: 'You receive automated arrival checklists seven days before your return date, plus guidance on practical needs — housing, banking, healthcare, transport, safety, digital services, and more.',
//   },
//   {
//     q: 'Is it safe to enter Ukraine during martial law?',
//     a: 'The platform provides safety information and details on the mandatory security training required for those entering Ukraine during martial law.',
//   },
//   {
//     q: 'How is my personal data protected?',
//     a: 'Back to Impact maintains GDPR compliance to protect your personal data.',
//   },
// ]

export default function FAQ() {
  // First item open by default.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="faq" id="faq">
      <div className="faq__container">
        <h2 className="faq__title">FAQ</h2>
        <div className="faq__lists-block">
          <div className="faq__list-container">
            <div className="faq__list-top-block">
              <p className="faq__list-title">👋 Getting Started</p>
            </div>
            <ItemsLoop
              data={GETTING_STARTED_ITEMS}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              indexStep={0} />
          </div>
          <div className="faq__list-container">
            <div className="faq__list-top-block">
              <p className="faq__list-title">💼 Jobs & Opportunities</p>
            </div>
            <ItemsLoop
              data={JOBS_OPPORTUNITIES_ITEMS}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              indexStep={6}/>
          </div>
          <div className="faq__list-container">
            <div className="faq__list-top-block">
              <p className="faq__list-title">🏠 Returning to Ukraine</p>
            </div>
            <ItemsLoop
              data={RETURNING_TO_UKRAINE_ITEMS}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              indexStep={8} />
          </div>
          <div className="faq__list-container">
            <div className="faq__list-top-block">
              <p className="faq__list-title">🔒 Privacy & Data</p>
            </div>
            <ItemsLoop
              data={PRIVACY_DATA_ITEMS}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              indexStep={12} />
          </div>
          <div className="faq__list-container">
            <div className="faq__list-top-block">
              <p className="faq__list-title">💬 Support & Help</p>
            </div>
            <ItemsLoop
              data={SUPPORT_HELP_ITEMS}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              indexStep={13} />
          </div>
        </div>
        
      </div>
    </section>
  )
}

const ItemsLoop = (data) => {
  return <ul className="faq__list">
    {data.data.map((item, i) => {
      const isOpen = data.openIndex === i + data.indexStep
      return (
        <li className={`faq__item${isOpen ? ' is-open' : ''}`} key={item.q}>
          <button
            className="faq__q"
            type="button"
            aria-expanded={isOpen}
            onClick={() => data.setOpenIndex(isOpen ? -1 : i + data.indexStep)}
          >
            <span>{item.q}</span>
            <img src={plusIcon} alt="" className="faq__chevron" />
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
}