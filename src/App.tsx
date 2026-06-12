import './index.css'
import ParticleBackground from './components/ParticleBackground'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import WorkWithMeSection from './components/WorkWithMeSection'
import WhoThisIsForSection from './components/WhoThisIsForSection'
import RoadmapSection from './components/RoadmapSection'
import WhatThisCoversSection from './components/WhatThisCoversSection'
import ClientJourneySection from './components/ClientJourneySection'
import PositioningSection from './components/PositioningSection'
import FinalCTASection from './components/FinalCTASection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#1a0a2e]">
      <ParticleBackground />
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <WorkWithMeSection />
        <WhoThisIsForSection />
        <RoadmapSection />
        <WhatThisCoversSection />
        <div id="journey">
          <ClientJourneySection />
        </div>
        <PositioningSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  )
}
