import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, Droplets, ShieldCheck, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const frameSrc = (index: number) => `/sequence-new/frame_${String(index).padStart(4, '0')}.jpg?v=4`;

export function ScrollHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<Set<number>>(new Set());
  const rafRef = useRef<number>();

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!section || !canvas || !ctx) return;

    const draw = (index: number) => {
      const img = imagesRef.current[index];
      if (!img || !loadedRef.current.has(index)) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        const x = (canvas.width - w) / 2;
        const y = (canvas.height - h) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, x, y, w, h);
      });
    };

    const load = (i: number, high = false) => {
      if (imagesRef.current[i]) return;
      const img = new Image();
      img.decoding = 'async';
      if (high) img.fetchPriority = 'high';
      img.onload = () => {
        loadedRef.current.add(i);
        if (i === frameRef.current || i === 0) draw(i);
      };
      img.src = frameSrc(i);
      imagesRef.current[i] = img;
    };

    const preload = (center: number) => {
      const radius = innerWidth < 768 ? 12 : 24;
      for (let i = Math.max(0, center - radius); i <= Math.min(FRAME_COUNT - 1, center + radius); i++) {
        load(i);
      }
    };

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      draw(frameRef.current);
    };

    // Initial keyframes
    [0, 15, 30, 60, 90, 120, 150, 180, 210, 239].forEach((i) => load(i, i === 0));
    preload(0);
    resize();

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.35,
        onUpdate: ({ progress }) => {
          const frame = Math.round(progress * (FRAME_COUNT - 1));
          frameRef.current = frame;
          preload(frame);
          draw(frame);
        },
      });

      gsap.fromTo('.scroll-hero-left', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }
      );

      gsap.to('.scroll-hero-left', {
        y: -60,
        opacity: 0.15,
        scrollTrigger: {
          trigger: section,
          start: '18% top',
          end: '48% top',
          scrub: true,
        },
      });

      return () => trigger.kill();
    });

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      mm.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={sectionRef} id="home" className="relative h-[320vh] bg-white">
      <div className="sticky top-0 h-screen overflow-hidden bg-white">
        
        {/* Fullscreen 3D Canvas Frame Scrubbing */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full bg-white object-cover"
          aria-label="PIO 3D animated cans and fruit splash"
        />

        {/* Soft atmospheric gradient wash on left for text legibility */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-full lg:w-[58%] bg-gradient-to-r from-white/95 via-white/80 to-transparent" />

        {/* Hero Overlay Copy matching user's exact uploaded image */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 sm:px-8">
          <div className="scroll-hero-left max-w-xl space-y-6 pt-12 sm:pt-0">
            
            {/* 1. Eyebrow */}
            <div className="text-[11px] sm:text-xs font-black uppercase tracking-[0.28em] text-[#0b542e]">
              BORN IN ASSAM &bull; ₹10 REFRESHMENT
            </div>

            {/* 2. Main Headline: Har Sip PIO! */}
            <div className="space-y-0 select-none">
              <span className="block font-['Caveat',cursive] text-6xl sm:text-7xl lg:text-8xl font-black text-[#084c2a] leading-[0.85] -rotate-2 transform origin-left">
                Har Sip
              </span>
              <div className="flex items-center gap-2 font-['Space_Grotesk',sans-serif] text-6xl sm:text-7xl lg:text-8xl font-black text-[#084c2a] tracking-tight leading-[0.9]">
                <span>PIO!</span>
                <Leaf className="w-9 h-9 sm:w-11 sm:h-11 text-[#22c55e] fill-[#22c55e] -rotate-12 inline-block transform" />
              </div>
            </div>

            {/* 3. Subheadline: Mango sunshine. Lychee attitude. */}
            <div className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              <div>
                <span className="text-[#f59e0b] font-black">Mango</span>{' '}
                <span className="text-[#0d2a1a]">sunshine.</span>
              </div>
              <div>
                <span className="text-[#e11d48] font-black">Lychee</span>{' '}
                <span className="text-[#0d2a1a]">attitude.</span>
              </div>
            </div>

            {/* 4. Four Circular Badges in a Row matching reference image */}
            <div className="flex items-start gap-4 sm:gap-6 pt-1">
              {/* Badge 1: Real Fruit Goodness */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/15 bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#07582f] shadow-xs">
                  <Leaf className="w-5 h-5 text-[#07582f]" />
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0d2a1a] leading-tight">
                  Real<br />Fruit Goodness
                </span>
              </div>

              {/* Badge 2: Refreshing Taste */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/15 bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#07582f] shadow-xs">
                  <Droplets className="w-5 h-5 text-[#07582f]" />
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0d2a1a] leading-tight">
                  Refreshing<br />Taste
                </span>
              </div>

              {/* Badge 3: No Added Preservatives */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/15 bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#07582f] shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-[#07582f]" />
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0d2a1a] leading-tight">
                  No Added<br />Preservatives
                </span>
              </div>

              {/* Badge 4: Just ₹10 */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/15 bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#07582f] shadow-xs font-black text-lg">
                  ₹
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0d2a1a] leading-tight">
                  Just<br />₹10
                </span>
              </div>
            </div>

            {/* 5. Action Buttons matching reference image */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => go('flavours')}
                className="inline-flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#096d3a] active:scale-95 text-white px-7 py-3.5 text-xs font-black uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span>EXPLORE FLAVOURS</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => go('story')}
                className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-emerald-50/70 border-2 border-[#07582f] text-[#07582f] px-7 py-3 text-xs font-black uppercase tracking-wider shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-[#07582f]" />
                <span>OUR STORY</span>
              </button>
            </div>

          </div>
        </div>

        {/* Subtle scroll cue indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-20">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950 bg-white/90 px-3 py-1 rounded-full border border-emerald-900/10 shadow-2xs">
            Scroll To Animate
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-emerald-800/40 flex items-start justify-center p-1 bg-white/60">
            <div className="w-1.5 h-2 rounded-full bg-emerald-800 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
