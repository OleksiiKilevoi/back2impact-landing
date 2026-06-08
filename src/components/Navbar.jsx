import './Navbar.css'

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'About us', href: '#about' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar__bar">
          <nav className="navbar__links" aria-label="Primary">
            {LINKS.map((link) => (
              <a key={link.href} className="navbar__link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <a className="navbar__logo" href="#top" aria-label="Home">
            LOGO
          </a>

          <a className="navbar__join" href="#top">
            Join
          </a>
        </div>
      </div>
    </header>
  )
}
