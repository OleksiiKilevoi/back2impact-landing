import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <h2 className="footer__title">
          <svg
            className="footer__spark"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            aria-hidden="true"
          >
            <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round">
              <path d="M8 18 L4 12" />
              <path d="M16 12 L15 4" />
              <path d="M24 16 L29 9" />
            </g>
          </svg>
          Have questions?
          <br />
          Contact us
          <svg
            className="footer__bubble"
            width="58"
            height="58"
            viewBox="0 0 58 58"
            aria-hidden="true"
          >
            <path
              d="M10 8h34a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H24l-12 9 2-9h-4a6 6 0 0 1-6-6V14a6 6 0 0 1 6-6Z"
              fill="#3b6df6"
            />
            <path
              d="M18 22h22M18 30h14"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </h2>

        <a className="footer__email" href="mailto:info@ugs.foundation">
          info@ugs.foundation
        </a>
      </div>
      <div className="footer__bar" />
    </footer>
  )
}
