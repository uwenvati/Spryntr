import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import AboutSectors from './components/AboutSectors'
import AboutCortex from './components/AboutCortex'
//  import TeamSection from './components/TeamSection'
import BlogSection from './components/BlogSection'
import Footer from './components/Footer'


export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <AboutSectors />
      <AboutCortex />
     
      {/*<TeamSection/> */}
       <BlogSection />
      <Footer/>
    </main>
  )
}

