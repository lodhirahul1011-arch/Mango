import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { MouseProvider } from '@/components/MouseProvider';
import { ScrollHero } from '@/components/ScrollHero';
import { Hero } from '@/components/Hero';
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
          {/* 1. 3D Scrolling Frame Animation Hero */}
          <ScrollHero />
          
          {/* 2. Interactive Product Showcase Hero */}
          <Hero />
          
          {/* 3. Flavours with Standalone Packs */}
          <Flavours />
          
          {/* 4. Why PIO Forest Green Section */}
          <WhyPIO />
          
          {/* 5. Dedicated Flavour Stories */}
          <FlavorStories />
          
          {/* 6. Big Refreshment Just ₹10 */}
          <PriceBanner />
          
          {/* 7. What's Inside Ingredients */}
          <Ingredients />
          
          {/* 8. SipOhh! Moments */}
          <Moments />
          
          {/* 9. Where to Buy */}
          <WhereToBuy />
          
          {/* 10. Our Story */}
          <OurStory />
          
          {/* 11. Partner With Us */}
          <Partner />
          
          {/* 12. Contact & FAQs */}
          <Contact />
        </main>
        <Footer />
      </div>
    </MouseProvider>
  );
}

export default App;
