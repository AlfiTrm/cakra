import { Footer } from '../components/Footer'
import { AllInOneSection } from '../components/AllInOneSection'
import { CallToActionSection } from '../components/CallToActionSection'
import { HeroSection } from '../components/HeroSection'
import { Navbar } from '../components/Navbar'
import { PricingSection } from '../components/PricingSection'
import { RetailModernSection } from '../components/RetailModernSection'
import { StatsSection } from '../components/StatsSection'

export function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <RetailModernSection />
        <AllInOneSection />
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </>
  )
}
