import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { MouseProvider } from '@/components/MouseProvider';
import { ScrollHero } from '@/components/ScrollHero';
import { OurStory } from '@/components/OurStory';
import { Partner } from '@/components/Partner';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Flavours, WhyPIO, FlavorStories, PriceBanner, Ingredients, Moments, WhereToBuy } from '@/components/BrandSections';

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, touchMultiplier: 1 });
    let raf = 0;
    const tick = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <MouseProvider>
      <div className="min-h-screen bg-white text-[#10271b]">
        <ScrollProgress />
        <Navbar />
        <main>
          {/* Main 3D Hero Section matching reference exactly */}
          <ScrollHero />
          
          {/* Flavours Section */}
          <Flavours />
          
          {/* Why PIO Section */}
          <WhyPIO />
          
          {/* Flavour Stories */}
          <FlavorStories />
          
          {/* Big Refreshment Just ₹10 Banner */}
          <PriceBanner />
          
          {/* What's Inside Ingredients */}
          <Ingredients />
          
          {/* SipOhh! Moments */}
          <Moments />
          
          {/* Where to Buy */}
          <WhereToBuy />
          
          {/* Our Story */}
          <OurStory />
          
          {/* Partner With Us */}
          <Partner />
          
          {/* Contact & FAQs */}
          <Contact />
        </main>
        <Footer />
      </div>
    </MouseProvider>
  );
}

export default App;
