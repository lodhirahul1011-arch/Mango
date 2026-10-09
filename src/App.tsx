import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { MouseProvider } from '@/components/MouseProvider';
import { InteractiveCursor } from '@/components/InteractiveCursor';
import { ScrollHero } from '@/components/ScrollHero';
import { Flavours } from '@/components/BrandSections';
import { TetraExperience } from '@/components/TetraExperience';
import { Ingredients } from '@/components/Ingredients';
import { InteractiveMap } from '@/components/InteractiveMap';
import { OurStory } from '@/components/OurStory';
import { Partner } from '@/components/Partner';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <MouseProvider>
      <div className="relative min-h-screen bg-white text-[#10271b] selection:bg-emerald-200 selection:text-emerald-950">
        {/* Interactive Custom Floating Cursor Trail */}
        <InteractiveCursor />

        {/* Global Reading Scroll Progress */}
        <ScrollProgress />

        {/* Sleek Navigation Bar */}
        <Navbar />

        <main className="relative z-10">
          {/* 1. Main 3D Hero Section (EXACTLY AS APPROVED — UNCHANGED) */}
          <ScrollHero />

          {/* 2. Signature Flavours Showcase (Alphonso Mango & Floral Lychee) */}
          <Flavours />

          {/* 3. Interactive 3D Tetra Pak Experience & 6-Layer Technology */}
          <TetraExperience />

          {/* 5. What's Inside: 3D Orbiting Natural Ingredients Universe */}
          <Ingredients />


          {/* 8. Interactive Distribution Network & Store Locator Map */}
          <InteractiveMap />

          {/* 9. Our Story: 1931 Assam Tea Stall Roots to Modern Aseptic Plant */}
          <OurStory />

          {/* 10. Partner With Us (Distributor, Retailer, Institutional) */}
          <Partner />

          {/* 11. Contact & FAQs Accordion */}
          <Contact />
        </main>

        {/* Global Brand Footer */}
        <Footer />
      </div>
    </MouseProvider>
  );
}

export default App;
