import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Droplets, Leaf, Play, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 240;
const frameSrc = (index: number) => `/sequence-new/frame_${String(index).padStart(4, '0')}.jpg?v=4`;
const MOBILE_HERO = '/images/mobile-luxury-hero.png';

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
    let disposed = false;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Refs survive StrictMode effect replay; clear the previous loader's state.
    imagesRef.current = [];
    loadedRef.current.clear();
    const mobileSequence = window.innerWidth < 768;
    const frameStep = mobileSequence ? 3 : 1;
    const sampleFrame = (index: number) => index === FRAME_COUNT - 1 ? index : Math.floor(index / frameStep) * frameStep;

    const draw = (index: number) => {
      if (disposed) return;
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
        const y = (canvas.height - h) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        if (isMobile) {
          // Soft full-screen backdrop plus a fitted foreground: both cartons stay visible.
          ctx.save();
          ctx.filter = 'blur(18px)';
          ctx.drawImage(img, x - 20, y - 20, w + 40, h + 40);
          ctx.restore();
          ctx.fillStyle = 'rgba(246,250,234,0.55)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          const sourceX = img.naturalWidth * 0.25;
          const sourceWidth = img.naturalWidth - sourceX;
          const fit = Math.min(canvas.width / sourceWidth, canvas.height * 0.72 / img.naturalHeight);
          const fw = sourceWidth * fit;
          const fh = img.naturalHeight * fit;
          ctx.drawImage(img, sourceX, 0, sourceWidth, img.naturalHeight,
            (canvas.width - fw) / 2, (canvas.height - fh) / 2, fw, fh);
        } else {
          ctx.drawImage(img, x, y, w, h);
        }
      });
    };

    const load = (i: number, high = false) => {
      i = sampleFrame(i);
      if (imagesRef.current[i]) return;
      const img = new Image();
      img.decoding = 'async';
      if (high) img.fetchPriority = 'high';
      img.onload = () => {
        if (disposed) return;
        loadedRef.current.add(i);
        draw(frameRef.current);
      };
      img.src = mobileSequence ? `/sequence-mobile/frame_${String(i).padStart(4, '0')}.webp` : frameSrc(i);
      imagesRef.current[i] = img;
    };

    const preload = (center: number) => {
      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 14 : 28;
      for (let i = Math.max(0, center - radius); i <= Math.min(FRAME_COUNT - 1, center + radius); i += frameStep) {
        load(i);
      }
      load(center);
    };

    const resize = () => {
      const isMobile = window.innerWidth < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.35 : 1.75);
      const bounds = canvas.parentElement!.getBoundingClientRect();
      canvas.width = Math.round(bounds.width * dpr);
      canvas.height = Math.round(bounds.height * dpr);
      draw(frameRef.current);
    };

    // Preload key frames immediately
    load(0, true);
    if (!reducedMotion) {
      [5, 15, 30, 50, 75, 100, 130, 160, 190, 220, 239].forEach((i) => load(i));
      preload(0);
    }
    resize();

    const mm = gsap.matchMedia();

    // 1. Desktop & Tablet Configuration (>= 768px)
    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
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
    mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
      const playhead = { frame: 0 };
      gsap.to(playhead, {
        frame: FRAME_COUNT - 1,
        ease: 'none',
        onUpdate: () => {
          const frame = sampleFrame(Math.round(playhead.frame));
          frameRef.current = frame;
          preload(frame);
          draw(frame);
        },
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
      });
      gsap.to(section.querySelector('.hero-mobile-art'), {
        autoAlpha: 0,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: '15% top', scrub: true },
      });
    });

    const refreshTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);

    window.addEventListener('resize', resize);
    return () => {
      disposed = true;
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
      className="relative h-[240svh] md:h-[220vh] lg:h-[300vh] motion-reduce:!h-[100svh] w-full"
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
          className="absolute inset-0 h-full w-full object-cover"
          aria-label="PIO 3D animated cans and fruit splash"
        />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(6,46,25,0.12)_100%)]" />

        {/* Mobile artwork fades into the touch-driven frame sequence. */}
        <div className="hero-mobile-art absolute inset-0 z-10 overflow-hidden text-center md:hidden">
          <img
            src={MOBILE_HERO}
            alt="PIO Har Sip luxury mango and lychee hero"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          <div className="absolute inset-x-5 bottom-[126px] z-20 mx-auto flex max-w-[310px] flex-col gap-2.5 opacity-0">
            <button
              onClick={() => go('flavours')}
              className="min-h-[58px] rounded-full"
              aria-label="Explore flavours"
            >
              Explore flavours
            </button>
            <button
              onClick={() => go('map')}
              className="min-h-[48px] rounded-full"
              aria-label="Find near you"
            >
              Find near you
            </button>
          </div>
        </div>

        {/* ====================================================
            DESKTOP & TABLET LAYOUT (>= 768px): PRESERVED EXACTLY
        ==================================================== */}
        <div className="hidden md:flex relative z-10 w-full h-full items-center px-6 sm:px-10 lg:px-14 xl:px-20 pointer-events-none">
          <div className="hero-desktop-box pointer-events-auto mt-14 sm:mt-8 max-w-sm sm:max-w-md lg:max-w-[440px] xl:max-w-[480px] space-y-5 rounded-[32px] border border-white/70 bg-white/78 p-6 sm:p-7 shadow-[0_24px_70px_rgba(7,88,47,0.15)] backdrop-blur-md">

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
                  onClick={() => go('map')}
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



        {/* Desktop Bottom Center: Scroll Cue */}
        <div className="flex motion-reduce:hidden absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 pointer-events-none z-20 opacity-90">
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
