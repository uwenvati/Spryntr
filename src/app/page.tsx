import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import AboutCortex from './components/AboutCortex'
import TeamSection from './components/TeamSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <AboutCortex />
      <TeamSection/>
    </main>
  )
}

