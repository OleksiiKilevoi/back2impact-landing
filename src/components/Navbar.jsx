import './Navbar.css'

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About us', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  return (
    <header className="navbar">
        <div className="navbar__bar">
          <a className="navbar__logo" href="#top" aria-label="Home">
            Back2Impact
          </a>
          
          <nav className="navbar__links" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} className="navbar__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar__join-container">
            <a className="navbar__join" href="#top">
              Join
            </a>
          </div>
        </div>
    </header>
  )
}
