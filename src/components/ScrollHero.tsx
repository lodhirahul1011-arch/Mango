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
      // Find nearest loaded frame if current frame is still downloading
      let targetIndex = index;
      if (!loadedRef.current.has(targetIndex)) {
        let nearest = -1;
        let minDiff = Infinity;
        for (const loadedIdx of loadedRef.current) {
          const diff = Math.abs(loadedIdx - index);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = loadedIdx;
          }
        }
        if (nearest !== -1) {
          targetIndex = nearest;
        } else {
          return;
        }
      }

      const img = imagesRef.current[targetIndex];
      if (!img) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const isMobile = window.innerWidth < 768;
        const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
        const w = img.naturalWidth * scale;
        const h = img.naturalHeight * scale;
        const x = (canvas.width - w) / 2;
        // On mobile portrait, shift canvas image down slightly so product sits comfortably in lower 65% of viewport
        const yOffset = isMobile ? canvas.height * 0.05 : 0;
        const y = (canvas.height - h) / 2 + yOffset;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
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
      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 14 : 28;
      for (let i = Math.max(0, center - radius); i <= Math.min(FRAME_COUNT - 1, center + radius); i++) {
        load(i);
      }
    };

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.75);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      draw(frameRef.current);
    };

    // Preload key frames immediately
    load(0, true);
    [5, 15, 30, 50, 75, 100, 130, 160, 190, 220, 239].forEach((i) => load(i));
    preload(0);
    resize();

    const mm = gsap.matchMedia();

    // 1. Desktop & Tablet Configuration (>= 768px)
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
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

      gsap.fromTo(
        '.hero-desktop-box',
        { y: 0, opacity: 1 },
        {
          y: -30,
          opacity: 0,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '18% top',
            scrub: 0.25,
            onLeaveBack: () => {
              gsap.to('.hero-desktop-box', { opacity: 1, y: 0, duration: 0.25, overwrite: 'auto' });
            },
            onEnterBack: () => {
              gsap.to('.hero-desktop-box', { opacity: 1, y: 0, duration: 0.25, overwrite: 'auto' });
            },
          },
        }
      );
    });

    // 2. Mobile Configuration (< 768px)
    mm.add('(max-width: 767px)', () => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2,
        onUpdate: ({ progress }) => {
          const frame = Math.round(progress * (FRAME_COUNT - 1));
          frameRef.current = frame;
          preload(frame);
          draw(frame);
        },
      });

      // Fade mobile hero card cleanly as user scrubs through 3D sequence
      gsap.to('.hero-mobile-card', {
        opacity: 0,
        y: -20,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '22% top',
          scrub: 0.2,
        },
      });
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    window.addEventListener('resize', resize);
    return () => {
      clearTimeout(refreshTimeout);
      window.removeEventListener('resize', resize);
      mm.revert();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-[160svh] sm:h-[220vh] lg:h-[300vh] w-full"
    >
      <div 
        className="sticky top-0 h-[100svh] min-h-[100svh] w-full overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${frameSrc(0)})` }}
      >
        {/* Fullscreen 3D Canvas with enhanced saturation & crisp contrast */}
        <canvas
          ref={canvasRef}
          style={{
            filter: 'contrast(1.08) saturate(1.24) brightness(1.02)',
          }}
          className="absolute inset-0 h-full w-full object-cover transition-all"
          aria-label="PIO 3D animated cans and fruit splash"
        />

        {/* Subtle cinematic vignette that makes center cartons pop with depth */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,46,25,0.12)_100%)]" />

        {/* ====================================================
            DESKTOP & TABLET LAYOUT (>= 768px): PRESERVED EXACTLY
        ==================================================== */}
        <div className="hidden md:flex relative z-10 w-full h-full items-center px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none">
          <div className="hero-desktop-box pointer-events-auto mt-14 sm:mt-8 max-w-sm sm:max-w-md lg:max-w-[440px] xl:max-w-[480px] space-y-5 rounded-[32px] border border-white/70 bg-white/78 p-6 sm:p-7 shadow-[0_24px_70px_rgba(7,88,47,0.15)] backdrop-blur-md">
            <div className="inline-flex rounded-[22px] border border-emerald-900/10 bg-white/85 px-4 py-3 shadow-[0_18px_42px_rgba(7,61,44,0.1)]">
              <img
                src="/brand/pio-logo-trim.png"
                alt="PIO"
                className="brand-logo-lift h-14 w-auto object-contain"
              />
            </div>
            
            {/* 1. Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-900/15 text-[#07582f] text-[11px] font-black uppercase tracking-[0.2em] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
              <span>BORN IN ASSAM &bull; ₹10 REFRESHMENT</span>
            </div>

            {/* 2. Main Title: Har Sip PIO! */}
            <div className="space-y-0 select-none">
              <span className="block display-heading text-[#073D2C] leading-[0.72]">
                Har Sip.
              </span>
              <div className="flex items-center gap-2 text-[#073D2C] leading-[0.72]">
                <span className="display-heading">PIO.</span>
                <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-[#167A4A] fill-[#167A4A] -rotate-12 inline-block shrink-0" />
              </div>
            </div>

            {/* 3. Subtitle */}
            <div className="space-y-2">
              <p className="eyebrow text-[#167A4A]">REPOSE / PIO</p>
              <p className="text-base sm:text-lg text-[#264b34] font-medium leading-relaxed max-w-md">
                Real fruit refreshment in every sip.
              </p>
            </div>

            {/* 4. Four Badges */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs">
                  <Leaf className="w-4 h-4 text-[#07582f]" />
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  Real Fruit
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs">
                  <Droplets className="w-4 h-4 text-[#07582f]" />
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  Chilled Sip
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#07582f]" />
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  0 Chemical
                </span>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-emerald-900/15 bg-white flex items-center justify-center text-[#07582f] shadow-2xs font-black text-sm">
                  ₹10
                </div>
                <span className="mt-1 text-[9px] sm:text-[10px] font-extrabold text-[#0a2e1c] leading-tight">
                  Pocket Price
                </span>
              </div>
            </div>

            {/* 5. Action Buttons & Quick Flavor Badges */}
            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => go('flavours')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#073D2C] hover:bg-[#0d4e3e] active:scale-95 text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] shadow-[0_18px_40px_rgba(7,61,44,0.18)] hover:-translate-y-0.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <span>Explore Flavours</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => go('story')}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/80 hover:bg-white text-[#073D2C] border border-[#0a3d2d]/15 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.18em] shadow-[0_8px_20px_rgba(7,61,44,0.06)] hover:-translate-y-0.5 transition-all cursor-pointer min-h-[44px]"
                >
                  <Play className="w-3 h-3 fill-[#073D2C]" />
                  <span>Find Near You</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-bold">
                <span className="bg-amber-100/90 text-amber-900 px-2.5 py-1 rounded-lg border border-amber-300/60 shadow-2xs">
                  🥭 Mango 160ml &bull; ₹10
                </span>
                <span className="bg-rose-100/90 text-rose-900 px-2.5 py-1 rounded-lg border border-rose-300/60 shadow-2xs">
                  🌺 Lychee 160ml &bull; ₹10
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ====================================================
        {/* ====================================================
            LUXURY TRANSPARENT MOBILE HERO (< 768px)
            Zero heavy opaque box: Airy frosted glass, floating typography,
            unobstructed 3D product view
        ==================================================== */}
        <div className="md:hidden relative z-10 w-full h-full flex flex-col justify-between px-4 pt-[72px] pb-5 pointer-events-none">
          
          {/* Top Floating Brand Block - Transparent Glass Gradient */}
          <div className="hero-mobile-card pointer-events-auto w-full max-w-sm mx-auto rounded-3xl bg-white/35 backdrop-blur-md p-4 sm:p-5 border border-white/50 shadow-[0_12px_36px_rgba(7,88,47,0.08)] space-y-2">
            
            {/* Top row: Badge + ₹10 Tag */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-2.5 py-1.5 shadow-2xs backdrop-blur-sm">
                <img
                  src="/brand/pio-logo-trim.png"
                  alt="PIO"
                  className="brand-logo-lift h-6 w-auto object-contain"
                />
                <span className="text-[9px] font-black uppercase tracking-wider text-[#07582f]">Born in Assam</span>
              </div>
              <span className="inline-flex items-center text-[10px] font-black text-[#07582f] bg-emerald-100/80 px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-2xs">
                ₹10 &bull; 160ml
              </span>
            </div>

            {/* Title with Soft Halo & Organic Feel */}
            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-baseline gap-2">
                <span className="display-heading text-[2.7rem] sm:text-[3.3rem] text-[#073D2C] leading-none drop-shadow-xs">
                  Har Sip.
                </span>
              </div>
              <Leaf className="w-6 h-6 text-[#167A4A] fill-[#167A4A]/30 -rotate-12 inline-block shrink-0" />
            </div>
            <div className="display-heading text-[2.9rem] sm:text-[3.5rem] text-[#073D2C] leading-none drop-shadow-xs">
              PIO.
            </div>

            {/* Punchy 1-line Subtitle */}
            <p className="text-[11px] sm:text-xs text-[#123820] font-bold leading-snug drop-shadow-2xs">
              Real fruit refreshment in every sip.
            </p>

            {/* Floating Glass CTAs */}
            <div className="flex items-center gap-2 pt-1.5">
              <button
                onClick={() => go('flavours')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-[#073D2C] hover:bg-[#0d4e3e] active:scale-95 text-white py-2.5 px-3 text-[10px] font-black uppercase tracking-[0.18em] shadow-md min-h-[44px] cursor-pointer backdrop-blur-sm transition-transform"
              >
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => go('story')}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-2xl bg-white/75 hover:bg-white active:scale-95 text-[#073D2C] border border-white/80 py-2.5 px-3 text-[10px] font-black uppercase tracking-[0.18em] shadow-2xs min-h-[44px] cursor-pointer backdrop-blur-sm transition-transform"
              >
                <Play className="w-3 h-3 fill-[#073D2C]" />
                <span>Find Near You</span>
              </button>
            </div>
          </div>

          {/* Bottom Floating Pill: Scroll to Scrub 3D */}
          <div className="text-center pb-2 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#07582f] bg-white/55 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/60 shadow-xs">
              <span className="animate-bounce">↓</span> Scroll to Animate 3D Cans
            </span>
          </div>

        </div>

        {/* Desktop Bottom Center: Scroll Cue */}
        <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 pointer-events-none z-20 opacity-90">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950 bg-white/95 px-3 py-1 rounded-full border border-emerald-900/15 shadow-xs">
            Scroll To Animate 3D
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-emerald-800/40 flex items-start justify-center p-1 bg-white/80 shadow-xs">
            <div className="w-1.5 h-2 rounded-full bg-emerald-800 animate-bounce" />
          </div>
        </div>

      </div>
    </section>
  );
}
