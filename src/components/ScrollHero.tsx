import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Leaf, Droplets, ShieldCheck, Play } from 'lucide-react';
import { PrismShaderBackdrop } from './PrismShaderBackdrop';

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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw(frameRef.current);
    };

    // Preload frame 0 immediately
    load(0, true);
    [10, 25, 50, 75, 100, 130, 160, 190, 220, 239].forEach((i) => load(i));
    preload(0);
    resize();

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Frame scrub on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
        onUpdate: ({ progress }) => {
          const frame = Math.round(progress * (FRAME_COUNT - 1));
          frameRef.current = frame;
          preload(frame);
          draw(frame);
        },
      });

      // 2. Bidirectional Text Animation: fades out on scroll down, FADES BACK IN on scroll up!
      gsap.fromTo(
        '.hero-text-content',
        { y: 0, opacity: 1 },
        {
          y: -40,
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '18% top',
            scrub: 0.2,
            onLeaveBack: () => {
              // Ensure 100% visibility when user returns to top
              gsap.to('.hero-text-content', { opacity: 1, y: 0, duration: 0.2, overwrite: 'auto' });
            },
            onEnterBack: () => {
              gsap.to('.hero-text-content', { opacity: 1, y: 0, duration: 0.2, overwrite: 'auto' });
            },
          },
        }
      );

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
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
    <section ref={sectionRef} id="home" className="relative h-[320vh]">
      <div 
        className="sticky top-0 h-screen w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${frameSrc(0)})` }}
      >
        {/* Fullscreen 3D Canvas Scrubbing */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="PIO 3D animated cans and fruit splash"
        />

        <PrismShaderBackdrop
          intensity={0.82}
          className="z-[1] opacity-80 mix-blend-screen [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.18)_34%,black_56%,rgba(0,0,0,0.92)_100%)]"
        />

        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_78%_42%,rgba(255,255,255,0.18),transparent_24%),linear-gradient(90deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.42)_34%,rgba(255,255,255,0.08)_68%,rgba(255,255,255,0.16)_100%)]" />

        {/* Hero Overlay: Anchored to the LEFT with comfortable breathing space */}
        <div className="relative z-10 w-full h-full flex items-center px-6 sm:px-12 lg:px-16 xl:px-24 pointer-events-none">
          <div className="hero-text-content pointer-events-auto mt-16 max-w-md space-y-6 rounded-[28px] border border-white/50 bg-white/28 p-5 shadow-[0_28px_90px_rgba(7,88,47,0.12)] backdrop-blur-[2px] sm:mt-0 sm:p-6 lg:max-w-lg">
            
            {/* 1. Eyebrow */}
            <div className="text-xs sm:text-[13px] font-black uppercase tracking-[0.25em] text-[#0a4827] drop-shadow-xs">
              BORN IN ASSAM &bull; ₹10 REFRESHMENT
            </div>

            {/* 2. Main Title: Har Sip PIO! in authentic cursive brush */}
            <div className="space-y-0 select-none">
              <span className="block font-['Caveat',cursive] text-6xl sm:text-7xl lg:text-8xl font-black text-[#074c2a] leading-[0.85] -rotate-2 origin-left tracking-tight">
                Har Sip
              </span>
              <div className="flex items-center gap-1.5 font-['Space_Grotesk',sans-serif] text-6xl sm:text-7xl lg:text-8xl font-black text-[#074c2a] tracking-tight leading-[0.9]">
                <span>PIO!</span>
                <Leaf className="w-10 h-10 sm:w-12 sm:h-12 text-[#16a34a] fill-[#16a34a] -rotate-12 inline-block shrink-0" />
              </div>
            </div>

            {/* 3. Subtitle: Mango sunshine. Lychee attitude. */}
            <div className="text-2xl sm:text-3xl lg:text-[2rem] font-extrabold tracking-tight leading-snug">
              <div>
                <span className="text-[#f59e0b] font-black">Mango</span>{' '}
                <span className="text-[#0a2e1c]">sunshine.</span>
              </div>
              <div>
                <span className="text-[#e11d48] font-black">Lychee</span>{' '}
                <span className="text-[#0a2e1c]">attitude.</span>
              </div>
            </div>

            {/* 4. Four Circular Badges in a Row */}
            <div className="flex items-start gap-4 sm:gap-6 pt-1">
              {/* Badge 1: Real Fruit Goodness */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
              <div className="w-12 h-12 rounded-full border border-emerald-900/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#07582f] shadow-sm transition-transform hover:scale-105">
                  <Leaf className="w-5 h-5 text-[#07582f]" />
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0a2e1c] leading-tight">
                  Real<br />Fruit Goodness
                </span>
              </div>

              {/* Badge 2: Refreshing Taste */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#07582f] shadow-sm transition-transform hover:scale-105">
                  <Droplets className="w-5 h-5 text-[#07582f]" />
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0a2e1c] leading-tight">
                  Refreshing<br />Taste
                </span>
              </div>

              {/* Badge 3: No Added Preservatives */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#07582f] shadow-sm transition-transform hover:scale-105">
                  <ShieldCheck className="w-5 h-5 text-[#07582f]" />
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0a2e1c] leading-tight">
                  No Added<br />Preservatives
                </span>
              </div>

              {/* Badge 4: Just ₹10 */}
              <div className="flex flex-col items-center text-center max-w-[70px]">
                <div className="w-12 h-12 rounded-full border border-emerald-900/20 bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#07582f] shadow-sm font-black text-lg transition-transform hover:scale-105">
                  ₹
                </div>
                <span className="mt-2 text-[10px] sm:text-[11px] font-extrabold text-[#0a2e1c] leading-tight">
                  Just<br />₹10
                </span>
              </div>
            </div>

            {/* 5. Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => go('story')}
                className="inline-flex items-center gap-2 rounded-full bg-[#07582f] hover:bg-[#096d3a] active:scale-95 text-white px-7 py-3.5 text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-900/20 hover:-translate-y-0.5 transition-all"
              >
                <span>OUR STORY</span>
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
            Scroll To Animate 3D
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-emerald-800/40 flex items-start justify-center p-1 bg-white/60">
            <div className="w-1.5 h-2 rounded-full bg-emerald-800 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
