import './Footer.css'
import spark from '../assets/spark.svg';

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="footer__container">
        <div className="footer__content-container">
          <h2 className="footer__title">
            <img src={spark} alt="" className="footer__spark" />
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
      </div>
      <div className="footer__bar" />
    </footer>
  )
}
