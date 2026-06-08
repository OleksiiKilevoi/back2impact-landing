import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import About from './components/About.jsx'
import FAQ from './components/FAQ.jsx'
import Waitlist from './components/Waitlist.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <About />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}

export default App
