import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Ticker } from './components/Ticker'
import { Features } from './components/Features'
import { HowItWorks } from './components/HowItWorks'
import { FAQ } from './components/FAQ'
import { CTABanner } from './components/CTABanner'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Features />
        <HowItWorks />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
