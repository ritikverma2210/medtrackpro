import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Features from "../components/KeyFeatures"
import ProductPreview from "../components/ProductPreview"
import HowItWorks from "../components/HowItWorks"
import Testimonials from "../components/Testimonials"
import CTA from "../components/CTA"
import Footer from "../components/Footer"
import GridBackground from "../components/GridBackground"
import ParticlesBG from "../components/ParticlesBG"

export default function LandingPage() {

  return (
    <div className="scroll-smooth w-full overflow-x-hidden">

      <Navbar/>

      <section id="hero">
        <Hero/>
      </section>

      <section id="features">
        <Features/>
      </section>

      <ProductPreview/>

      <HowItWorks/>

      <Testimonials/>

      <CTA/>

      <Footer />

      {/* Background Effects */}

      <div className="overflow-hidden">
        <GridBackground />
        <ParticlesBG />
      </div>

    </div>
  )

}