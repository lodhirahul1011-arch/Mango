import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from '@/components/Navbar';
import { ScrollProgress } from '@/components/ScrollProgress';
import { MouseProvider } from '@/components/MouseProvider';
import { ScrollHero } from '@/components/ScrollHero';
import { SignatureProductTrail } from '@/components/SignatureProductTrail';
import { Flavours } from '@/components/BrandSections';
import { Ingredients } from '@/components/Ingredients';
import { InteractiveMap } from '@/components/InteractiveMap';
import { Partner } from '@/components/Partner';
import { Contact } from '@/components/Contact';
import { ConsumerFaqs } from '@/components/ConsumerFaqs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const lenis = new Lenis({
      duration: isTouch ? 0.75 : 1.15,
      smoothWheel: true,
      touchMultiplier: isTouch ? 1.0 : 1.1,
      syncTouch: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(refreshTimer);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <MouseProvider>
      <div className="relative min-h-screen bg-white text-[#10271b] selection:bg-emerald-200 selection:text-emerald-950">
        {/* Global Reading Scroll Progress */}
        <ScrollProgress />

        {/* Signature product scroll transition between Hero and Products */}
        <SignatureProductTrail />

        {/* Sleek Navigation Bar */}
        <Navbar />

        <main className="relative z-10">
          {/* 1. Main 3D Hero Section (EXACTLY AS APPROVED — UNCHANGED) */}
          <ScrollHero />

          {/* 2. Signature Flavours Showcase (Alphonso Mango & Floral Lychee) */}
          <Flavours />

          {/* 5. What's Inside: 3D Orbiting Natural Ingredients Universe */}
          <Ingredients />


          {/* 8. Interactive Distribution Network & Store Locator Map */}
          <InteractiveMap />

          {/* 10. Partner With Us (Distributor, Retailer, Institutional) */}
          <Partner />

          {/* 11. Consumer FAQs */}
          <ConsumerFaqs />

          {/* 12. Contact */}
          <Contact />
        </main>

        {/* Global Brand Footer */}
        <Footer />
      </div>
    </MouseProvider>
  );
}

export default App;
